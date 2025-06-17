import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens',
    ),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().min(1, 'Category ID is required'),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
