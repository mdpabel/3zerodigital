import ServiceHero from '@/components/common/Hero';

export const dynamic = 'force-static';

const slug = 'ongoing-wordpress-maintenance';

const WordPressMaintenance = async () => {
  return (
    <div>
      <ServiceHero
        title='Ongoing WordPress Maintenance'
        subtitle='Worry-Free WordPress Care'
        description='Ensure your WordPress site is always secure and up-to-date with continuous monitoring and maintenance.'
        badge='Maintenance Plans'
        backgroundGradient='from-blue-600/20 via-emerald-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-emerald-600'
        secondaryColor='from-blue-500 to-indigo-600'
        features={[
          {
            icon: 'RefreshCw',
            text: 'Automatic Updates',
            description: 'Core, theme & plugin updates',
            color: 'from-blue-500 to-emerald-600',
          },
          {
            icon: 'Shield',
            text: 'Security Monitoring',
            description: '24/7 protection & alerts',
            color: 'from-emerald-500 to-green-600',
          },
          {
            icon: 'Database',
            text: 'Regular Backups',
            description: 'Daily & weekly backups',
            color: 'from-indigo-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '300+', label: 'Sites Maintained', icon: 'RefreshCw' },
          { value: '24/7', label: 'Monitoring', icon: 'Shield' },
          { value: '100%', label: 'Peace of Mind', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Get Maintenance',
          href: '/contact?service=maintenance',
        }}
        ctaSecondary={{
          text: 'See Plans',
          href: '/pricing#maintenance',
        }}
      />
    </div>
  );
};

export default WordPressMaintenance;
