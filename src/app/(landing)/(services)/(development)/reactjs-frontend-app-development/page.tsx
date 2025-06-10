import ServiceHero from '@/components/common/Hero';
import WhyCHooseUs from '@/components/common/why-choose-us';
import EstimatePrice from '@/components/services/pricing-table';
import ContactForm from '@/components/services/contact-form';
import FAQ from '@/components/common/faq';
import PortfolioServer from '@/components/portfolio/portfolio';

export const dynamic = 'force-static';

const slug = 'reactjs-frontend-app-development';

const FrontendDevelopment = () => {
  return (
    <div>
      <ServiceHero
        title='ReactJs Frontend App Development'
        subtitle='Modern Frontend Solutions'
        description='Create modern, responsive user interfaces using the latest frontend technologies like HTML5, CSS3, JavaScript, and ReactJS.'
        badge='ReactJS Experts'
        backgroundGradient='from-blue-600/20 via-cyan-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-cyan-600'
        secondaryColor='from-blue-500 to-blue-600'
        features={[
          {
            icon: 'Monitor',
            text: 'Responsive UI',
            description: 'Mobile-first design',
            color: 'from-blue-500 to-cyan-600',
          },
          {
            icon: 'React',
            text: 'Component Driven',
            description: 'Reusable components',
            color: 'from-cyan-500 to-blue-600',
          },
          {
            icon: 'Zap',
            text: 'Fast & Interactive',
            description: 'Smooth user experience',
            color: 'from-orange-500 to-yellow-600',
          },
        ]}
        stats={[
          { value: '100+', label: 'React Projects', icon: 'React' },
          { value: '100%', label: 'Responsive', icon: 'Monitor' },
          { value: '99.9%', label: 'Uptime', icon: 'Shield' },
        ]}
        ctaPrimary={{
          text: 'Start React Project',
          href: '/contact?service=react',
        }}
        ctaSecondary={{
          text: 'See React Portfolio',
          href: '/portfolio?category=react',
        }}
      />

      <WhyCHooseUs category='development' />
      <EstimatePrice serviceId='react' />
      <PortfolioServer limit={6} />
      <ContactForm />
      <FAQ />
    </div>
  );
};

export default FrontendDevelopment;
