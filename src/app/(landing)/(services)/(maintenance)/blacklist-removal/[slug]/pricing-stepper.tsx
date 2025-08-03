'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const blacklistCustomFields: CustomField[] = [
  {
    id: 'blacklist_services',
    label: 'Which services have blacklisted your site?',
    type: 'checkbox',
    required: true,
    options: [
      'Google Safe Browsing',
      'Norton Safe Web',
      'McAfee SiteAdvisor',
      'Sucuri',
      'Bitdefender',
      'Kaspersky',
      'Not sure - please check all',
    ],
  },
  {
    id: 'blacklist_reason',
    label: 'Do you know why your site was blacklisted?',
    type: 'select',
    required: false,
    options: [
      'Malware infection',
      'Phishing content',
      'Suspicious redirects',
      'Spam/unwanted software',
      'Compromised site',
      'Not sure',
    ],
  },
  {
    id: 'traffic_impact',
    label: 'How has this affected your website traffic?',
    type: 'select',
    required: false,
    options: [
      'Significant drop (50%+)',
      'Moderate drop (20-50%)',
      'Minor drop (less than 20%)',
      'No noticeable change yet',
      'Not sure',
    ],
  },
];

const BlacklistRemovalStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Website Blacklist Removal Service'
      subtitle='Get your website removed from blacklists quickly and safely. Our experts handle all major security services and ensure your site reputation is restored.'
      coreService={coreService}
      addOnServices={addOnServices}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default BlacklistRemovalStepper;
