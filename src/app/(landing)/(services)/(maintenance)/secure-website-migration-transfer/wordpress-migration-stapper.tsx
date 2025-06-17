// app/services/website-migration/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Move, Shield, Zap, Settings, Globe } from 'lucide-react';

const migrationCoreService: CoreService = {
  id: 'website-migration-pro',
  name: 'Professional Website Migration',
  price: 399,
  originalPrice: 499,
  responseTime: 'Within 24 hours',
  completionTime: '3-7 business days',
  features: [
    'Complete Site Migration',
    'Domain & DNS Configuration',
    'Database Migration',
    'File Transfer & Optimization',
    'SSL Certificate Setup',
    'Email Migration (if applicable)',
    'SEO Preservation',
    'Post-Migration Testing',
    'Migration Documentation',
  ],
  guarantees: ['Zero Downtime Migration', '30-Day Post-Migration Support'],
};

const migrationAddOns: AddOnService[] = [
  {
    id: 'premium-support',
    name: 'Premium Migration Support',
    price: 149,
    icon: Shield,
    popular: true,
    description:
      'Enhanced support with backup plans and rollback options during migration.',
    features: [
      'Full Site Backup Before Migration',
      'Instant Rollback Option',
      'Priority Support During Migration',
      'Extended Post-Migration Support',
    ],
  },
  {
    id: 'performance-optimization',
    name: 'Migration + Performance Boost',
    price: 199,
    icon: Zap,
    description:
      'Combine migration with performance optimization for better loading speeds.',
    features: [
      'Speed Optimization During Migration',
      'Caching Configuration',
      'Image Optimization',
      'Performance Testing & Tuning',
    ],
  },
  {
    id: 'advanced-setup',
    name: 'Advanced Server Setup',
    price: 299,
    icon: Settings,
    description:
      'Custom server configuration and advanced hosting environment setup.',
    features: [
      'Custom Server Configuration',
      'Advanced Security Hardening',
      'Performance Tuning',
      'Monitoring Setup',
    ],
  },
];

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

const WebsiteMigrationStepper = () => {
  return (
    <ServiceStepper
      title='Professional Website Migration'
      subtitle='Migrate your website safely and efficiently with zero downtime. Our experts handle all technical aspects while preserving your SEO and functionality.'
      coreService={migrationCoreService}
      addOnServices={migrationAddOns}
      customFields={migrationCustomFields}
      emergencyService={false}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WebsiteMigrationStepper;
