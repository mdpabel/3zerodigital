import ComponentWrapper from '@/components/common/component-wrapper';
import Hero from '@/components/common/Hero';
import SEOServiceForm from '../seo-form';
import {
  FaMapMarkerAlt,
  FaSearchLocation,
  FaBuilding,
  FaClipboardList,
  FaLink,
  FaStar,
  FaChartPie,
  FaUsers,
  FaHandshake,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SEOComparison from '../seo-comparison';
import ServiceHero from '@/components/common/Hero';
import LocalSEOOptimization from './local-seo-optimization';

const features = [
  {
    title: 'Local Signals',
    description:
      'Strengthen your local presence with targeted content, quality backlinks, and active social profiles to improve search relevance.',
    icon: <FaSearchLocation className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Google Business Profile',
    description:
      'Optimize and maintain your Google Business Profile to increase visibility and attract more local customers effectively.',
    icon: <FaBuilding className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Local Citations',
    description:
      'Ensure your business details are accurate and consistent across all major online directories to boost rankings and trust.',
    icon: <FaClipboardList className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Reputation Management',
    description:
      'Build and manage positive reviews to enhance your credibility and influence potential customers locally.',
    icon: <FaStar className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Quality Link Building',
    description:
      'Acquire authoritative backlinks to increase your domain authority and drive relevant local traffic to your site.',
    icon: <FaLink className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Keyword Research',
    description:
      'Discover and target high-value local keywords that bring qualified visitors and improve your search rankings.',
    icon: <FaClipboardList className='w-12 h-12 text-gradient' />,
  },
];

const whyChooseStats = [
  {
    number: '0',
    label: 'Vulnerability',
    icon: <FaUsers className='mx-auto mb-2 w-10 h-10 text-gradient' />,
  },
  {
    number: '0',
    label: 'Downtime',
    icon: <FaHandshake className='mx-auto mb-2 w-10 h-10 text-gradient' />,
  },
  {
    number: '0',
    label: 'Error',
    icon: <FaChartPie className='mx-auto mb-2 w-10 h-10 text-gradient' />,
  },
];

const coreValuesTabs = [
  {
    label: 'SEO Pricing',
    content: `Our packages are customized for your unique business goals. Pricing depends on your location, keyword targets, and scope, starting at BDT 20,000/month in Bangladesh and $400/month globally.`,
  },
  {
    label: 'Reporting',
    content: `You’ll receive clear, detailed monthly reports that track rankings, traffic, and ROI so you always know how your campaign is performing.`,
  },
  {
    label: 'Accountability',
    content: `Our dedicated team works hand-in-hand with you, ensuring prompt communication and precise delivery to meet your SEO objectives.`,
  },
];

const LocalSEOPage = () => {
  return (
    <div>
      <ServiceHero
        title='Local SEO'
        subtitle='Dominate Local Search'
        description='Optimize your business for local searches to increase visibility, attract nearby customers, and drive in-store or regional traffic.'
        badge='Local SEO'
        backgroundGradient='from-green-600/20 via-blue-600/10 to-yellow-600/20 dark:from-green-900/30 dark:via-blue-900/20 dark:to-yellow-900/30'
        primaryColor='from-green-600 to-yellow-600'
        secondaryColor='from-blue-500 to-green-600'
        features={[
          {
            icon: 'MapPin',
            text: 'Google Maps',
            description: 'Get found in local searches',
            color: 'from-green-500 to-yellow-600',
          },
          {
            icon: 'Search',
            text: 'Local Optimization',
            description: 'On-page & off-page SEO',
            color: 'from-blue-500 to-green-600',
          },
          {
            icon: 'Users',
            text: 'Attract Customers',
            description: 'Drive foot traffic & calls',
            color: 'from-yellow-500 to-green-600',
          },
        ]}
        stats={[
          { value: '500+', label: 'Local Businesses', icon: 'MapPin' },
          { value: '100%', label: 'Google My Business', icon: 'Search' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Get Local SEO',
          href: '/contact?service=local-seo',
        }}
        ctaSecondary={{
          text: 'See Local Results',
          href: '/portfolio?category=local-seo',
        }}
      />

      <LocalSEOOptimization />
    </div>
  );
};

export default LocalSEOPage;
