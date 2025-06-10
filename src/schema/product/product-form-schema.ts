import { z } from 'zod';

// Main product schema
export const productFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  price: z.coerce.number().min(0, {
    message: 'Price must be positive.',
  }), // Price is optional because subscriptions can have multiple prices

  origPrice: z.coerce
    .number()
    .min(0.01, {
      message: 'Original price must be greater than 0.',
    })
    .optional(),

  description: z.string().optional(),
  imageUrl: z.string().optional(),
  categoryId: z.string().optional(), // Assuming categories are selected by ID

  // // Add product type to distinguish between standard and subscription products
  // type: z.enum(['STANDARD', 'SUBSCRIPTION'], {
  //   errorMap: () => ({
  //     message: 'Product type must be either STANDARD or SUBSCRIPTION.',
  //   }),
  // }),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  icon: z.string().optional(),
});
