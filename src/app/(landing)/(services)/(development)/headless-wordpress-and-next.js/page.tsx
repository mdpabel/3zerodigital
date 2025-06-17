import ServiceHero from '@/components/common/Hero';
import ContactForm from '@/components/forms/contact-form';
import FAQ from '@/components/common/faq';
import PortfolioServer from '@/components/portfolio/portfolio';
import HeadlessArchitecture from './architecture-diagram';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';

export const dynamic = 'force-static';

const slug = 'headless-wordpress-and-next.js';

const HeadlessWordPressAndNextJs = () => {
  return (
    <div className='w-full'>
      <ServiceHero
        title='Headless WordPress & Next.js'
        subtitle='Next-Gen Headless Websites'
        description='Expert Headless WordPress website design agency specializing in Next.js. Create a fast, scalable, and secure website for unparalleled speed and versatility.'
        badge='Headless Experts'
        backgroundGradient='from-indigo-600/20 via-blue-600/10 to-purple-600/20 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-purple-900/30'
        primaryColor='from-indigo-600 to-blue-600'
        secondaryColor='from-purple-500 to-indigo-600'
        features={[
          {
            icon: 'Layers',
            text: 'Headless Architecture',
            description: 'Separation of frontend & backend',
            color: 'from-indigo-500 to-blue-600',
          },
          {
            icon: 'Zap',
            text: 'Ultra Fast',
            description: 'Lightning-fast performance',
            color: 'from-orange-500 to-yellow-600',
          },
          {
            icon: 'Shield',
            text: 'Secure & Scalable',
            description: 'Enterprise-grade security',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '50+', label: 'Headless Sites', icon: 'Globe' },
          { value: '100%', label: 'API Driven', icon: 'Layers' },
          { value: '<1s', label: 'Load Time', icon: 'Zap' },
        ]}
        ctaPrimary={{
          text: 'Start Headless Project',
          href: '/contact?service=headless',
        }}
        ctaSecondary={{
          text: 'See Headless Work',
          href: '/portfolio?category=headless',
        }}
      />

      <CategoryWhyChooseUs category='development' />
      <HeadlessArchitecture />
      <PortfolioServer limit={6} />
      <ContactForm />
      <FAQ />
    </div>
  );
};

export default HeadlessWordPressAndNextJs;
