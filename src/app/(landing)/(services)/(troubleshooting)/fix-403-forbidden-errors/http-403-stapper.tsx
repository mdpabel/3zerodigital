'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const http403CustomFields: CustomField[] = [
  {
    id: 'error_location',
    label: 'Where are you seeing the 403 error?',
    type: 'select',
    required: true,
    options: [
      'When trying to access the wp-admin login page',
      'After logging into the wp-admin dashboard',
      'On the entire public website',
      'On specific pages or files',
    ],
  },
  {
    id: 'security_plugins',
    label: 'Are you using any security plugins?',
    type: 'text',
    placeholder: 'e.g., Wordfence, Sucuri, iThemes Security',
    required: false,
  },
];

const Http403ErrorStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Fix HTTP 403 Forbidden Error'
      subtitle='Regain access to your site. Our specialists will find and fix the cause of the 403 Forbidden error quickly and securely.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={http403CustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default Http403ErrorStepper;
