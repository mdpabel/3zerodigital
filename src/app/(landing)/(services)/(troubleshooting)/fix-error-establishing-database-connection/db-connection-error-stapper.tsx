'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const dbErrorCustomFields: CustomField[] = [
  {
    id: 'hosting_provider',
    label: 'Who is your website hosting provider?',
    type: 'text',
    placeholder: 'e.g., GoDaddy, Bluehost, WP Engine',
    required: true,
  },
  {
    id: 'recent_changes',
    label: 'Did you recently change your password or move your site?',
    type: 'textarea',
    placeholder: 'e.g., I changed my database password, moved to a new host...',
    required: false,
  },
];

const DatabaseConnectionErrorStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Fix "Error Establishing a Database Connection"'
      subtitle='This critical error takes your whole site down. Our experts will quickly diagnose and fix your database connection issues.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={dbErrorCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default DatabaseConnectionErrorStepper;
