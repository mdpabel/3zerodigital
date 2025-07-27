'use client';

import ServiceStepper from '@/components/service-stepper';
import {
  CustomField,
  ServiceStepperProps,
} from '@/components/service-stepper/types';

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

const guarantees = [
  '100% DNS Issue Resolution Guarantee',
  'Post-Fix Monitoring & Support Included',
];

const DnsIssueStepper = ({
  addOnServices,
  coreService,
}: Pick<ServiceStepperProps, 'addOnServices' | 'coreService'>) => {
  return (
    <ServiceStepper
      title='DNS Issue Resolution Service'
      subtitle='DNS problems can take your site and email offline. Our experts will troubleshoot and fix your DNS records correctly.'
      coreService={coreService}
      addOnServices={addOnServices}
      customFields={dnsCustomFields}
      emergencyService={true}
      allowMultipleSites={false}
      requiresSiteUrl={false} // URL might not be resolving
      requiresDescription={true}
      guarantees={guarantees}
    />
  );
};

export default DnsIssueStepper;
