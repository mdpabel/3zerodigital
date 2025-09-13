import ServiceHero from '@/components/common/Hero';
import { getServiceWithRelated } from '@/actions/service-actions';
import BlacklistRemovalStepper from './pricing-stepper';
import { allSupportedProviders } from '../data';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

const serviceSlug = 'blacklist-removal';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const vendor = allSupportedProviders.find((v) => v.slug === slug);

  if (!vendor) {
    redirect('/blacklist-removal');
  }

  const service = await getServiceWithRelated(serviceSlug);

  return (
    <div>
      <ServiceHero
        title={`${vendor.name} Blacklist Removal`}
        subtitle={`Restore Your Website Reputation From ${vendor.name} Blacklist`}
        description={`Remove your website from ${vendor.name} blacklists and fix any reputation issues to ensure it remains trusted by search engines.`}
        badge='Reputation Recovery'
        backgroundGradient='from-yellow-600/20 via-blue-600/10 to-red-600/20 dark:from-yellow-900/30 dark:via-blue-900/20 dark:to-red-900/30'
        primaryColor='from-yellow-600 to-red-600'
        secondaryColor='from-blue-500 to-yellow-600'
        features={[
          {
            icon: 'CheckCircle',
            text: 'Blacklist Removal',
            description: 'Get delisted from blacklists',
            color: 'from-yellow-500 to-red-600',
          },
          {
            icon: 'Search',
            text: 'SEO Recovery',
            description: 'Restore search engine trust',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Prevent Recurrence',
            description: 'Ongoing monitoring & fixes',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '100+', label: 'Sites Recovered', icon: 'CheckCircle' },
          { value: '100%', label: 'SEO Restored', icon: 'Search' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Remove Blacklist',
          href: '/contact?service=blacklist-removal',
        }}
        ctaSecondary={{
          text: 'Learn More',
          href: '/blog/blacklist-removal',
        }}
      />

      <BlacklistRemovalStepper
        addOnServices={service.relatedTo}
        coreService={service}
      />
    </div>
  );
};

export default page;
