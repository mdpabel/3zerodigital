// app/services/ssl-installation/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Lock, Shield, Zap, Globe } from 'lucide-react';

const sslCoreService: CoreService = {
  id: 'ssl-installation-pro',
  name: 'Professional SSL Installation',
  price: 99,
  originalPrice: 129,
  responseTime: 'Within 4 hours',
  completionTime: 'Within 24 hours',
  features: [
    'SSL Certificate Installation & Configuration',
    'Update Site URLs to HTTPS',
    'Implement Sitewide HTTPS Redirects',
    'Verify SSL is Active and Trusted',
    'Basic Mixed Content Scan & Fix',
    'Confirmation Report',
  ],
  guarantees: ['100% Secure Padlock Guarantee', '14-Day Post-Install Support'],
};

const sslAddOns: AddOnService[] = [
  {
    id: 'advanced-mixed-content-fix',
    name: 'Advanced Mixed Content Fix',
    price: 79,
    icon: Shield,
    popular: true,
    description:
      'A deep scan and fix for stubborn mixed content warnings across your entire site, including database entries.',
    features: [
      'Full Database Search & Replace',
      'Theme & Plugin File Scan',
      'Fix Insecurely Loaded Scripts/Styles',
    ],
  },
  {
    id: 'wildcard-ssl-setup',
    name: 'Wildcard SSL Setup',
    price: 149,
    icon: Globe,
    description:
      'Secure your main domain and all its subdomains (e.g., blog.yoursite.com) with a single Wildcard SSL.',
    features: [
      'Wildcard Certificate Installation',
      'Configuration for All Subdomains',
      'DNS Verification Assistance',
    ],
  },
];

const sslCustomFields: CustomField[] = [
  {
    id: 'hosting_provider',
    label: 'Who is your website hosting provider?',
    type: 'text',
    placeholder: 'e.g., GoDaddy, Bluehost, WP Engine',
    required: true,
  },
  {
    id: 'ssl_purchased',
    label: 'Have you already purchased an SSL certificate?',
    type: 'select',
    required: true,
    options: [
      "No, I need one (e.g., Let's Encrypt)",
      'Yes, I have the certificate files',
      'Yes, it is from my hosting provider',
      'Not sure',
    ],
  },
];

const SslInstallationStepper = () => {
  return (
    <ServiceStepper
      title='SSL Certificate Installation'
      subtitle='Secure your website and gain visitor trust with a professional SSL installation. We handle everything to get the green padlock showing.'
      coreService={sslCoreService}
      addOnServices={sslAddOns}
      customFields={sslCustomFields}
      emergencyService={false}
      allowMultipleSites={true}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default SslInstallationStepper;
