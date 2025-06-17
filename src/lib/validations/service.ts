// lib/validations/service.ts
import { z } from 'zod';

// Define the shape of a feature object for reusability and clarity
const featureSchema = z.object({
  value: z.string().min(1, { message: 'Feature cannot be empty.' }),
});

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100),
  description: z.string(),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens',
    ),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().min(0).optional(),
  // UPDATE: Use the new featureSchema to define an array of objects
  features: z.array(featureSchema).optional(),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  icon: z.string().optional(),
  categoryIds: z.array(z.string()).min(1, 'At least one category is required'),
  relatedServiceIds: z.array(z.string()).optional(),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
  id: z.string().min(1, 'Service ID is required'),
});

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
  description: z.string(),
  isActive: z.boolean().default(true),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
