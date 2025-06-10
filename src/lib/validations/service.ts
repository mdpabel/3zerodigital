import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  description: z.string().optional(),
  shortDesc: z.string().max(200).optional(),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().min(0).optional(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  responseTime: z.string().optional(),
  completionTime: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  bgGradient: z.string().optional(),
  guarantees: z.array(z.string()).optional(),
  bestFor: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  relatedServiceIds: z.array(z.string()).optional(),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
  id: z.string().min(1, 'Service ID is required'),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50),
  slug: z.string().min(1, 'Slug is required').max(50),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
