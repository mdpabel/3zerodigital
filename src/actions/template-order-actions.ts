'use server';

import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { signUpAction } from './auth-actions';
import { generateOrderNumber } from '@/lib/utils';

const prisma = new PrismaClient();

const templateOrderSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
  additionalNotes: z.string().optional(),
  templateId: z.string(),
});

export type TemplateOrderResult = {
  success: boolean;
  message: string;
  orderId?: string;
  redirectUrl?: string;
  error?: string;
};

export async function templateOrderAction(
  payload: z.infer<typeof templateOrderSchema>,
): Promise<TemplateOrderResult> {
  try {
    // 1. Validate the payload
    const validatedData = templateOrderSchema.parse(payload);

    // 2. Fetch the template to get its price
    const template = await prisma.template.findUnique({
      where: { id: validatedData.templateId },
    });

    if (!template) {
      return {
        success: false,
        message: 'Template not found',
        error: 'TEMPLATE_NOT_FOUND',
      };
    }

    // 3. Check if user exists, if not create a new user
    let user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      const formData = new FormData();
      formData.append('email', validatedData.email);
      formData.append('password', validatedData.password);
      formData.append('confirmPassword', validatedData.password);
      formData.append('firstName', validatedData.firstName);
      formData.append('lastName', validatedData.lastName);
      formData.append('acceptTerms', 'true');

      const result = await signUpAction(formData);
      if (!result.success) {
        return {
          success: false,
          message: 'User registration failed',
        };
      }

      user = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });
    }

    // 4. Determine order status based on template price
    const isFree = template.price === 0 || template.salePrice === 0;
    const actualPrice =
      template.salePrice > 0 ? template.salePrice : template.price;

    // 5. Create order number
    const orderNumber = generateOrderNumber();

    // 6. Create the order, item, and payment in a transaction
    const [order] = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user?.id,
          customerEmail: validatedData.email,
          orderNumber: orderNumber,
          subtotalAmount: actualPrice,
          totalAmount: actualPrice,
          notes: validatedData.additionalNotes,
          status: isFree ? 'COMPLETED' : 'PENDING',
          paymentStatus: isFree ? 'PAID' : 'PENDING',
          paymentMethod: isFree ? 'MANUAL' : undefined,
        },
      });

      await tx.templateOrderItem.create({
        data: {
          totalPrice: actualPrice,
          templateId: template.id,
          orderId: newOrder.id,
          unitPrice: actualPrice,
          quantity: 1,
        },
      });

      if (!isFree) {
        await tx.payment.create({
          data: {
            orderId: newOrder.id,
            amount: actualPrice,
            status: 'PENDING',
            paymentMethod: 'STRIPE_CARD', // Default to stripe or as per schema
          },
        });
      }

      return [newOrder];
    });

    // 7. Return appropriate response based on price
    if (isFree) {
      return {
        success: true,
        message: 'Your template has been added to your account successfully!',
        orderId: order.id,
        redirectUrl: '/dashboard/downloads',
      };
    } else {
      return {
        success: true,
        message: 'Order created successfully. Redirecting to payment...',
        orderId: order.id,
        redirectUrl: `/checkout/payment/${order.id}`,
      };
    }
  } catch (error) {
    console.error('Template order error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
        error: JSON.stringify(error.errors),
      };
    }

    return {
      success: false,
      message: 'Failed to process your order',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
