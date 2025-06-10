import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Category name must be at least 2 characters.' }),
  description: z
    .string()
    .min(2, { message: 'Category name must be at least 2 characters.' }),
});
