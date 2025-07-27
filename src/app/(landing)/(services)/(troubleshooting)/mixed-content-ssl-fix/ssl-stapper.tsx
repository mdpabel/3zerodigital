'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const mixedContentCustomFields: CustomField[] = [
  {
    id: 'ssl_install_date',
    label: 'When did you install the SSL certificate?',
    type: 'select',
    required: true,
    options: [
      'Just now / in the last 24 hours',
      'Within the last week',
      'A while ago',
      'Not sure',
    ],
  },
  {
    id: 'error_location',
    label: 'Is the "Not Secure" warning on all pages?',
    type: 'select',
    required: true,
    options: [
      'Yes, on all pages',
      'Only on the homepage',
      'Only on specific pages',
    ],
  },
];

const SslMixedContentErrorStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Fix SSL Mixed Content Errors'
      subtitle='Remove the "Not Secure" warning from your site. We find and fix all insecurely loaded content to restore your green padlock.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={mixedContentCustomFields}
      emergencyService={true}
      allowMultipleSites={true}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default SslMixedContentErrorStepper;
