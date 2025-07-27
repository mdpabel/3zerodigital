'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const http404CustomFields: CustomField[] = [
  {
    id: 'error_scope',
    label: 'Where are you seeing the 404 errors?',
    type: 'select',
    required: true,
    options: [
      'On all pages except the homepage',
      'On specific pages (please list in description)',
      'On the entire website',
      'After clicking certain links',
    ],
  },
  {
    id: 'recent_changes',
    label: 'Have you made any recent changes?',
    type: 'text',
    placeholder: 'e.g., Installed a new plugin, changed hosts, etc.',
    required: false,
  },
];

const Http404ErrorStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Fix HTTP 404 "Not Found" Errors'
      subtitle='Get rid of frustrating 404 errors on your WordPress site. Our experts will diagnose and fix the root cause quickly.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={http404CustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default Http404ErrorStepper;
