// app/services/ssl-mixed-content-error/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Lock, Search, Database, Shield } from 'lucide-react';

const mixedContentCoreService: CoreService = {
  id: 'mixed-content-fix',
  name: 'SSL Mixed Content Error Fix',
  price: 119,
  originalPrice: 149,
  responseTime: 'Within 4 hours',
  completionTime: 'Within 24 hours',
  features: [
    'Identify All Insecure (HTTP) Assets',
    'Update URLs in Content & Widgets',
    'Scan Theme & Plugin Files for HTTP links',
    'Force HTTPS for All Assets',
    'Verify Secure Padlock is Showing',
    'Detailed Fix Report',
  ],
  guarantees: ['100% Secure Padlock Guarantee', '14-Day Post-Fix Verification'],
};

const mixedContentAddOns: AddOnService[] = [
  {
    id: 'database-cleanup',
    name: 'Full Database URL Update',
    price: 79,
    icon: Database,
    popular: true,
    description:
      'Perform a deep search and replace within the entire database to ensure all old HTTP links are updated.',
    features: [
      'Safe Database Search & Replace',
      'Updates Post Content, Meta, and Options',
      'Prevents Future Mixed Content Issues',
    ],
  },
];

const mixedContentCustomFields: CustomField[] = [
  {
    id: 'ssl_install_date',
    label: 'When did you install the SSL certificate?',
    type: 'select',
    required: true,
    options: [
      'Just now / in the last 24 hours',
      'Within the last week',
      'A while ago',
      'Not sure',
    ],
  },
  {
    id: 'error_location',
    label: 'Is the "Not Secure" warning on all pages?',
    type: 'select',
    required: true,
    options: [
      'Yes, on all pages',
      'Only on the homepage',
      'Only on specific pages',
    ],
  },
];

const SslMixedContentErrorStepper = () => {
  return (
    <ServiceStepper
      title='Fix SSL Mixed Content Errors'
      subtitle='Remove the "Not Secure" warning from your site. We find and fix all insecurely loaded content to restore your green padlock.'
      coreService={mixedContentCoreService}
      addOnServices={mixedContentAddOns}
      customFields={mixedContentCustomFields}
      emergencyService={true}
      allowMultipleSites={true}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default SslMixedContentErrorStepper;
