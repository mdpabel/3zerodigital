import { z } from 'zod';

export const orderSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z
    .string()
    .regex(/^\d+$/, 'Quantity must be a number')
    .optional()
    .default('1'),
  metaData: z.string().optional(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  websites: z.string().optional(),
  note: z.string().optional(),
  couponId: z.string().optional(),
  productType: z.enum(['product', 'template']).default('product').optional(),
});
