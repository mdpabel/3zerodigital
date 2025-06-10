import { z } from 'zod';

export const SignUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(50, {
      message: 'Password must be at most 50 characters long',
    }),
  honeypot: z.string().optional(),
});
