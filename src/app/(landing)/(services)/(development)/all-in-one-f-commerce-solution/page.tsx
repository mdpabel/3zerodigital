import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Facebook,
  Gift,
  Globe,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
} from 'lucide-react';
import React from 'react';
import ServiceHero from '@/components/common/Hero';

export const dynamic = 'force-static';

const slug = 'all-in-one-f-commerce-solution';

const FCommerce = async () => {
  return (
    <div>
      <ServiceHero
        title='All-in-One F-Commerce Solution'
        subtitle='Complete Facebook Commerce'
        description='Launch your business online with a complete F-Commerce solution—domain, hosting, professional website, Facebook & Google setup, all in one package.'
        badge='F-Commerce Experts'
        backgroundGradient='from-blue-600/20 via-pink-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-pink-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-pink-600'
        secondaryColor='from-blue-500 to-indigo-600'
        features={[
          {
            icon: 'Facebook',
            text: 'FB Shop Ready',
            description: 'Facebook & Instagram setup',
            color: 'from-blue-500 to-pink-600',
          },
          {
            icon: 'Globe',
            text: 'Online Presence',
            description: 'Domain & hosting included',
            color: 'from-indigo-500 to-blue-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Growth Focused',
            description: 'Google & social integration',
            color: 'from-green-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'F-Commerce Sites', icon: 'Facebook' },
          { value: '100%', label: 'Setup Included', icon: 'Globe' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Launch F-Commerce',
          href: '/contact?service=fcommerce',
        }}
        ctaSecondary={{
          text: 'See F-Commerce Work',
          href: '/portfolio?category=fcommerce',
        }}
      />
    </div>
  );
};

export default FCommerce;
