import ServiceHero from '@/components/common/Hero';
import ErrorResolutionDashboard from '../error-dashboard';
import Http404ErrorStepper from './http-404-stapper';

export const dynamic = 'force-static';

const slug = 'http-404-not-found-error';

export default async function Fix404ErrorService() {
  return (
    <div>
      <ServiceHero
        title='HTTP 404 Not Found Error'
        subtitle='Fix Broken Links & Missing Pages'
        description='Fix 404 errors, redirect broken links, and restore missing pages for a seamless user experience.'
        badge='404 Error Fix'
        backgroundGradient='from-orange-600/20 via-blue-600/10 to-red-600/20 dark:from-orange-900/30 dark:via-blue-900/20 dark:to-red-900/30'
        primaryColor='from-orange-600 to-red-600'
        secondaryColor='from-blue-500 to-orange-600'
        features={[
          {
            icon: 'Link2Off',
            text: 'Redirect Broken Links',
            description: 'Automatic 301/302 redirects',
            color: 'from-orange-500 to-red-600',
          },
          {
            icon: 'FileSearch',
            text: 'Restore Pages',
            description: 'Recover or rebuild missing content',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Smile',
            text: 'Improve UX',
            description: 'No more dead ends for users',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '1000+', label: '404s Fixed', icon: 'Link2Off' },
          { value: '100%', label: 'User Satisfaction', icon: 'Smile' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Fix 404 Errors',
          href: '/contact?service=404',
        }}
        ctaSecondary={{
          text: 'Learn About 404s',
          href: '/blog/404-errors',
        }}
      />

      <Http404ErrorStepper />

      <ErrorResolutionDashboard />
    </div>
  );
}
