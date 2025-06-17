import { AiOutlineCheck } from 'react-icons/ai';
import PricingTable from '../pricing-table';
import Hero from '@/components/common/Hero';

import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import TroubleshootingPricing from '../pricing-table';
import ErrorResolutionDashboard from '../error-dashboard';
import Http403ErrorStepper from './http-403-stapper';

export const dynamic = 'force-static';

const slug = 'http-403-forbidden-error';

export default async function Fix403ErrorService() {
  return (
    <div>
      <ServiceHero
        title='HTTP 403 Forbidden Error'
        subtitle='Restore Proper Access'
        description='Fix 403 Forbidden errors to allow proper access to your website’s resources.'
        badge='403 Error Fix'
        backgroundGradient='from-indigo-600/20 via-blue-600/10 to-red-600/20 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-red-900/30'
        primaryColor='from-indigo-600 to-red-600'
        secondaryColor='from-blue-500 to-indigo-600'
        features={[
          {
            icon: 'Lock',
            text: 'Access Control',
            description: 'Correct permissions & rules',
            color: 'from-indigo-500 to-red-600',
          },
          {
            icon: 'UserCheck',
            text: 'User Access',
            description: 'Restore legitimate access',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Security Review',
            description: 'Prevent unauthorized access',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '200+', label: '403s Fixed', icon: 'Lock' },
          { value: '100%', label: 'Access Restored', icon: 'UserCheck' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Fix 403 Error',
          href: '/contact?service=403',
        }}
        ctaSecondary={{
          text: 'Learn About 403s',
          href: '/blog/403-errors',
        }}
      />

      <Http403ErrorStepper />

      <ErrorResolutionDashboard />
    </div>
  );
}
