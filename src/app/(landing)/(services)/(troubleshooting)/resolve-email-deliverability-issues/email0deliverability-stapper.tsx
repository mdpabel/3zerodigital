'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

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

const EmailDeliverabilityStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Email Deliverability Service'
      subtitle='Ensure your website’s emails reach the inbox, not the spam folder. We fix issues with SPF, DKIM, DMARC, and more.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={emailCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default EmailDeliverabilityStepper;
