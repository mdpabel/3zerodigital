import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import WhyCHooseUs from '@/components/common/why-choose-us';
import EstimatePrice from '@/components/services/pricing-table';
import ContactForm from '@/components/forms/contact-form';
import FAQ from '@/components/common/faq';
import PortfolioServer from '@/components/portfolio/portfolio';
import ShopifyConversionOptimizer from './conversion-optimizer';

export const dynamic = 'force-static';

const slug = 'shopify-store-development';

const ShopifyWebsiteDevelopment = () => {
  return (
    <div>
      <ServiceHero
        title='Shopify Store Development'
        subtitle='High-Converting Shopify Stores'
        description='Develop high-converting, scalable e-commerce stores with Shopify, designed to grow your business.'
        badge='Shopify Partners'
        backgroundGradient='from-green-600/20 via-blue-600/10 to-indigo-600/20 dark:from-green-900/30 dark:via-blue-900/20 dark:to-indigo-900/30'
        primaryColor='from-green-600 to-blue-600'
        secondaryColor='from-green-500 to-green-600'
        features={[
          {
            icon: 'ShoppingCart',
            text: 'Ecommerce Ready',
            description: 'Full-featured online stores',
            color: 'from-green-500 to-green-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Conversion Optimized',
            description: 'Designed for sales growth',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'CreditCard',
            text: 'Secure Payments',
            description: 'Safe & easy checkout',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '100+', label: 'Shopify Stores', icon: 'ShoppingCart' },
          { value: '30%', label: 'Avg. Conversion Lift', icon: 'TrendingUp' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Launch Your Shopify Store',
          href: '/contact?service=shopify',
        }}
        ctaSecondary={{
          text: 'See Shopify Portfolio',
          href: '/portfolio?category=shopify',
        }}
      />

      <WhyCHooseUs category='development' />
      <EstimatePrice serviceId='shopify' />
      <ShopifyConversionOptimizer />
      <PortfolioServer limit={6} />
      <ContactForm />
      <FAQ />
    </div>
  );
};

export default ShopifyWebsiteDevelopment;
