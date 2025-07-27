'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

const migrationCustomFields: CustomField[] = [
  {
    id: 'migration_type',
    label: 'What type of migration do you need?',
    type: 'select',
    required: true,
    options: [
      'Host to Host (same domain)',
      'Domain Change (new domain)',
      'Platform Change (e.g., Wix to WordPress)',
      'Server Upgrade/Downgrade',
      'Development to Live Site',
      'Other',
    ],
  },
  {
    id: 'current_host',
    label: 'Current hosting provider',
    type: 'text',
    placeholder: 'e.g., GoDaddy, Bluehost, SiteGround',
    required: true,
  },
  {
    id: 'new_host',
    label: 'New hosting provider',
    type: 'text',
    placeholder: 'e.g., WP Engine, Kinsta, AWS',
    required: true,
  },
  {
    id: 'site_size',
    label: 'Approximate size of your website',
    type: 'select',
    required: true,
    options: [
      'Small (less than 1GB)',
      'Medium (1-5GB)',
      'Large (5-20GB)',
      'Very Large (20GB+)',
      'Not sure',
    ],
  },
  {
    id: 'email_migration',
    label: 'Do you need email migration?',
    type: 'select',
    required: true,
    options: [
      'Yes, migrate email accounts',
      'No, keeping current email setup',
      'Not sure',
    ],
  },
  {
    id: 'downtime_preference',
    label: 'Downtime preference',
    type: 'select',
    required: true,
    options: [
      'Zero downtime (premium method)',
      'Minimal downtime (1-2 hours)',
      'Flexible with downtime',
    ],
  },
];

const WebsiteMigrationStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='Professional Website Migration'
      subtitle='Migrate your website safely and efficiently with zero downtime. Our experts handle all technical aspects while preserving your SEO and functionality.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={migrationCustomFields}
      emergencyService={false}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WebsiteMigrationStepper;
