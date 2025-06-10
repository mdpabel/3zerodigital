import { z } from 'zod';

export const createOrderSchema = z.object({
  customerEmail: z.string().email('Valid email is required'),
  customerName: z.string().min(1, 'Name is required').max(100),
  customerPhone: z.string().optional(),
  deliveryEmail: z.string().email().optional(),
  deliveryPhone: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        serviceId: z.string().min(1, 'Service is required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        customAmount: z.number().min(0).optional(),
        specifications: z.record(z.any()).optional(),
      }),
    )
    .min(1, 'At least one item is required'),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'REFUNDED',
  ]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
