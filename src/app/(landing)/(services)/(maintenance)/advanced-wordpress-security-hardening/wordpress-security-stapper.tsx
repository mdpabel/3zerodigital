// app/services/wordpress-security/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Shield, Lock, Eye, AlertTriangle, FileText } from 'lucide-react';

const securityCoreService: CoreService = {
  id: 'wordpress-security-pro',
  name: 'WordPress Security Hardening Pro',
  price: 249,
  originalPrice: 329,
  responseTime: 'Within 24 hours',
  completionTime: '2-3 business days',
  features: [
    'Complete Security Audit',
    'Vulnerability Assessment',
    'Security Hardening Implementation',
    'Malware Scanning & Removal',
    'Firewall Configuration',
    'Login Security Enhancement',
    'File Permission Optimization',
    'Security Plugin Setup',
    'Detailed Security Report',
  ],
  guarantees: ['99.9% Security Improvement', '60-Day Security Monitoring'],
};

const securityAddOns: AddOnService[] = [
  {
    id: 'advanced-monitoring',
    name: 'Advanced Security Monitoring',
    price: 99,
    icon: Eye,
    popular: true,
    description:
      '24/7 security monitoring with real-time threat detection and response.',
    features: [
      'Real-time Threat Detection',
      'Automated Incident Response',
      'Weekly Security Scans',
      'Intrusion Detection System',
    ],
  },
  {
    id: 'penetration-testing',
    name: 'Penetration Testing',
    price: 399,
    icon: AlertTriangle,
    description:
      'Professional penetration testing to identify security vulnerabilities.',
    features: [
      'Comprehensive Penetration Test',
      'Vulnerability Exploitation Testing',
      'Detailed Risk Assessment',
      'Remediation Recommendations',
    ],
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit',
    price: 199,
    icon: FileText,
    description:
      'Security compliance audit for GDPR, PCI DSS, and other standards.',
    features: [
      'GDPR Compliance Check',
      'PCI DSS Assessment',
      'Security Standards Audit',
      'Compliance Report & Recommendations',
    ],
  },
];

const securityCustomFields: CustomField[] = [
  {
    id: 'security_concerns',
    label: 'What are your main security concerns?',
    type: 'checkbox',
    required: true,
    options: [
      'Previous hack/malware infection',
      'Weak login security',
      'Outdated plugins/themes',
      'No security measures in place',
      'Handling sensitive customer data',
      'Compliance requirements',
      'General security improvement',
    ],
  },
  {
    id: 'data_sensitivity',
    label: 'What type of sensitive data does your site handle?',
    type: 'checkbox',
    required: false,
    options: [
      'Customer personal information',
      'Payment/credit card data',
      'Medical/health records',
      'Financial information',
      'Legal documents',
      'None of the above',
    ],
  },
  {
    id: 'compliance_requirements',
    label: 'Do you have any compliance requirements?',
    type: 'select',
    required: false,
    options: [
      'GDPR (General Data Protection Regulation)',
      'PCI DSS (Payment Card Industry)',
      'HIPAA (Health Insurance Portability)',
      'SOC 2 (Service Organization Control)',
      'None that I know of',
      'Not sure',
    ],
  },
];

const WordPressSecurityStepper = () => {
  return (
    <ServiceStepper
      title='WordPress Security Hardening'
      subtitle='Protect your WordPress site from hackers, malware, and security threats with our comprehensive security hardening service.'
      coreService={securityCoreService}
      addOnServices={securityAddOns}
      customFields={securityCustomFields}
      emergencyService={false}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default WordPressSecurityStepper;
