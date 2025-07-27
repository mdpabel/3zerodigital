'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

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

const WordPressRescueStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='WordPress Rescue & Repair'
      subtitle='Is your site completely broken? Our emergency rescue service is a one-stop solution to diagnose, fix, and restore your WordPress website.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={rescueCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={true}
      requiresDescription={false} // The custom field covers this
    />
  );
};

export default WordPressRescueStepper;
