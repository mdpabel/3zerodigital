import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import TroubleshootingPricing from '../pricing-table';
import ErrorResolutionDashboard from '../error-dashboard';
import SslMixedContentErrorStepper from './ssl-stapper';

export const dynamic = 'force-static';

const slug = 'ssl-mixed-content-error';

export default async function FixMixedContentErrorService() {
  return (
    <div>
      <ServiceHero
        title='SSL Mixed Content Fix'
        subtitle='Restore Your Secure Padlock & Visitor Trust'
        description='Swiftly identify and resolve all SSL mixed content errors (HTTP resources on your HTTPS site) to ensure full site security, eliminate browser warnings, and maintain SEO rankings.'
        badge='SSL Security Experts'
        backgroundGradient='from-teal-600/20 via-cyan-600/10 to-sky-600/20 dark:from-teal-900/30 dark:via-cyan-900/20 dark:to-sky-900/30' // Secure and modern gradient
        primaryColor='from-teal-600 to-sky-600' // Matching primary color
        secondaryColor='from-cyan-500 to-teal-600' // Matching secondary color
        features={[
          {
            icon: 'Search', // Icon for discovery/audit
            text: 'Mixed Content Audit',
            description: 'Pinpoint all insecure elements',
            color: 'from-sky-500 to-cyan-600',
          },
          {
            icon: 'WrenchScrewdriver', // Icon for fixing/tools, or 'SettingsAdjust'
            text: 'Content Remediation',
            description: 'Update HTTP to HTTPS resources',
            color: 'from-cyan-500 to-teal-600',
          },
          {
            icon: 'ShieldCheck', // Icon for verified security
            text: 'Full HTTPS Security',
            description: 'Ensure a secure connection',
            color: 'from-teal-500 to-emerald-600',
          },
        ]}
        stats={[
          {
            value: '1200+',
            label: 'Mixed Content Errors Fixed',
            icon: 'BugAnt',
          }, // Icon for errors/bugs or 'ExclamationTriangle'
          {
            value: '100%',
            label: 'Site Security Restored',
            icon: 'LockClosed',
          }, // Icon for security
          { value: 'Fast Turnaround', label: 'Service Speed', icon: 'Clock' }, // Highlighting speed of service
        ]}
        ctaPrimary={{
          text: 'Fix My Mixed Content',
          href: '/contact?service=ssl-mixed-content',
        }}
        ctaSecondary={{
          text: 'Learn About Mixed Content',
          href: '/blog/what-is-ssl-mixed-content',
        }}
      />

      <SslMixedContentErrorStepper />

      <ErrorResolutionDashboard />
    </div>
  );
}
