// app/services/http-500-error/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { ServerCrash, Shield, Zap, FileCode } from 'lucide-react';

const http500CoreService: CoreService = {
  id: 'http-500-fix',
  name: '500 Internal Server Error Fix',
  price: 149,
  originalPrice: 199,
  responseTime: 'Within 1 hour',
  completionTime: 'Within 12 hours',
  features: [
    'Emergency Error Diagnosis',
    'Check for Plugin/Theme Conflicts',
    'Inspect .htaccess File for Errors',
    'Check PHP Memory Limits',
    'Review Server Error Logs',
    'Implement Fix to Restore Site Access',
    'Summary of the Cause and Fix',
  ],
  guarantees: ['Guaranteed Site Restoration', '7-Day Post-Fix Monitoring'],
};

const http500AddOns: AddOnService[] = [
  {
    id: 'security-scan',
    name: 'Post-Fix Security Scan',
    price: 99,
    icon: Shield,
    popular: true,
    description:
      'A 500 error can be a sign of a hack. We will perform a full security scan to ensure your site is clean.',
    features: [
      'Deep Malware & Virus Scan',
      'Vulnerability Check',
      'File Integrity Monitoring',
    ],
  },
  {
    id: 'performance-tuneup',
    name: 'Server Performance Tune-Up',
    price: 129,
    icon: Zap,
    description:
      'Optimize server settings and resource allocation to prevent future 500 errors caused by performance issues.',
    features: [
      'PHP Version & Memory Limit Review',
      'Database Optimization',
      'Caching Recommendations',
    ],
  },
];

const http500CustomFields: CustomField[] = [
  {
    id: 'error_trigger',
    label: 'When did this error start appearing?',
    type: 'textarea',
    placeholder:
      'e.g., After updating a plugin, after installing a new theme, it happened randomly...',
    required: true,
  },
  {
    id: 'error_location',
    label: 'Where does the error appear?',
    type: 'select',
    required: true,
    options: [
      'The entire website is down',
      'Only in the WordPress admin area (wp-admin)',
      'Only on the public-facing site',
      'When performing a specific action (e.g., publishing a post)',
    ],
  },
];

const Http500ErrorStepper = () => {
  return (
    <ServiceStepper
      title='Fix 500 Internal Server Error'
      subtitle='Get your site back online fast. Our experts will diagnose and resolve the critical 500 Internal Server Error, guaranteed.'
      coreService={http500CoreService}
      addOnServices={http500AddOns}
      customFields={http500CustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default Http500ErrorStepper;
