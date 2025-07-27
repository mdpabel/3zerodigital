import ServiceHero from '@/components/common/Hero';
import SpeedOptimizationPricing from './pricing-table';
import SpeedOptimizationAudit from './speed-audit';
import SpeedOptimizationStepper from './speed-optimization-stapper';
import { getServiceWithRelated } from '@/actions/service-actions';

export const dynamic = 'force-static';

const slug = 'wordpress-speed-performance-optimization';

const WordPressSpeedOptimization = async () => {
  const service = await getServiceWithRelated(slug);

  return (
    <div>
      <ServiceHero
        title='WordPress Speed Optimization'
        subtitle='Lightning-Fast WordPress'
        description='Optimize your WordPress website for speed and performance to provide an excellent user experience and boost SEO.'
        badge='Speed Optimization'
        backgroundGradient='from-orange-600/20 via-blue-600/10 to-emerald-600/20 dark:from-orange-900/30 dark:via-blue-900/20 dark:to-emerald-900/30'
        primaryColor='from-orange-600 to-emerald-600'
        secondaryColor='from-blue-500 to-orange-600'
        features={[
          {
            icon: 'Zap',
            text: 'Performance Boost',
            description: 'Faster load times',
            color: 'from-orange-500 to-emerald-600',
          },
          {
            icon: 'BarChart2',
            text: 'SEO Friendly',
            description: 'Better rankings & UX',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Monitor',
            text: 'Mobile Optimized',
            description: 'Great on all devices',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '<2s', label: 'Avg. Load Time', icon: 'Zap' },
          { value: '100+', label: 'Sites Optimized', icon: 'BarChart2' },
          { value: '100%', label: 'Mobile Ready', icon: 'Monitor' },
        ]}
        ctaPrimary={{
          text: 'Boost My Speed',
          href: '/contact?service=speed-optimization',
        }}
        ctaSecondary={{
          text: 'See Results',
          href: '/portfolio?category=speed',
        }}
      />

      <SpeedOptimizationStepper
        addOnServices={service.relatedTo}
        coreService={service}
      />
      <SpeedOptimizationAudit />
    </div>
  );
};

export default WordPressSpeedOptimization;
