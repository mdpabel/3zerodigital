import ServiceHero from '@/components/common/Hero';
import EcommerceTechStack from './ecommerce-tech-stack';
import EcommerceFeatures from './ecommerce-features';
import EcommerceProcess from './ecommerce-process';
import EcommerceFAQ from './ecommerce-faq';
import PortfolioServer from '@/components/portfolio/portfolio';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';

const CompleteEcommerceLaunchPackage = () => {
  return (
    <div className='min-h-screen'>
      <ServiceHero
        title='Complete Ecommerce Launch Package'
        subtitle='From Concept to Sales in 14 Days'
        description='Full-service ecommerce development with WordPress, Next.js, MERN Stack, or Shopify. Everything you need to start selling online with zero vulnerabilities, zero downtime, and zero errors.'
        badge='Ecommerce Specialists'
        backgroundGradient='from-emerald-600/20 via-blue-600/10 to-purple-600/20 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-purple-900/30'
        primaryColor='from-emerald-600 to-blue-600'
        secondaryColor='from-blue-500 to-purple-600'
        features={[
          {
            icon: 'ShoppingCart',
            text: 'Full Store Setup',
            description: 'Complete online store ready to sell',
            color: 'from-emerald-500 to-green-600',
          },
          {
            icon: 'CreditCard',
            text: 'Payment Integration',
            description: 'Secure payment processing',
            color: 'from-blue-500 to-indigo-600',
          },
          {
            icon: 'Truck',
            text: 'Shipping & Tax',
            description: 'Automated calculations',
            color: 'from-orange-500 to-red-600',
          },
          {
            icon: 'BarChart3',
            text: 'Analytics & SEO',
            description: 'Built-in tracking & optimization',
            color: 'from-purple-500 to-pink-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'Stores Launched', icon: 'Store' },
          { value: '14 Days', label: 'Average Launch', icon: 'Clock' },
          { value: '99.9%', label: 'Uptime Rate', icon: 'Shield' },
          { value: '24/7', label: 'Support', icon: 'HeartHandshake' },
        ]}
        ctaPrimary={{
          text: 'Launch My Store',
          href: '/contact?service=ecommerce-launch',
        }}
        ctaSecondary={{
          text: 'View Store Examples',
          href: '/portfolio?category=ecommerce',
        }}
      />

      <CategoryWhyChooseUs category='development' />
      <EcommerceFeatures />
      <EcommerceTechStack />
      <EcommerceProcess />
      <PortfolioServer limit={6} />
      <EcommerceFAQ />
    </div>
  );
};

export default CompleteEcommerceLaunchPackage;
