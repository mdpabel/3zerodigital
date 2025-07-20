import { Service } from '@prisma/client';
import { LucideIcon } from 'lucide-react';

export interface ServiceFormData {
  // Renamed from FormData
  siteUrl: string;
  siteDescription: string;
  urgencyLevel: 'normal' | 'urgent';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | string[]; // For dynamic custom fields
}

export interface ServiceFeature {
  name: string;
  description?: string;
}

export interface AddOnService extends Service {}

export interface CoreService extends Service {}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ServiceStepperProps {
  coreService: CoreService;
  addOnServices: AddOnService[];
  title: string;
  subtitle: string;
  emergencyService?: boolean;
  allowMultipleSites?: boolean;
  requiresSiteUrl?: boolean;
  requiresDescription?: boolean;
  customFields?: CustomField[];
  guarantees: string[];
}

export interface FormData {
  siteUrl: string;
  siteDescription: string;
  urgencyLevel: 'normal' | 'urgent';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Allow for dynamic custom fields with mixed types
  [key: string]: string | string[];
}

export interface StepperState {
  currentStep: number;
  direction: number;
  selectedAddOns: string[];
  siteCount: number;
  showPassword: boolean;
  authMode: 'signup' | 'login';
  userExists: boolean | null;
  formData: FormData;
  errors: Record<string, string>;
}

export interface Step {
  id: number;
  name: string;
  description: string;
}

export type ServiceProps = {
  id: string;
  price: number;
  relatedTo: Service[];
};
