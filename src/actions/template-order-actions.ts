'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth'; // <-- server-side Better Auth instance
import { signUpAction } from './auth-actions';
import { generateOrderNumber } from '@/lib/utils';
import prisma from '../../prisma/db';

/**
 * Password is optional now; required only when creating a *new* user
 * without a session AND no existing account for that email.
 */
const templateOrderSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z.string().min(8, 'Password must be at least 8 characters').optional(),
  ),
  phone: z.string().optional(),
  additionalNotes: z.string().optional(),
  templateId: z.string(),
});

export type TemplateOrderResult = {
  success: boolean;
  message: string;
  orderId?: string;
  redirectUrl?: string;
  error?: string; // error code or message
};

export async function templateOrderAction(
  payload: z.infer<typeof templateOrderSchema>,
): Promise<TemplateOrderResult> {
  try {
    // 0) Get server session (Better Auth) using request headers
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const loggedInUser = session?.user ?? null;

    // 1) Validate incoming payload
    const validated = templateOrderSchema.parse(payload);

    // 2) Resolve the template (price, etc.)
    const template = await prisma.template.findUnique({
      where: { id: validated.templateId },
    });

    if (!template) {
      return {
        success: false,
        message: 'Template not found',
        error: 'TEMPLATE_NOT_FOUND',
      };
    }

    // 3) Resolve user path:
    // - If logged in: use session user (and prefer session email for consistency)
    // - If not logged in:
    //     a) If email exists -> ask to log in
    //     b) If email doesn't exist -> require password & sign up
    let userId: string | null = null;
    let customerEmail = validated.email;

    if (loggedInUser) {
      userId = loggedInUser.id;
      // keep customerEmail aligned to session email to avoid confusion
      customerEmail = loggedInUser.email;
    } else {
      const existing = await prisma.user.findUnique({
        where: { email: validated.email },
        select: { id: true },
      });

      if (existing) {
        // user exists but no session -> ask to log in
        return {
          success: false,
          message:
            'An account with this email already exists. Please log in to continue.',
          error: 'USER_ALREADY_EXISTS',
          redirectUrl: '/login', // you can add a callbackUrl if you prefer
        };
      }

      // No existing user -> we need password to create an account
      if (!validated.password) {
        return {
          success: false,
          message: 'Password is required to create an account.',
          error: 'PASSWORD_REQUIRED_FOR_SIGNUP',
        };
      }

      // Create user via your existing sign-up action to keep logic in one place
      const formData = new FormData();
      formData.append('email', validated.email);
      formData.append('password', validated.password);
      formData.append('confirmPassword', validated.password);
      formData.append('firstName', validated.firstName);
      formData.append('lastName', validated.lastName);
      formData.append('acceptTerms', 'true');

      const result = await signUpAction(formData);
      if (!result.success) {
        return {
          success: false,
          message: result.message || 'User registration failed',
          error: 'SIGNUP_FAILED',
        };
      }

      // Fetch the newly created user id
      const newUser = await prisma.user.findUnique({
        where: { email: validated.email },
        select: { id: true, email: true },
      });

      if (!newUser) {
        return {
          success: false,
          message: 'User registration failed',
          error: 'USER_NOT_FOUND_AFTER_SIGNUP',
        };
      }

      userId = newUser.id;
      customerEmail = newUser.email;
    }

    // 4) Price & order status
    const isFree = template.price === 0 || template.salePrice === 0;
    const actualPrice = template.salePrice > 0 ? template.salePrice : 0;

    // 5) Order number
    const orderNumber = generateOrderNumber();

    // 6) Create order + item (+ payment if paid) in a transaction
    const [order] = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: userId!, // by here it must be set
          customerEmail,
          orderNumber,
          subtotalAmount: actualPrice,
          totalAmount: actualPrice,
          notes: validated.additionalNotes,
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
            paymentMethod: 'STRIPE_CARD',
          },
        });
      }

      return [newOrder];
    });

    // 7) Response
    if (isFree) {
      return {
        success: true,
        message: 'Your template has been added to your account successfully!',
        orderId: order.id,
        redirectUrl: '/dashboard/orders',
      };
    }

    return {
      success: true,
      message: 'Order created successfully. Redirecting to payment...',
      orderId: order.id,
      redirectUrl: `/checkout/payment/${order.id}`,
    };
  } catch (err) {
    console.error('Template order error:', err);

    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
        error: JSON.stringify(err.errors),
      };
    }

    return {
      success: false,
      message: 'Failed to process your order',
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
