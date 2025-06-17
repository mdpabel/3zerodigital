// app/services/wordpress-rescue/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { HeartPulse, Shield, Zap, Server } from 'lucide-react';

const rescueCoreService: CoreService = {
  id: 'wordpress-rescue-pro',
  name: 'Emergency WordPress Rescue & Repair',
  price: 299,
  originalPrice: 399,
  responseTime: 'Within 1 hour',
  completionTime: 'Within 24 hours',
  features: [
    'Comprehensive Site Diagnosis (All Issues)',
    'Emergency Backup of Current State',
    'Fix for Critical Errors (WSOD, 500, Database)',
    'Basic Malware & Hack Scan',
    'Restore Core WordPress Files',
    'Get Site Back to a Functional State',
    'Detailed Triage & Repair Report',
  ],
  guarantees: [
    'Guaranteed Site Restoration',
    '30-Day Post-Rescue Support Plan',
  ],
};

const rescueAddOns: AddOnService[] = [
  {
    id: 'full-security-hardening',
    name: 'Full Security Hardening',
    price: 199,
    icon: Shield,
    popular: true,
    description:
      'After rescuing your site, we will fully secure it to prevent future attacks and vulnerabilities.',
    features: [
      'Deep Malware Removal',
      'Firewall (WAF) Setup',
      'Login Protection & Hardening',
      'Full Security Audit & Report',
    ],
  },
  {
    id: 'performance-overhaul',
    name: 'Performance Overhaul',
    price: 249,
    icon: Zap,
    description:
      'Dramatically improve your site’s speed and stability after the repair.',
    features: [
      'Complete Performance Audit',
      'Advanced Caching & CDN Setup',
      'Image & Database Optimization',
      'Core Web Vitals Improvement',
    ],
  },
];

const rescueCustomFields: CustomField[] = [
  {
    id: 'list_of_issues',
    label: 'Please list all the problems you are aware of *',
    type: 'textarea',
    placeholder:
      'e.g., Site is down, getting a 500 error, admin is locked, looks hacked, etc.',
    required: true,
  },
  {
    id: 'recent_events',
    label: 'What happened right before the site broke?',
    type: 'textarea',
    placeholder: 'e.g., Updated plugins, got a notice from host...',
    required: false,
  },
];

const WordPressRescueStepper = () => {
  return (
    <ServiceStepper
      title='WordPress Rescue & Repair'
      subtitle='Is your site completely broken? Our emergency rescue service is a one-stop solution to diagnose, fix, and restore your WordPress website.'
      coreService={rescueCoreService}
      addOnServices={rescueAddOns}
      customFields={rescueCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={false} // The custom field covers this
    />
  );
};

export default WordPressRescueStepper;
