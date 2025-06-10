import ServiceHero from '@/components/common/Hero';
import UnderDevelopment from '@/components/common/under-development';
import React from 'react';

const page = () => {
  return (
    <div>
      <ServiceHero
        title='Brochure Design'
        subtitle='Professional Print & Digital Brochures'
        description='Professionally crafted brochures that showcase your brand, products, or services with impactful design and clarity.'
        badge='Brochure Design'
        backgroundGradient='from-blue-600/20 via-yellow-600/10 to-emerald-600/20 dark:from-blue-900/30 dark:via-yellow-900/20 dark:to-emerald-900/30'
        primaryColor='from-blue-600 to-emerald-600'
        secondaryColor='from-yellow-500 to-blue-600'
        features={[
          {
            icon: 'FileText',
            text: 'Print & Digital',
            description: 'Versatile formats',
            color: 'from-blue-500 to-emerald-600',
          },
          {
            icon: 'Layout',
            text: 'Impactful Layouts',
            description: 'Designed for clarity',
            color: 'from-yellow-500 to-blue-600',
          },
          {
            icon: 'Star',
            text: 'Brand Consistency',
            description: 'On-brand visuals',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '300+', label: 'Brochures Designed', icon: 'FileText' },
          { value: '100%', label: 'On Brand', icon: 'Star' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Get a Brochure',
          href: '/contact?service=brochure',
        }}
        ctaSecondary={{
          text: 'See Brochure Portfolio',
          href: '/portfolio?category=brochure',
        }}
      />

      <UnderDevelopment />
    </div>
  );
};

export default page;
