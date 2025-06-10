import { z } from 'zod';

export const UpdatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(50, 'Password must be at most 50 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(50, 'Password must be at most 50 characters long'),
    honeypot: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
