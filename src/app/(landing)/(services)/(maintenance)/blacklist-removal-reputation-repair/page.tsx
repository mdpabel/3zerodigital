import ServiceHero from '@/components/common/Hero';
import BlacklistRemovalPricing from './blacklist-removal-pricing-table';
import BlacklistRemovalStepper from './pricing-stepper';

export const dynamic = 'force-static';

const slug = 'blacklist-removal';

const page = async () => {
  return (
    <div>
      <ServiceHero
        title='Blacklist Removal'
        subtitle='Restore Your Website Reputation'
        description='Remove your website from blacklists and fix any reputation issues to ensure it remains trusted by search engines.'
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

      <BlacklistRemovalStepper />
    </div>
  );
};

export default page;
