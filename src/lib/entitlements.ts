import prisma from '@/../prisma/db';

export async function entitledOrderIdForTemplate(opts: {
  userId: string;
  templateId: string;
}) {
  const order = await prisma.order.findFirst({
    where: {
      userId: opts.userId,
      TemplateOrderItem: { some: { templateId: opts.templateId } },
      // your policy:
      OR: [
        { paymentStatus: 'PAID' },
        { status: { in: ['CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'FREE'] } },
      ],
      NOT: { status: { in: ['CANCELLED', 'REFUNDED'] } },
    },
    select: { id: true },
  });
  return order?.id ?? null;
}
