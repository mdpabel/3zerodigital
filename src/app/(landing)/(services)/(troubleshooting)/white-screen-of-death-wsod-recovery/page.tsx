import ServiceHero from '@/components/common/Hero';
import ErrorResolutionDashboard from '../error-dashboard';
import WhiteScreenOfDeathStepper from './wsod-stapper';
import { getServiceWithRelated } from '@/actions/service-actions';

export const dynamic = 'force-static';

const slug = 'white-screen-of-death-wsod-recovery';

export default async function FixWSODService() {
  const service = await getServiceWithRelated(slug);

  return (
    <div>
      <ServiceHero
        title='White Screen Of Death'
        subtitle='Restore Your Website Instantly'
        description='Fix the White Screen of Death (WSOD) error and restore access to your website.'
        badge='WSOD Fix'
        backgroundGradient='from-gray-600/20 via-blue-600/10 to-red-600/20 dark:from-gray-900/30 dark:via-blue-900/20 dark:to-red-900/30'
        primaryColor='from-gray-600 to-red-600'
        secondaryColor='from-blue-500 to-gray-600'
        features={[
          {
            icon: 'AlertTriangle',
            text: 'Error Diagnosis',
            description: 'Find the cause of WSOD',
            color: 'from-red-500 to-gray-600',
          },
          {
            icon: 'RefreshCw',
            text: 'Restore Access',
            description: 'Get your site back online',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Database',
            text: 'Data Integrity',
            description: 'No data loss',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '300+', label: 'WSOD Fixed', icon: 'AlertTriangle' },
          { value: '0', label: 'Data Loss', icon: 'Database' },
          { value: '24/7', label: 'Emergency Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Fix WSOD',
          href: '/contact?service=wsod',
        }}
        ctaSecondary={{
          text: 'Learn About WSOD',
          href: '/blog/white-screen-of-death',
        }}
      />

      <WhiteScreenOfDeathStepper
        addOnServices={service.relatedTo}
        coreService={service}
      />

      <ErrorResolutionDashboard />
    </div>
  );
}
