'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../../../../../prisma/db';
import { redirect } from 'next/navigation';
import { PaymentStatus } from '@prisma/client';

export async function placeTemplateOrder(formData: FormData) {
  const templateId = formData.get('templateId') as string;
  const isFree = formData.get('isFree') === 'true';

  // Create order using Prisma (add userId from session in real app)
  await prisma.order.create({
    data: {
      orderNumber: `ORD-${Date.now()}`,
      status: 'PENDING',
      totalAmount: isFree ? 0 : parseFloat(formData.get('salePrice') as string),
      subtotalAmount: isFree
        ? 0
        : parseFloat(formData.get('salePrice') as string),
      customerEmail: 'user@example.com', // Replace with actual user email
      paymentStatus: isFree
        ? ('FREE' as PaymentStatus)
        : ('PENDING' as PaymentStatus),
      templateItems: {
        create: {
          quantity: 1,
          unitPrice: isFree
            ? 0
            : parseFloat(formData.get('salePrice') as string),
          totalPrice: isFree
            ? 0
            : parseFloat(formData.get('salePrice') as string),
          templateId,
        },
      },
    },
  });

  revalidatePath('/dashboard');
  redirect(isFree ? '/dashboard' : '/checkout');
}
