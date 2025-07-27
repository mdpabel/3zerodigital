'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const http500CustomFields: CustomField[] = [
  {
    id: 'error_trigger',
    label: 'When did this error start appearing?',
    type: 'textarea',
    placeholder:
      'e.g., After updating a plugin, after installing a new theme, it happened randomly...',
    required: true,
  },
  {
    id: 'error_location',
    label: 'Where does the error appear?',
    type: 'select',
    required: true,
    options: [
      'The entire website is down',
      'Only in the WordPress admin area (wp-admin)',
      'Only on the public-facing site',
      'When performing a specific action (e.g., publishing a post)',
    ],
  },
];

const Http500ErrorStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Fix 500 Internal Server Error'
      subtitle='Get your site back online fast. Our experts will diagnose and resolve the critical 500 Internal Server Error, guaranteed.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={http500CustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default Http500ErrorStepper;
