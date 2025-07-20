'use server';

import { z } from 'zod';
import { generateOrderNumber } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '../../prisma/db';
import { stripe } from '@/lib/stripe';
import { paypalClient } from '@/lib/paypal';
import paypal from '@paypal/checkout-server-sdk';

// Zod validation schema
const createOrderSchema = z.object({
  coreServiceId: z.string().min(1, 'Core service is required'),
  addOnServiceIds: z.array(z.string()).default([]),
  siteCount: z
    .number()
    .min(1, 'Site count must be at least 1')
    .max(50, 'Site count cannot exceed 50'),
  urgencyLevel: z.enum(['NORMAL', 'URGENT']),
  siteUrl: z.string().url().optional().or(z.literal('')),
  description: z
    .string()
    .max(2000, 'Description cannot exceed 2000 characters')
    .optional(),
  customFields: z.record(z.any()).optional(),
});

export interface CreateOrderData {
  coreServiceId: string;
  addOnServiceIds: string[];
  siteCount: number;
  urgencyLevel: 'NORMAL' | 'URGENT';
  siteUrl?: string;
  description?: string;
  customFields?: Record<string, any>;
}

// Calculate order total utility function
function calculateOrderTotal(
  coreService: { price: number } | null,
  addOnServices: { price: number }[],
  siteCount: number,
  urgencyLevel: 'NORMAL' | 'URGENT' = 'NORMAL',
): number {
  if (!coreService) {
    throw new Error('Core service not found');
  }

  // Base service cost
  let total = coreService.price * siteCount;

  // Add-on services cost
  const addOnTotal = addOnServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );
  total += addOnTotal;

  // Urgency multiplier (50% extra for urgent)
  if (urgencyLevel === 'URGENT') {
    total *= 1.5;
  }

  return Math.round(total * 100) / 100; // Round to 2 decimal places
}

export async function createOrder(data: CreateOrderData) {
  try {
    // Validate input data
    const validatedData = createOrderSchema.parse(data);

    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error('Authentication required');
    }

    // Fetch core service
    const coreService = await prisma.service.findUnique({
      where: {
        id: validatedData.coreServiceId,
        isActive: true,
      },
    });

    if (!coreService) {
      throw new Error('Core service not found or inactive');
    }

    // Fetch add-on services
    const addOnServices = await prisma.service.findMany({
      where: {
        id: { in: validatedData.addOnServiceIds },
        isActive: true,
      },
    });

    // Validate all requested add-ons were found
    if (addOnServices.length !== validatedData.addOnServiceIds.length) {
      throw new Error('One or more add-on services not found');
    }

    // Calculate pricing
    const subtotal = calculateOrderTotal(
      coreService,
      addOnServices,
      validatedData.siteCount,
      validatedData.urgencyLevel,
    );

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session.user.id,
          customerEmail: session.user.email,
          customerName: session.user.name || '',
          totalAmount: subtotal,
          subtotalAmount: subtotal,
          siteUrl: validatedData.siteUrl || null,
          siteCount: validatedData.siteCount,
          urgencyLevel: validatedData.urgencyLevel,
          description: validatedData.description || null,
          customFields: validatedData.customFields || {},
          orderItems: {
            create: [
              // Core service item
              {
                serviceId: validatedData.coreServiceId,
                quantity: validatedData.siteCount,
                unitPrice: coreService.price,
                totalPrice: coreService.price * validatedData.siteCount,
              },
              // Add-on service items
              ...addOnServices.map((service) => ({
                serviceId: service.id,
                quantity: 1,
                unitPrice: service.price,
                totalPrice: service.price,
              })),
            ],
          },
        },
        include: {
          orderItems: {
            include: {
              service: true,
            },
          },
          user: true,
        },
      });

      return newOrder;
    });

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: subtotal,
    };
  } catch (error) {
    console.error('Order creation failed:', error);

    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`,
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to create order. Please try again.');
  }
}

export async function createStripeSession(orderId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error('Authentication required');
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.userId !== session.user.id) {
      throw new Error('Unauthorized');
    }

    // Create Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.orderItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.service.name,
            description: item.service.description,
          },
          unit_amount: Math.round(item.unitPrice * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}/cancel`,
      metadata: {
        orderId: orderId,
        userId: session.user.id,
      },
      customer_email: order.customerEmail,
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: orderId,
        amount: order.totalAmount,
        currency: 'USD',
        status: 'PENDING',
        paymentMethod: 'STRIPE_CARD',
        stripeSessionId: stripeSession.id,
      },
    });

    return {
      success: true,
      sessionId: stripeSession.id,
      url: stripeSession.url,
    };
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    throw new Error('Failed to create payment session');
  }
}
