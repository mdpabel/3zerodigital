// app/services/blacklist-removal/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Shield, Zap, Search, BarChart3 } from 'lucide-react';

const blacklistCoreService: CoreService = {
  id: 'blacklist-removal-pro',
  name: 'Professional Blacklist Removal',
  price: 149,
  originalPrice: 199,
  responseTime: 'Within 2 hours',
  completionTime: '24-72 hours',
  features: [
    'Google Safe Browsing Removal',
    'Norton Safe Web Removal',
    'McAfee SiteAdvisor Removal',
    'Sucuri Blacklist Removal',
    'Malware Cleanup (if needed)',
    'Resubmission to All Services',
    'Detailed Status Report',
  ],
  guarantees: ['100% Blacklist Removal Guarantee', '7-Day Monitoring Included'],
};

const blacklistAddOns: AddOnService[] = [
  {
    id: 'express-removal',
    name: 'Express Removal Service',
    price: 99,
    icon: Zap,
    urgent: true,
    description:
      'Emergency blacklist removal with immediate attention and faster processing.',
    features: [
      'Immediate Processing',
      'Senior Security Analyst',
      'Expedited Resubmission',
      'Hourly Status Updates',
    ],
  },
  {
    id: 'seo-impact-analysis',
    name: 'SEO Impact Analysis',
    price: 79,
    icon: BarChart3,
    popular: true,
    description:
      'Comprehensive analysis of blacklist impact on your SEO and recovery recommendations.',
    features: [
      'Traffic Loss Analysis',
      'Ranking Impact Assessment',
      'Recovery Timeline Projection',
      'SEO Recovery Recommendations',
    ],
  },
  {
    id: 'ongoing-monitoring',
    name: 'Blacklist Monitoring',
    price: 39,
    icon: Search,
    description:
      'Continuous monitoring to prevent future blacklisting and immediate alerts.',
    features: [
      'Daily Blacklist Checks',
      'Instant Alert Notifications',
      'Monthly Security Reports',
      'Reputation Monitoring',
    ],
  },
];

const blacklistCustomFields: CustomField[] = [
  {
    id: 'blacklist_services',
    label: 'Which services have blacklisted your site?',
    type: 'checkbox',
    required: true,
    options: [
      'Google Safe Browsing',
      'Norton Safe Web',
      'McAfee SiteAdvisor',
      'Sucuri',
      'Bitdefender',
      'Kaspersky',
      'Not sure - please check all',
    ],
  },
  {
    id: 'blacklist_reason',
    label: 'Do you know why your site was blacklisted?',
    type: 'select',
    required: false,
    options: [
      'Malware infection',
      'Phishing content',
      'Suspicious redirects',
      'Spam/unwanted software',
      'Compromised site',
      'Not sure',
    ],
  },
  {
    id: 'traffic_impact',
    label: 'How has this affected your website traffic?',
    type: 'select',
    required: false,
    options: [
      'Significant drop (50%+)',
      'Moderate drop (20-50%)',
      'Minor drop (less than 20%)',
      'No noticeable change yet',
      'Not sure',
    ],
  },
];

const BlacklistRemovalStepper = () => {
  return (
    <ServiceStepper
      title='Website Blacklist Removal Service'
      subtitle='Get your website removed from blacklists quickly and safely. Our experts handle all major security services and ensure your site reputation is restored.'
      coreService={blacklistCoreService}
      addOnServices={blacklistAddOns}
      customFields={blacklistCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default BlacklistRemovalStepper;
