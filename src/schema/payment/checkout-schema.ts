import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .max(50),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' })
    .max(50),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  websites: z.string().optional(),
  note: z.string().optional(),
});
