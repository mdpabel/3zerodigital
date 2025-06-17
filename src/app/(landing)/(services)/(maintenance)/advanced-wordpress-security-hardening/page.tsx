import React from 'react';
import ServiceHero from '@/components/common/Hero';
import WordPressSecurityStepper from './wordpress-security-stapper';

export const dynamic = 'force-static';

const slug = 'wordpress-security';

const WordPressSecurity = async () => {
  return (
    <div>
      <ServiceHero
        title='WordPress Security'
        subtitle='Protect Your WordPress Site'
        description='Implement strong security measures to protect your WordPress site from hackers and vulnerabilities.'
        badge='Security Experts'
        backgroundGradient='from-emerald-600/20 via-blue-600/10 to-red-600/20 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-red-900/30'
        primaryColor='from-emerald-600 to-red-600'
        secondaryColor='from-blue-500 to-emerald-600'
        features={[
          {
            icon: 'Shield',
            text: 'Hardened Security',
            description: 'Block hackers & threats',
            color: 'from-emerald-500 to-red-600',
          },
          {
            icon: 'Lock',
            text: 'Vulnerability Fixes',
            description: 'Patch & secure your site',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'AlertTriangle',
            text: '24/7 Monitoring',
            description: 'Instant alerts & response',
            color: 'from-red-500 to-orange-600',
          },
        ]}
        stats={[
          { value: '500+', label: 'Sites Secured', icon: 'Shield' },
          { value: '24/7', label: 'Monitoring', icon: 'AlertTriangle' },
          { value: '100%', label: 'Peace of Mind', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Secure My Site',
          href: '/contact?service=security',
        }}
        ctaSecondary={{
          text: 'Learn About Security',
          href: '/blog/wordpress-security',
        }}
      />

      <WordPressSecurityStepper />
    </div>
  );
};

export default WordPressSecurity;
