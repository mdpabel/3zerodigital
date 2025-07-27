'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const securityCustomFields: CustomField[] = [
  {
    id: 'security_concerns',
    label: 'What are your main security concerns?',
    type: 'checkbox',
    required: true,
    options: [
      'Previous hack/malware infection',
      'Weak login security',
      'Outdated plugins/themes',
      'No security measures in place',
      'Handling sensitive customer data',
      'Compliance requirements',
      'General security improvement',
    ],
  },
  {
    id: 'data_sensitivity',
    label: 'What type of sensitive data does your site handle?',
    type: 'checkbox',
    required: false,
    options: [
      'Customer personal information',
      'Payment/credit card data',
      'Medical/health records',
      'Financial information',
      'Legal documents',
      'None of the above',
    ],
  },
  {
    id: 'compliance_requirements',
    label: 'Do you have any compliance requirements?',
    type: 'select',
    required: false,
    options: [
      'GDPR (General Data Protection Regulation)',
      'PCI DSS (Payment Card Industry)',
      'HIPAA (Health Insurance Portability)',
      'SOC 2 (Service Organization Control)',
      'None that I know of',
      'Not sure',
    ],
  },
];

const WordPressSecurityStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='WordPress Security Hardening'
      subtitle='Protect your WordPress site from hackers, malware, and security threats with our comprehensive security hardening service.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={securityCustomFields}
      emergencyService={false}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WordPressSecurityStepper;
