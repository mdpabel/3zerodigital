import React from 'react';
import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import WebsiteMigrationPricing from './pricing-table';
import WebsiteMigrationStepper from './wordpress-migration-stapper';

export const dynamic = 'force-static';

const slug = 'website-migration';

const WebsiteMigration = async () => {
  return (
    <div>
      <ServiceHero
        title='Website Migration'
        subtitle='Zero-Downtime Website Moves'
        description='Move your website to a new host or domain with zero downtime and secure data migration.'
        badge='Migration Experts'
        backgroundGradient='from-blue-600/20 via-emerald-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-emerald-600'
        secondaryColor='from-blue-500 to-indigo-600'
        features={[
          {
            icon: 'Move',
            text: 'Zero Downtime',
            description: 'Seamless migration process',
            color: 'from-blue-500 to-emerald-600',
          },
          {
            icon: 'Database',
            text: 'Data Integrity',
            description: 'No data loss guaranteed',
            color: 'from-emerald-500 to-blue-600',
          },
          {
            icon: 'Globe',
            text: 'Any Host',
            description: 'Migrate to any provider',
            color: 'from-indigo-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'Sites Migrated', icon: 'Move' },
          { value: '0', label: 'Downtime', icon: 'Zap' },
          { value: '100%', label: 'Data Safe', icon: 'Database' },
        ]}
        ctaPrimary={{
          text: 'Migrate My Site',
          href: '/contact?service=migration',
        }}
        ctaSecondary={{
          text: 'Learn About Migration',
          href: '/blog/website-migration',
        }}
      />

      <WebsiteMigrationStepper />
    </div>
  );
};

export default WebsiteMigration;
