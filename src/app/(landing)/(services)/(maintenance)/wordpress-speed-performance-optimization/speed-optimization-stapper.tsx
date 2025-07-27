'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

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

const SpeedOptimizationStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='WordPress Speed Optimization'
      subtitle='Dramatically improve your website loading speed, boost SEO rankings, and enhance user experience with our comprehensive optimization service.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={speedOptimizationCustomFields}
      emergencyService={false}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={true}
    />
  );
};

export default SpeedOptimizationStepper;
