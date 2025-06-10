import { z } from 'zod';

// Define the Zod schema for form validation
export const DevelopmentServiceFormSchema = z.object({
  projectType: z.string().nonempty('Project type is required'),
  budget: z.string().nonempty('Budget is required'),
  timeline: z.string().nonempty('Timeline is required'),
  functionalities: z
    .array(z.string())
    .nonempty('At least one functionality is required'),
  sampleSites: z.string().url('Sample site must be a valid URL').optional(),
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().optional(),
});
