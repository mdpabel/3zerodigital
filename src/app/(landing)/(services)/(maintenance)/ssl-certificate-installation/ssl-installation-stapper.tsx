'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const sslCustomFields: CustomField[] = [
  {
    id: 'hosting_provider',
    label: 'Who is your website hosting provider?',
    type: 'text',
    placeholder: 'e.g., GoDaddy, Bluehost, WP Engine',
    required: true,
  },
  {
    id: 'ssl_purchased',
    label: 'Have you already purchased an SSL certificate?',
    type: 'select',
    required: true,
    options: [
      "No, I need one (e.g., Let's Encrypt)",
      'Yes, I have the certificate files',
      'Yes, it is from my hosting provider',
      'Not sure',
    ],
  },
];

const SslInstallationStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='SSL Certificate Installation'
      subtitle='Secure your website and gain visitor trust with a professional SSL installation. We handle everything to get the green padlock showing.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={sslCustomFields}
      emergencyService={false}
      allowMultipleSites={true}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default SslInstallationStepper;
