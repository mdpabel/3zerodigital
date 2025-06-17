// app/services/dns-issue/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Globe, Server, Mail, Shield } from 'lucide-react';

const dnsCoreService: CoreService = {
  id: 'dns-issue-fix',
  name: 'DNS Issue Resolution',
  price: 149,
  originalPrice: 199,
  responseTime: 'Within 2 hours',
  completionTime: 'Within 24 hours (plus propagation time)',
  features: [
    'Full DNS Record Audit (A, CNAME, MX, TXT)',
    'Diagnose Misconfigurations',
    'Correct DNS Records at Your Registrar',
    'Verify Propagation of Changes',
    'Ensure Site & Email are Pointed Correctly',
    'Detailed Report of Changes Made',
  ],
  guarantees: [
    'Correct DNS Configuration Guarantee',
    '48-Hour Propagation Monitoring',
  ],
};

const dnsAddOns: AddOnService[] = [
  {
    id: 'cloudflare-setup',
    name: 'Cloudflare CDN & Security Setup',
    price: 99,
    icon: Shield,
    popular: true,
    description:
      'Move your DNS management to Cloudflare for improved speed, security, and reliability.',
    features: [
      'Cloudflare Account Setup',
      'DNS Migration to Cloudflare',
      'Basic CDN & WAF Configuration',
    ],
  },
];

const dnsCustomFields: CustomField[] = [
  {
    id: 'domain_registrar',
    label: 'Where is your domain registered?',
    type: 'text',
    placeholder: 'e.g., GoDaddy, Namecheap, Google Domains',
    required: true,
  },
  {
    id: 'hosting_provider',
    label: 'Who is your website hosting provider?',
    type: 'text',
    placeholder: 'e.g., SiteGround, Kinsta, AWS',
    required: true,
  },
  {
    id: 'dns_issue_type',
    label: 'What issue are you experiencing?',
    type: 'select',
    required: true,
    options: [
      'Website is not loading (DNS_PROBE_FINISHED_NXDOMAIN)',
      'Emails are not working',
      'Subdomain is not working',
      'Need to point domain to a new host',
      'Not sure',
    ],
  },
];

const DnsIssueStepper = () => {
  return (
    <ServiceStepper
      title='DNS Issue Resolution Service'
      subtitle='DNS problems can take your site and email offline. Our experts will troubleshoot and fix your DNS records correctly.'
      coreService={dnsCoreService}
      addOnServices={dnsAddOns}
      customFields={dnsCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={false} // URL might not be resolving
      requiresDescription={true}
    />
  );
};

export default DnsIssueStepper;
