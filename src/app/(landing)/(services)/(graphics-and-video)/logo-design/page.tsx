import ServiceHero from '@/components/common/Hero';
import UnderDevelopment from '@/components/common/under-development';
import React from 'react';
import LogoDesignShowcase from './logo-showcase';

const page = () => {
  return (
    <div>
      <ServiceHero
        title='Logo Design'
        subtitle='Memorable Brand Identity'
        description='Custom, memorable logo designs that capture your brand identity and leave a lasting impression.'
        badge='Logo Design'
        backgroundGradient='from-yellow-600/20 via-blue-600/10 to-emerald-600/20 dark:from-yellow-900/30 dark:via-blue-900/20 dark:to-emerald-900/30'
        primaryColor='from-yellow-600 to-emerald-600'
        secondaryColor='from-blue-500 to-yellow-600'
        features={[
          {
            icon: 'PenTool',
            text: 'Custom Design',
            description: 'Unique to your brand',
            color: 'from-yellow-500 to-emerald-600',
          },
          {
            icon: 'Star',
            text: 'Memorable',
            description: 'Stand out from the crowd',
            color: 'from-blue-500 to-yellow-600',
          },
          {
            icon: 'Smile',
            text: 'Brand Impact',
            description: 'Leave a lasting impression',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '500+', label: 'Logos Designed', icon: 'PenTool' },
          { value: '100%', label: 'Custom', icon: 'Star' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Get a Logo',
          href: '/contact?service=logo',
        }}
        ctaSecondary={{
          text: 'See Logo Portfolio',
          href: '/portfolio?category=logo',
        }}
      />

      <LogoDesignShowcase />
    </div>
  );
};

export default page;
