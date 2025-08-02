import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import EstimatePrice from '@/components/services/pricing-table';
import ContactForm from '@/components/forms/contact-form';
import FAQ from '@/components/common/faq';
import PortfolioServer from '@/components/portfolio/portfolio';
import NextJSPerformanceMetrics from './performance-metrics';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';

const slug = 'fullstack-next-js-applications-development';

const NextJsFullStack = () => {
  return (
    <div className='w-full'>
      <ServiceHero
        title='Fullstack Next.js Applications'
        subtitle='Dynamic Web App Development'
        description='End-to-end web application development using Next.js for dynamic, fast, and scalable applications.'
        badge='Next.js Experts'
        backgroundGradient='from-blue-600/20 via-gray-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-gray-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-indigo-600'
        secondaryColor='from-gray-500 to-blue-600'
        features={[
          {
            icon: 'LayoutDashboard',
            text: 'Fullstack Apps',
            description: 'Frontend & backend in one',
            color: 'from-blue-500 to-indigo-600',
          },
          {
            icon: 'Zap',
            text: 'Blazing Fast',
            description: 'Optimized for speed',
            color: 'from-orange-500 to-yellow-600',
          },
          {
            icon: 'Database',
            text: 'Data Driven',
            description: 'Robust database integration',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '50+', label: 'Next.js Apps', icon: 'LayoutDashboard' },
          { value: '99.9%', label: 'Uptime', icon: 'Shield' },
          { value: '100%', label: 'Customizable', icon: 'Settings' },
        ]}
        ctaPrimary={{
          text: 'Start Next.js Project',
          href: '/contact?service=nextjs',
        }}
        ctaSecondary={{
          text: 'See Next.js Work',
          href: '/portfolio?category=nextjs',
        }}
      />

      <CategoryWhyChooseUs category='development' />
      <EstimatePrice serviceId='next' />
      <NextJSPerformanceMetrics />
      <PortfolioServer limit={6} />
      <ContactForm />
      <FAQ />
    </div>
  );
};

export default NextJsFullStack;
