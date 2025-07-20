import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import prisma from '../../../../../prisma/db';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case 'customer.subscription.created':
        // Handle subscription if needed
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handling failed:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const { orderId } = session.metadata || {};

  if (!orderId) {
    throw new Error('Order ID not found in session metadata');
  }

  await prisma.$transaction(async (tx) => {
    // Update payment record
    await tx.payment.updateMany({
      where: {
        stripeSessionId: session.id,
        orderId: orderId,
      },
      data: {
        status: 'PAID',
        stripePaymentId: session.payment_intent as string,
        stripeCustomerId: session.customer as string,
        paidAt: new Date(),
        metadata: {
          sessionId: session.id,
          amountTotal: session.amount_total,
          currency: session.currency,
        },
      },
    });

    // Update order status
    await tx.order.update({
      where: { id: orderId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE_CARD',
        updatedAt: new Date(),
      },
    });
  });

  // Send confirmation email (implement your email service)
  await sendOrderConfirmationEmail(orderId);
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
) {
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) {
    console.log('No order ID found in payment intent metadata');
    return;
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.updateMany({
      where: {
        stripePaymentId: paymentIntent.id,
        orderId: orderId,
      },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        metadata: {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
      },
    });

    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
    });
  });
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) return;

  await prisma.$transaction(async (tx) => {
    await tx.payment.updateMany({
      where: {
        stripePaymentId: paymentIntent.id,
        orderId: orderId,
      },
      data: {
        status: 'FAILED',
        failureReason:
          paymentIntent.last_payment_error?.message || 'Payment failed',
        metadata: {
          error: JSON.stringify(paymentIntent.last_payment_error),
        },
      },
    });

    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED',
      },
    });
  });

  // Send payment failed email
  await sendPaymentFailedEmail(orderId);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // Handle subscription payments if needed
  console.log('Invoice payment succeeded:', invoice.id);
}

async function sendOrderConfirmationEmail(orderId: string) {
  // Implement your email service
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: { service: true },
      },
    },
  });

  if (!order) return;

  // Send email using your preferred service (SendGrid, Resend, etc.)
  console.log(`Sending confirmation email for order ${order.orderNumber}`);
}

async function sendPaymentFailedEmail(orderId: string) {
  // Implement payment failed email notification
  console.log(`Sending payment failed email for order ${orderId}`);
}
