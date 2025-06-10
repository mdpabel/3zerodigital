import ServiceHero from '@/components/common/Hero';
import UnderDevelopment from '@/components/common/under-development';
import React from 'react';
import TroubleshootingPricing from '../pricing-table';
import ErrorResolutionDashboard from '../error-dashboard';
import WordPressRescueService from './wordpress-rescue';

const page = () => {
  return (
    <div>
      <ServiceHero
        title='WordPress Rescue & Repair'
        subtitle='Restore Broken or Crashed Sites'
        description='Fix broken or crashed WordPress sites fast — whether it’s theme conflicts, plugin errors, white screen issues, or database problems, we’ll restore your site to perfect working condition with zero data loss.'
        badge='WordPress Rescue'
        backgroundGradient='from-red-600/20 via-blue-600/10 to-emerald-600/20 dark:from-red-900/30 dark:via-blue-900/20 dark:to-emerald-900/30'
        primaryColor='from-red-600 to-emerald-600'
        secondaryColor='from-blue-500 to-red-600'
        features={[
          {
            icon: 'RefreshCw',
            text: 'Full Recovery',
            description: 'Restore site functionality',
            color: 'from-red-500 to-emerald-600',
          },
          {
            icon: 'Database',
            text: 'Zero Data Loss',
            description: 'Safe, complete repair',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Future Protection',
            description: 'Prevent future crashes',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '300+', label: 'Sites Rescued', icon: 'RefreshCw' },
          { value: '0', label: 'Data Loss', icon: 'Database' },
          { value: '24/7', label: 'Emergency Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Rescue My Site',
          href: '/contact?service=rescue',
        }}
        ctaSecondary={{
          text: 'Learn About Rescue',
          href: '/blog/wordpress-repair',
        }}
      />

      <TroubleshootingPricing
        price='$55'
        name='wordpress-rescue-repair'
        productId=''
      />

      <ErrorResolutionDashboard />
      <WordPressRescueService />
    </div>
  );
};

export default page;
