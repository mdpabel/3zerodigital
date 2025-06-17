export interface DynamicField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'service-specific';
  required: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  service: 'web-dev' | 'digital-marketing' | 'maintenance' | 'troubleshooting';
  subject: string;
  content: string;
  dynamicFields: DynamicField[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  lastContact: string;
}

export interface CampaignResult {
  id: string;
  templateName: string;
  recipientEmail: string;
  success: boolean;
  emailId?: string;
  error?: string;
  sentAt: string;
}

export interface EmailAnalytics {
  emailId: string;
  opened: boolean;
  openedAt?: string;
  clicked: boolean;
  clickedAt?: string;
  replied: boolean;
  repliedAt?: string;
  bounced: boolean;
  unsubscribed: boolean;
}

export interface PersonalizedContent {
  subject: string;
  content: string;
  personalizationScore: number;
}
