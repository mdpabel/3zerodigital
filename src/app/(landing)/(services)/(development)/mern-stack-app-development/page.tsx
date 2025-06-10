import ServiceHero from '@/components/common/Hero';
import EstimatePrice from '@/components/services/pricing-table';
import ContactForm from '@/components/services/contact-form';
import FAQ from '@/components/common/faq';
import PortfolioServer from '@/components/portfolio/portfolio';
import MERNTechIntegration from './tech-integration';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';

export const dynamic = 'force-static';

const slug = 'mern-stack-app-development';

const MernStack = () => {
  return (
    <div>
      <ServiceHero
        title='MERN Stack App Development'
        subtitle='Fullstack JavaScript Solutions'
        description='Develop full-stack applications using MongoDB, Express, React, and Node.js for fast and scalable solutions.'
        badge='MERN Stack Pros'
        backgroundGradient='from-green-600/20 via-blue-600/10 to-gray-600/20 dark:from-green-900/30 dark:via-blue-900/20 dark:to-gray-900/30'
        primaryColor='from-green-600 to-blue-600'
        secondaryColor='from-gray-500 to-green-600'
        features={[
          {
            icon: 'Server',
            text: 'API Driven',
            description: 'Robust backend APIs',
            color: 'from-green-500 to-blue-600',
          },
          {
            icon: 'React',
            text: 'Modern UI',
            description: 'React-based interfaces',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: 'Database',
            text: 'NoSQL Power',
            description: 'MongoDB integration',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '40+', label: 'MERN Projects', icon: 'Server' },
          { value: '100%', label: 'JS Stack', icon: 'React' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Start MERN Project',
          href: '/contact?service=mern',
        }}
        ctaSecondary={{
          text: 'See MERN Portfolio',
          href: '/portfolio?category=mern',
        }}
      />

      <CategoryWhyChooseUs category='development' />
      <EstimatePrice serviceId='mern' />
      <MERNTechIntegration />
      <PortfolioServer limit={6} />
      <ContactForm />
      <FAQ />
    </div>
  );
};

export default MernStack;
