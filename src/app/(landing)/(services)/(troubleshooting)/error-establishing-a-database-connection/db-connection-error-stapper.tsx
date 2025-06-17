// app/services/database-connection-error/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { DatabaseZap, Server, Shield, Database } from 'lucide-react';

const dbErrorCoreService: CoreService = {
  id: 'db-error-fix',
  name: 'Database Connection Error Fix',
  price: 129,
  originalPrice: 179,
  responseTime: 'Within 1 hour',
  completionTime: 'Within 6 hours',
  features: [
    'Verify wp-config.php Credentials',
    'Diagnose Database Host/Server Issues',
    'Check for Corrupted Database',
    'Repair Corrupted Database Tables if needed',
    'Restore Database Connection',
    'Report on the Cause and Solution',
  ],
  guarantees: [
    'Guaranteed Database Connection Fix',
    '7-Day Post-Fix Monitoring',
  ],
};

const dbErrorAddOns: AddOnService[] = [
  {
    id: 'database-optimization',
    name: 'Database Optimization',
    price: 79,
    icon: Database,
    popular: true,
    description:
      'Clean up and optimize your database for faster queries and better overall site performance.',
    features: [
      'Remove Post Revisions & Transients',
      'Optimize Database Tables',
      'Improves Site Speed',
    ],
  },
];

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

const DatabaseConnectionErrorStepper = () => {
  return (
    <ServiceStepper
      title='Fix "Error Establishing a Database Connection"'
      subtitle='This critical error takes your whole site down. Our experts will quickly diagnose and fix your database connection issues.'
      coreService={dbErrorCoreService}
      addOnServices={dbErrorAddOns}
      customFields={dbErrorCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default DatabaseConnectionErrorStepper;
