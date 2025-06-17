// app/services/http-404-error/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Link, Search, Settings, AlertTriangle } from 'lucide-react';

const http404CoreService: CoreService = {
  id: 'http-404-fix',
  name: '404 "Not Found" Error Fix',
  price: 129,
  originalPrice: 159,
  responseTime: 'Within 2 hours',
  completionTime: 'Within 24 hours',
  features: [
    'Diagnose Root Cause (Permalinks, .htaccess)',
    'Fix Broken Permalinks Structure',
    'Repair/Rebuild .htaccess File',
    'Test Key Pages for Resolution',
    'Provide Detailed Fix Report',
  ],
  guarantees: ['Guaranteed Fix for 404 Errors', '14-Day Post-Fix Support'],
};

const http404AddOns: AddOnService[] = [
  {
    id: 'broken-link-audit',
    name: 'Broken Link Audit & Redirects',
    price: 99,
    icon: Search,
    popular: true,
    description:
      'Find all broken internal and external links on your site and set up 301 redirects to preserve SEO.',
    features: [
      'Full Website Crawl for Broken Links',
      'Creation of 301 Redirect Map',
      'Implementation of Redirects',
    ],
  },
  {
    id: 'custom-404-page',
    name: 'Custom 404 Page Design',
    price: 79,
    icon: Settings,
    description:
      'Create a helpful, on-brand 404 page to guide lost visitors and improve user experience.',
    features: [
      'Design of a Custom 404 Page',
      'Implementation on Your Website',
      'Links to Key Areas of Your Site',
    ],
  },
];

const http404CustomFields: CustomField[] = [
  {
    id: 'error_scope',
    label: 'Where are you seeing the 404 errors?',
    type: 'select',
    required: true,
    options: [
      'On all pages except the homepage',
      'On specific pages (please list in description)',
      'On the entire website',
      'After clicking certain links',
    ],
  },
  {
    id: 'recent_changes',
    label: 'Have you made any recent changes?',
    type: 'text',
    placeholder: 'e.g., Installed a new plugin, changed hosts, etc.',
    required: false,
  },
];

const Http404ErrorStepper = () => {
  return (
    <ServiceStepper
      title='Fix HTTP 404 "Not Found" Errors'
      subtitle='Get rid of frustrating 404 errors on your WordPress site. Our experts will diagnose and fix the root cause quickly.'
      coreService={http404CoreService}
      addOnServices={http404AddOns}
      customFields={http404CustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default Http404ErrorStepper;
