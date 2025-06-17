// app/services/white-screen-of-death/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { MonitorOff, Shield, Zap, FileCode } from 'lucide-react';

const wsodCoreService: CoreService = {
  id: 'wsod-fix',
  name: 'White Screen of Death Fix',
  price: 149,
  originalPrice: 199,
  responseTime: 'Within 1 hour',
  completionTime: 'Within 8 hours',
  features: [
    'Emergency Diagnosis of Blank Screen',
    'Enable WP_DEBUG to Identify Error',
    'Isolate Plugin or Theme Conflict',
    'Check for PHP Memory Limit Issues',
    'Resolve Core File Corruption',
    'Restore Full Site Functionality',
    'Report on the Root Cause and Fix',
  ],
  guarantees: ['Guaranteed Site Restoration', '7-Day Post-Fix Monitoring'],
};

const wsodAddOns: AddOnService[] = [
  {
    id: 'full-site-health-check',
    name: 'Full Site Health Check',
    price: 99,
    icon: Zap,
    popular: true,
    description:
      'After fixing the WSOD, we will perform a full health check to prevent future issues and optimize performance.',
    features: [
      'Plugin & Theme Audit',
      'Performance Analysis',
      'Security Scan',
      'Health Report with Recommendations',
    ],
  },
];

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

const WhiteScreenOfDeathStepper = () => {
  return (
    <ServiceStepper
      title='Fix WordPress White Screen of Death'
      subtitle='Facing the dreaded blank screen? Our experts will quickly diagnose and fix the WordPress White Screen of Death to bring your site back.'
      coreService={wsodCoreService}
      addOnServices={wsodAddOns}
      customFields={wsodCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WhiteScreenOfDeathStepper;
