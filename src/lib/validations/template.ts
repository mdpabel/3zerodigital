import { z } from 'zod';

export const createTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required').max(100),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens.'),
  fileUrl: z.string().url('Must be a valid URL.'),
  liveUrl: z.string().url('Must be a valid URL.'),
  fileKey: z.string().min(1, 'File key is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  salePrice: z.coerce.number().min(0, 'Sale price must be a positive number.'),
  images: z
    .array(z.string().url())
    .min(1, 'At least one image URL is required.'),
  categoryIds: z.array(z.string()).min(1, 'At least one category is required.'),
});

export const updateTemplateSchema = createTemplateSchema.partial().extend({
  id: z.string().min(1, 'Template ID is required'),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
