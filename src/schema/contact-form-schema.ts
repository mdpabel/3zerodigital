import { z } from 'zod';

// Define the allowed inquiry types
export const inquiryTypeOptions = [
  'sales',
  'billing',
  'technical',
  'general',
  'other',
] as const;

export const contactFormSchema = z.object({
  inquiryType: z.enum(inquiryTypeOptions, {
    required_error: 'Inquiry type is required',
  }),
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string().email('Invalid email address'),
  message: z.string().optional(),
});
