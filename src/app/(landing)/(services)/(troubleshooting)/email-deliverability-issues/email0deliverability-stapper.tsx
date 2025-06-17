// app/services/email-deliverability/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Mail, Shield, Server, Send } from 'lucide-react';

const emailCoreService: CoreService = {
  id: 'email-deliverability-fix',
  name: 'Email Deliverability Fix',
  price: 199,
  originalPrice: 249,
  responseTime: 'Within 4 hours',
  completionTime: '1-2 business days',
  features: [
    'DNS Record Audit (SPF, DKIM, DMARC)',
    'Configuration of SPF & DKIM Records',
    'Implementation of DMARC Policy',
    'WordPress Email Configuration Check',
    'Testing with Mail-Tester.com',
    'Detailed Resolution Report',
  ],
  guarantees: [
    'Improved Email Deliverability Score',
    '30-Day Post-Fix Monitoring',
  ],
};

const emailAddOns: AddOnService[] = [
  {
    id: 'smtp-setup',
    name: 'Transactional Email (SMTP) Setup',
    price: 99,
    icon: Send,
    popular: true,
    description:
      'Configure your site to send emails via a dedicated service (e.g., SendGrid, Mailgun) for maximum reliability.',
    features: [
      'Setup of a Third-Party SMTP Service',
      'Integration with Your WordPress Site',
      'Ensures Emails Bypass Server Limits',
    ],
  },
  {
    id: 'blacklist-check',
    name: 'Email Blacklist Check & Removal',
    price: 129,
    icon: Shield,
    description:
      'Check if your domain or IP is on email blacklists and request removal.',
    features: [
      'Scan Against 100+ Email Blacklists',
      'Analysis of Blacklisting Reason',
      'Delisting Request Submission',
    ],
  },
];

const emailCustomFields: CustomField[] = [
  {
    id: 'email_issue',
    label: 'What is the main email problem?',
    type: 'select',
    required: true,
    options: [
      'Website contact forms are not sending emails',
      'Emails from the site are going to spam',
      'Emails are not being delivered at all',
      'Receiving bounce-back error messages',
      'Other',
    ],
  },
  {
    id: 'email_provider',
    label: 'Who provides your email service?',
    type: 'text',
    placeholder: 'e.g., Google Workspace, Microsoft 365, Hostinger Email',
    required: true,
  },
];

const EmailDeliverabilityStepper = () => {
  return (
    <ServiceStepper
      title='Email Deliverability Service'
      subtitle='Ensure your website’s emails reach the inbox, not the spam folder. We fix issues with SPF, DKIM, DMARC, and more.'
      coreService={emailCoreService}
      addOnServices={emailAddOns}
      customFields={emailCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default EmailDeliverabilityStepper;
