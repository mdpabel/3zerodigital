import { z } from 'zod';

// Schema
export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Schema and types
export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export type LoginFormSchema = z.infer<typeof LoginSchema>;
export type SignUpFormSchema = z.infer<typeof SignUpSchema>;
