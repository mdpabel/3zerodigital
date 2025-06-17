// app/services/speed-optimization/page.tsx
'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CoreService,
  AddOnService,
  CustomField,
} from '@/components/service-stepper/types';
import { Zap, Image, Database, Globe, BarChart3 } from 'lucide-react';

const speedOptimizationCoreService: CoreService = {
  id: 'speed-optimization-pro',
  name: 'WordPress Speed Optimization Pro',
  price: 299,
  originalPrice: 399,
  responseTime: 'Within 24 hours',
  completionTime: '3-5 business days',
  features: [
    'Complete Performance Audit',
    'Image Optimization & Compression',
    'Caching Configuration',
    'Database Optimization',
    'Code Minification & Compression',
    'CDN Setup & Configuration',
    'Mobile Speed Optimization',
    'Core Web Vitals Improvement',
    'Before/After Performance Report',
  ],
  guarantees: [
    '50%+ Speed Improvement Guarantee',
    '30-Day Performance Monitoring',
  ],
};

const speedOptimizationAddOns: AddOnService[] = [
  {
    id: 'premium-cdn',
    name: 'Premium CDN Setup',
    price: 149,
    icon: Globe,
    popular: true,
    description:
      'Enterprise-grade CDN with advanced caching and global edge locations.',
    features: [
      'Premium CDN Service Setup',
      'Advanced Caching Rules',
      'Image Optimization CDN',
      '6-Month CDN Service Included',
    ],
  },
  {
    id: 'advanced-caching',
    name: 'Advanced Caching Solution',
    price: 199,
    icon: Zap,
    description:
      'Server-level caching with Redis/Memcached and advanced optimization.',
    features: [
      'Redis/Memcached Setup',
      'Object Caching Configuration',
      'Advanced Cache Purging',
      'Server-Level Optimizations',
    ],
  },
  {
    id: 'ongoing-monitoring',
    name: 'Performance Monitoring',
    price: 79,
    icon: BarChart3,
    description:
      'Continuous performance monitoring with monthly optimization reports.',
    features: [
      'Monthly Speed Audits',
      'Performance Alerts',
      'Core Web Vitals Tracking',
      'Optimization Recommendations',
    ],
  },
];

const speedOptimizationCustomFields: CustomField[] = [
  {
    id: 'current_speed',
    label: 'What is your current website loading speed?',
    type: 'select',
    required: true,
    options: [
      'Very slow (5+ seconds)',
      'Slow (3-5 seconds)',
      'Average (2-3 seconds)',
      'Not sure - please test',
    ],
  },
  {
    id: 'primary_concern',
    label: 'What is your primary speed concern?',
    type: 'select',
    required: true,
    options: [
      'Overall slow loading',
      'Mobile performance',
      'Large images loading slowly',
      'Slow admin dashboard',
      'High bounce rate due to speed',
      'SEO impact from slow speeds',
    ],
  },
  {
    id: 'website_type',
    label: 'What type of website do you have?',
    type: 'select',
    required: true,
    options: [
      'Business/Corporate Site',
      'E-commerce Store',
      'Blog/News Site',
      'Portfolio/Photography',
      'Learning Management System',
      'Membership Site',
      'Other',
    ],
  },
  {
    id: 'monthly_visitors',
    label: 'Approximate monthly visitors',
    type: 'select',
    required: false,
    options: [
      'Less than 1,000',
      '1,000 - 10,000',
      '10,000 - 50,000',
      '50,000 - 100,000',
      '100,000+',
      'Not sure',
    ],
  },
];

const SpeedOptimizationStepper = () => {
  return (
    <ServiceStepper
      title='WordPress Speed Optimization'
      subtitle='Dramatically improve your website loading speed, boost SEO rankings, and enhance user experience with our comprehensive optimization service.'
      coreService={speedOptimizationCoreService}
      addOnServices={speedOptimizationAddOns}
      customFields={speedOptimizationCustomFields}
      emergencyService={false}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default SpeedOptimizationStepper;
