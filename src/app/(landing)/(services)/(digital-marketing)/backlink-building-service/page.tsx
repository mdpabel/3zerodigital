import ServiceHero from '@/components/common/Hero';
import BacklinkBuildingPricing from './backlink-building-pricing-table';
import BacklinkDashboard from './backlink-dashboard';

const BacklinkBuildingPage = () => {
  return (
    <div>
      <ServiceHero
        title='Backlink Building'
        subtitle='Boost Your SEO Authority'
        description='Increase your website’s SEO performance and domain authority with high-quality backlinks.'
        badge='SEO Link Building'
        backgroundGradient='from-blue-600/20 via-green-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-green-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-green-600'
        secondaryColor='from-green-500 to-blue-600'
        features={[
          {
            icon: 'FaLink',
            text: 'Quality Backlinks',
            description: 'Relevant, high-authority links',
            color: 'from-blue-500 to-green-600',
          },
          {
            icon: 'TrendingUp',
            text: 'SEO Growth',
            description: 'Boost rankings & traffic',
            color: 'from-green-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Safe Practices',
            description: 'White-hat link building',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '10K+', label: 'Links Built', icon: 'FaLink' },
          { value: '100%', label: 'White Hat', icon: 'Shield' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Start Link Building',
          href: '/contact?service=backlinks',
        }}
        ctaSecondary={{
          text: 'Learn About Backlinks',
          href: '/blog/backlink-building',
        }}
      />

      <BacklinkBuildingPricing />

      <BacklinkDashboard />
    </div>
  );
};

export default BacklinkBuildingPage;
