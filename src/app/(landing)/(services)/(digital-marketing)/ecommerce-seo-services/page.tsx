import ComponentWrapper from '@/components/common/component-wrapper';
import Hero from '@/components/common/Hero';
import SEOServiceForm from '../seo-form';
import {
  FaShoppingCart,
  FaSearchDollar,
  FaStore,
  FaMobileAlt,
  FaLink,
  FaStar,
  FaUsers,
  FaHandshake,
  FaChartPie,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SEOComparison from '../seo-comparison';
import ServiceHero from '@/components/common/Hero';
import MarketingServicesPricing from '../marketing-pricing-table';
import EcommerceRankingSystem from './ecommerce-ranking';

const features = [
  {
    title: 'Product & Category Optimization',
    description:
      'Optimize product titles, descriptions, and categories to improve visibility and conversions.',
    icon: <FaStore className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Conversion Rate Optimization',
    description:
      'Implement SEO strategies focused on increasing traffic and converting visitors into customers.',
    icon: <FaShoppingCart className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Mobile-Friendly SEO',
    description:
      'Ensure your ecommerce site is fully responsive and optimized for mobile shoppers.',
    icon: <FaMobileAlt className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Link Building & Authority',
    description:
      'Build high-quality backlinks to boost your site’s authority and improve search rankings.',
    icon: <FaLink className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Reputation Management',
    description:
      'Manage customer reviews and ratings to build trust and improve local search rankings.',
    icon: <FaStar className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Keyword Research for Ecommerce',
    description:
      'Target the best keywords that shoppers use to find products in your niche.',
    icon: <FaSearchDollar className='w-12 h-12 text-gradient' />,
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
    content: `Our ecommerce SEO packages are tailored to your product range and business size. Prices vary based on complexity and scale.`,
  },
  {
    label: 'Reporting',
    content: `You’ll get detailed monthly reports tracking traffic, rankings, and sales conversions to keep you informed.`,
  },
  {
    label: 'Accountability',
    content: `Our dedicated team ensures your ecommerce SEO campaigns are implemented flawlessly and consistently optimized.`,
  },
];

const EcommerceSEOPage = () => {
  return (
    <div>
      <ServiceHero
        title='Ecommerce SEO'
        subtitle='Grow Your Online Store'
        description='Boost your online store’s visibility and sales with targeted Ecommerce SEO strategies optimized for product rankings and conversions.'
        badge='Ecommerce SEO'
        backgroundGradient='from-blue-600/20 via-pink-600/10 to-green-600/20 dark:from-blue-900/30 dark:via-pink-900/20 dark:to-green-900/30'
        primaryColor='from-blue-600 to-pink-600'
        secondaryColor='from-green-500 to-blue-600'
        features={[
          {
            icon: 'ShoppingCart',
            text: 'Product SEO',
            description: 'Optimize product listings',
            color: 'from-pink-500 to-blue-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Sales Growth',
            description: 'Increase conversions',
            color: 'from-green-500 to-pink-600',
          },
          {
            icon: 'BarChart2',
            text: 'Analytics',
            description: 'Track & improve results',
            color: 'from-blue-500 to-green-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'Stores Optimized', icon: 'ShoppingCart' },
          { value: '30%', label: 'Avg. Sales Lift', icon: 'TrendingUp' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Get Ecommerce SEO',
          href: '/contact?service=ecommerce-seo',
        }}
        ctaSecondary={{
          text: 'See Ecommerce Results',
          href: '/portfolio?category=ecommerce-seo',
        }}
      />

      <EcommerceRankingSystem />
    </div>
  );
};

export default EcommerceSEOPage;
