import React from 'react';

import ServiceHero from '@/components/common/Hero';
import SSLPricingSection from './ssl-pricing-section';
import SSLBenefitsSection from './ssl-benefits-section';
import ComponentWrapper from '@/components/common/component-wrapper';
import SSLProcessSection from './ssl-process';
import SSLFAQSection from './ssl-faq-section';
import SSLSecurityVerification from './security-verification';
import SslInstallationStepper from './ssl-installation-stapper';
import { getServiceWithRelated } from '@/actions/service-actions';

export const dynamic = 'force-static';

const slug = 'ssl-certificate-installation';

const SSLInstallation = async () => {
  const service = await getServiceWithRelated(slug);

  return (
    <div>
      <ServiceHero
        title='SSL Installation'
        subtitle='Secure Your Website with SSL'
        description='Protect your website and customer data by installing SSL certificates to enable secure connections.'
        badge='SSL Experts'
        backgroundGradient='from-emerald-600/20 via-blue-600/10 to-indigo-600/20 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-indigo-900/30'
        primaryColor='from-emerald-600 to-blue-600'
        secondaryColor='from-blue-500 to-indigo-600'
        features={[
          {
            icon: 'Lock',
            text: 'SSL Installation',
            description: 'HTTPS for your site',
            color: 'from-emerald-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Data Protection',
            description: 'Secure customer data',
            color: 'from-blue-500 to-emerald-600',
          },
          {
            icon: 'CheckCircle',
            text: 'SEO Boost',
            description: 'Improve search rankings',
            color: 'from-indigo-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '1000+', label: 'SSLs Installed', icon: 'Lock' },
          { value: '100%', label: 'Secure Sites', icon: 'Shield' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Get SSL Now',
          href: '/contact?service=ssl',
        }}
        ctaSecondary={{
          text: 'Learn About SSL',
          href: '/blog/ssl-installation',
        }}
      />

      <SslInstallationStepper
        addOnServices={service.relatedTo}
        coreService={service}
      />
      <ComponentWrapper>
        <SSLSecurityVerification />
        <SSLBenefitsSection />
        <SSLProcessSection />
        <SSLFAQSection />
      </ComponentWrapper>
    </div>
  );
};

export default SSLInstallation;
