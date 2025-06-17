import React from 'react';
import ServiceHero from '@/components/common/Hero';
import PortfolioServer from '@/components/portfolio/portfolio';
import ContactForm from '@/components/forms/contact-form';
import AffordableWebsitePricing from './affordable-web-development-pricing-table';
import IncludedFeatures from './included-features';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';
import FAQ from '@/components/common/faq';

export const dynamic = 'force-static';

const slug = 'affordable-web-development';

//

const page = () => {
  return (
    <div>
      <ServiceHero
        title='Affordable Web Development'
        subtitle='All-in-One Web Solutions'
        description='Get design, security, performance, hosting, domain, SSL, email, and more—everything you need to launch, at an unbeatable price!'
        badge='Best Value'
        backgroundGradient='from-yellow-600/20 via-blue-600/10 to-green-600/20 dark:from-yellow-900/30 dark:via-blue-900/20 dark:to-green-900/30'
        primaryColor='from-yellow-600 to-green-600'
        secondaryColor='from-blue-500 to-green-600'
        features={[
          {
            icon: 'DollarSign',
            text: 'Affordable',
            description: 'Unbeatable pricing',
            color: 'from-yellow-500 to-green-600',
          },
          {
            icon: 'Shield',
            text: 'Secure',
            description: 'SSL & security included',
            color: 'from-emerald-500 to-green-600',
          },
          {
            icon: 'Globe',
            text: 'All-in-One',
            description: 'Hosting, domain, email',
            color: 'from-blue-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '500+', label: 'Websites Launched', icon: 'Globe' },
          { value: '99.9%', label: 'Uptime', icon: 'Shield' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Get Started',
          href: '/contact?service=affordable',
        }}
        ctaSecondary={{
          text: 'See Packages',
          href: '/pricing',
        }}
      />

      <AffordableWebsitePricing />
      <IncludedFeatures />

      <CategoryWhyChooseUs category='development' />
      <PortfolioServer limit={6} />
      <div id='contact-us'>
        <ContactForm />
      </div>
      <FAQ />
    </div>
  );
};

export default page;
