'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const maintenanceCustomFields: CustomField[] = [
  {
    id: 'site_complexity',
    label: 'How complex is your WordPress site?',
    type: 'select',
    required: true,
    options: [
      'Simple Blog/Portfolio (1-10 pages)',
      'Business Website (10-50 pages)',
      'E-commerce Store',
      'Complex/Custom Site (50+ pages)',
      'Multisite Network',
    ],
  },
  {
    id: 'current_issues',
    label: 'Are you experiencing any current issues?',
    type: 'textarea',
    placeholder:
      'Describe any current problems, slow performance, or concerns...',
    required: false,
  },
  {
    id: 'backup_frequency',
    label: 'Preferred backup frequency',
    type: 'select',
    required: true,
    options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'],
  },
];

const WordPressMaintenanceStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='WordPress Maintenance & Support'
      subtitle='Keep your WordPress site secure, fast, and up-to-date with our comprehensive maintenance service. Focus on your business while we handle the technical details.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={maintenanceCustomFields}
      emergencyService={false}
      allowMultipleSites={true}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WordPressMaintenanceStepper;
