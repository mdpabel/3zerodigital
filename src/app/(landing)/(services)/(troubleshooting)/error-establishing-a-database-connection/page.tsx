import { AiOutlineCheck } from 'react-icons/ai';
import PricingTable from '../pricing-table';
import Hero from '@/components/common/Hero';

import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import TroubleshootingPricing from '../pricing-table';
import ErrorResolutionDashboard from '../error-dashboard';
import DatabaseConnectionErrorStepper from './db-connection-error-stapper';

export const dynamic = 'force-static';

const slug = 'error-establishing-a-database-connection';

export default async function DatabaseConnectionError() {
  return (
    <div>
      <ServiceHero
        title='Error Establishing a Database Connection'
        subtitle='Restore Database Connectivity'
        description='Fix “Error Establishing a Database Connection” fast with 3 Zero Digital – expert diagnosis and recovery to get your WordPress site back online with 0 Downtime.'
        badge='Database Fix'
        backgroundGradient='from-blue-600/20 via-emerald-600/10 to-red-600/20 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-red-900/30'
        primaryColor='from-blue-600 to-red-600'
        secondaryColor='from-emerald-500 to-blue-600'
        features={[
          {
            icon: 'Database',
            text: 'Database Repair',
            description: 'Fix connection issues',
            color: 'from-blue-500 to-red-600',
          },
          {
            icon: 'Zap',
            text: 'Fast Recovery',
            description: 'Restore your site quickly',
            color: 'from-emerald-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Data Protection',
            description: 'No data loss guaranteed',
            color: 'from-red-500 to-emerald-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'DB Errors Fixed', icon: 'Database' },
          { value: '0', label: 'Downtime', icon: 'Zap' },
          { value: '100%', label: 'Data Safe', icon: 'Shield' },
        ]}
        ctaPrimary={{
          text: 'Fix Database Error',
          href: '/contact?service=db-error',
        }}
        ctaSecondary={{
          text: 'Learn About DB Errors',
          href: '/blog/database-connection-error',
        }}
      />

      <DatabaseConnectionErrorStepper />

      <ErrorResolutionDashboard />
    </div>
  );
}
