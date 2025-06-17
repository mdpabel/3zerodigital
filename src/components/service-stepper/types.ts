import { LucideIcon } from 'lucide-react';

export interface ServiceFeature {
  name: string;
  description?: string;
}

export interface AddOnService {
  id: string;
  name: string;
  price: number;
  icon: LucideIcon;
  popular?: boolean;
  urgent?: boolean;
  description: string;
  features: string[];
}

export interface CoreService {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  responseTime: string;
  completionTime: string;
  features: string[];
  guarantees: string[];
  unit?: string;
}

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
  [key: string]: string;
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
