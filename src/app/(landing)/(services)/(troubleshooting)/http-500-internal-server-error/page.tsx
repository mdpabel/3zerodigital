import Hero from '@/components/common/Hero';
import PricingTable from '../pricing-table';

import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import TroubleshootingPricing from '../pricing-table';
import ErrorResolutionDashboard from '../error-dashboard';

export const dynamic = 'force-static';

const slug = 'http-500-internal-server-error';

export default async function Fix500ErrorService() {
  return (
    <div>
      <ServiceHero
        title='HTTP 500 Internal Server Error'
        subtitle='Restore Website Access'
        description='Diagnose and resolve 500 Internal Server Errors to ensure your website remains accessible.'
        badge='500 Error Fix'
        backgroundGradient='from-red-600/20 via-blue-600/10 to-orange-600/20 dark:from-red-900/30 dark:via-blue-900/20 dark:to-orange-900/30'
        primaryColor='from-red-600 to-orange-600'
        secondaryColor='from-blue-500 to-red-600'
        features={[
          {
            icon: 'AlertTriangle',
            text: 'Error Diagnosis',
            description: 'Find the root cause fast',
            color: 'from-red-500 to-orange-600',
          },
          {
            icon: 'ServerCrash',
            text: 'Restore Access',
            description: 'Get your site back online',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Prevent Recurrence',
            description: 'Fix underlying issues',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '500+', label: '500 Errors Fixed', icon: 'ServerCrash' },
          { value: '0', label: 'Downtime', icon: 'Zap' },
          { value: '24/7', label: 'Emergency Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Fix 500 Error',
          href: '/contact?service=500',
        }}
        ctaSecondary={{
          text: 'Learn About 500s',
          href: '/blog/500-errors',
        }}
      />

      <TroubleshootingPricing price='$55' name='http-500-error' productId='' />

      <ErrorResolutionDashboard />
    </div>
  );
}
