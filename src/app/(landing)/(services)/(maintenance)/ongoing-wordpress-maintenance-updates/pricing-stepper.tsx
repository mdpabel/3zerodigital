'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Settings, Shield, Zap, BarChart3, HeadphonesIcon } from 'lucide-react';

const maintenanceCoreService: CoreService = {
  id: 'wordpress-maintenance-pro',
  name: 'WordPress Maintenance Pro',
  price: 79,
  originalPrice: 99,
  responseTime: 'Monthly updates',
  completionTime: 'Ongoing service',
  features: [
    'WordPress Core & Plugin Updates',
    'Security Monitoring & Malware Scans',
    'Weekly Automated Backups',
    'Uptime Monitoring (99.9% SLA)',
    'Performance Optimization',
    'Monthly Health Reports',
    'Priority Support Access',
  ],
  guarantees: ['99.9% Uptime Guarantee', '24/7 Emergency Support'],
};

const maintenanceAddOns: AddOnService[] = [
  {
    id: 'priority-support',
    name: 'Priority Support & SLA',
    price: 49,
    icon: HeadphonesIcon,
    popular: true,
    description:
      'Get priority support with guaranteed response times and dedicated account management.',
    features: [
      '2-Hour Response Time Guarantee',
      'Dedicated Account Manager',
      'Phone Support Access',
      'Custom SLA Agreement',
    ],
  },
  {
    id: 'content-updates',
    name: 'Content Updates Service',
    price: 99,
    icon: Settings,
    description:
      'We handle your content updates, page edits, and minor design changes monthly.',
    features: [
      'Up to 5 Hours of Content Updates',
      'Text, Image & Page Updates',
      'Minor Design Adjustments',
      'SEO Optimization for New Content',
    ],
  },
  {
    id: 'advanced-security',
    name: 'Advanced Security Package',
    price: 79,
    icon: Shield,
    description:
      'Enhanced security monitoring with firewall, login protection, and threat detection.',
    features: [
      'Web Application Firewall (WAF)',
      'Brute Force Protection',
      'Real-time Threat Detection',
      'Security Audit Reports',
    ],
  },
];

const maintenanceCustomFields: CustomField[] = [
  {
    id: 'site_complexity',
    label: 'How complex is your WordPress site?',
    type: 'select',
    required: true,
    options: [
      'Simple Blog/Portfolio (1-10 pages)',
      'Business Website (10-50 pages)',
      'E-commerce Store',
      'Complex/Custom Site (50+ pages)',
      'Multisite Network',
    ],
  },
  {
    id: 'current_issues',
    label: 'Are you experiencing any current issues?',
    type: 'textarea',
    placeholder:
      'Describe any current problems, slow performance, or concerns...',
    required: false,
  },
  {
    id: 'backup_frequency',
    label: 'Preferred backup frequency',
    type: 'select',
    required: true,
    options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'],
  },
];

const WordPressMaintenanceStepper = () => {
  return (
    <ServiceStepper
      title='WordPress Maintenance & Support'
      subtitle='Keep your WordPress site secure, fast, and up-to-date with our comprehensive maintenance service. Focus on your business while we handle the technical details.'
      coreService={maintenanceCoreService}
      addOnServices={maintenanceAddOns}
      customFields={maintenanceCustomFields}
      emergencyService={false}
      allowMultipleSites={true}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WordPressMaintenanceStepper;
