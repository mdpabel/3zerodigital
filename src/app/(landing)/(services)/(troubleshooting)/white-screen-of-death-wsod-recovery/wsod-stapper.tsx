'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const wsodCustomFields: CustomField[] = [
  {
    id: 'recent_actions',
    label: 'What was the last action you took before the site went down?',
    type: 'textarea',
    placeholder: 'e.g., I updated a plugin, edited a theme file, etc.',
    required: true,
  },
  {
    id: 'error_scope',
    label: 'Is the white screen everywhere?',
    type: 'select',
    required: true,
    options: [
      'Yes, the entire site (front-end and admin)',
      'Only the front-end is white, admin works',
      'Only the admin is white, front-end works',
      'Only certain pages are white',
    ],
  },
];

const WhiteScreenOfDeathStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Fix WordPress White Screen of Death'
      subtitle='Facing the dreaded blank screen? Our experts will quickly diagnose and fix the WordPress White Screen of Death to bring your site back.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={wsodCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WhiteScreenOfDeathStepper;
