import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import WhyCHooseUs from '@/components/common/why-choose-us';
import EstimatePrice from '@/components/services/pricing-table';
import ContactForm from '@/components/forms/contact-form';
import FAQ from '@/components/common/faq';
import PortfolioServer from '@/components/portfolio/portfolio';

export const dynamic = 'force-static';

const slug = 'wordpress-development';

const Page = () => {
  return (
    <div>
      <ServiceHero
        title='WordPress Development'
        subtitle='Custom WordPress Solutions'
        description='Professional WordPress development services that deliver secure, scalable, and high-performing websites tailored to your business needs.'
        badge='WordPress Specialists'
        backgroundGradient='from-blue-600/20 via-purple-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-purple-600'
        secondaryColor='from-blue-500 to-blue-600'
        features={[
          {
            icon: 'Code',
            text: 'Custom Themes',
            description: 'Bespoke WordPress themes',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Shield',
            text: 'Secure Sites',
            description: 'Enterprise-level security',
            color: 'from-emerald-500 to-green-600',
          },
          {
            icon: 'Zap',
            text: 'Fast Loading',
            description: 'Optimized performance',
            color: 'from-orange-500 to-red-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'WordPress Sites', icon: 'Globe' },
          { value: '99.9%', label: 'Uptime Rate', icon: 'Shield' },
          { value: '<2s', label: 'Load Time', icon: 'Zap' },
        ]}
        ctaPrimary={{
          text: 'Start Your WordPress Project',
          href: '/contact?service=wordpress',
        }}
        ctaSecondary={{
          text: 'View WordPress Portfolio',
          href: '/portfolio?category=wordpress',
        }}
      />
      <WhyCHooseUs category='development' />
      <EstimatePrice serviceId='wordpress' />
      <PortfolioServer limit={6} />
      <ContactForm />
      <FAQ />
    </div>
  );
};

export default Page;
