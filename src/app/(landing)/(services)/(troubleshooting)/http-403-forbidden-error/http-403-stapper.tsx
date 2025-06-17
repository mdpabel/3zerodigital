// app/services/http-403-error/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { ShieldAlert, FileLock, Server, Shield } from 'lucide-react';

const http403CoreService: CoreService = {
  id: 'http-403-fix',
  name: '403 Forbidden Error Fix',
  price: 129,
  originalPrice: 159,
  responseTime: 'Within 2 hours',
  completionTime: 'Within 12 hours',
  features: [
    'Diagnose Root Cause of 403 Error',
    'Correct File & Folder Permissions',
    'Inspect & Repair .htaccess File',
    'Check for Faulty Security Plugin Rules',
    'Verify Site is Accessible',
    'Report on Actions Taken',
  ],
  guarantees: ['Guaranteed Access Restoration', '14-Day Post-Fix Support'],
};

const http403AddOns: AddOnService[] = [
  {
    id: 'full-security-audit',
    name: 'Full Security Audit',
    price: 149,
    icon: Shield,
    popular: true,
    description:
      'A 403 error can be caused by a security breach. We will perform a comprehensive audit to secure your site.',
    features: [
      'Malware & Backdoor Scan',
      'User Role & Permission Review',
      'Security Hardening Recommendations',
    ],
  },
];

const http403CustomFields: CustomField[] = [
  {
    id: 'error_location',
    label: 'Where are you seeing the 403 error?',
    type: 'select',
    required: true,
    options: [
      'When trying to access the wp-admin login page',
      'After logging into the wp-admin dashboard',
      'On the entire public website',
      'On specific pages or files',
    ],
  },
  {
    id: 'security_plugins',
    label: 'Are you using any security plugins?',
    type: 'text',
    placeholder: 'e.g., Wordfence, Sucuri, iThemes Security',
    required: false,
  },
];

const Http403ErrorStepper = () => {
  return (
    <ServiceStepper
      title='Fix HTTP 403 Forbidden Error'
      subtitle='Regain access to your site. Our specialists will find and fix the cause of the 403 Forbidden error quickly and securely.'
      coreService={http403CoreService}
      addOnServices={http403AddOns}
      customFields={http403CustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default Http403ErrorStepper;
