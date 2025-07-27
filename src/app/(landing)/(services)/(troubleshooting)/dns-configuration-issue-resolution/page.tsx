import ServiceHero from '@/components/common/Hero';
import DnsIssueStepper from './dns-stapper';
import prisma from '../../../../../../prisma/db';
import { getServiceWithRelated } from '@/actions/service-actions';

const slug = 'dns-configuration-issue-resolution';

const page = async () => {
  const service = await getServiceWithRelated(slug);

  return (
    <div>
      <ServiceHero
        title='DNS Issue'
        subtitle='Resolve Domain & DNS Problems'
        description='Resolve domain-related problems quickly with expert DNS issue diagnosis and configuration for seamless website connectivity and performance.'
        badge='DNS Experts'
        backgroundGradient='from-blue-600/20 via-yellow-600/10 to-emerald-600/20 dark:from-blue-900/30 dark:via-yellow-900/20 dark:to-emerald-900/30'
        primaryColor='from-blue-600 to-emerald-600'
        secondaryColor='from-yellow-500 to-blue-600'
        features={[
          {
            icon: 'Globe',
            text: 'Domain Diagnosis',
            description: 'Find & fix DNS issues',
            color: 'from-blue-500 to-emerald-600',
          },
          {
            icon: 'Server',
            text: 'Seamless Connectivity',
            description: 'No more downtime',
            color: 'from-yellow-500 to-blue-600',
          },
          {
            icon: 'CheckCircle',
            text: 'Performance',
            description: 'Fast, reliable access',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '500+', label: 'DNS Issues Fixed', icon: 'Globe' },
          { value: '100%', label: 'Connectivity', icon: 'Server' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Fix DNS Issue',
          href: '/contact?service=dns',
        }}
        ctaSecondary={{
          text: 'Learn About DNS',
          href: '/blog/dns-issues',
        }}
      />

      <DnsIssueStepper
        addOnServices={service.relatedTo}
        coreService={service}
      />
    </div>
  );
};

export default page;
