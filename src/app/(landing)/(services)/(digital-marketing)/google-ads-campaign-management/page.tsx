import ComponentWrapper from '@/components/common/component-wrapper';
import Hero from '@/components/common/Hero';
import PaidMarketingForm from '../paid-marketing-form';
import {
  FaVideo,
  FaBullhorn,
  FaUsers,
  FaHandshake,
  FaChartPie,
  FaMobileAlt,
} from 'react-icons/fa';
import { SiGoogleads } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PaidMarketingComparison from '../paid-marketing-comparison';
import ServiceHero from '@/components/common/Hero';
import GoogleAdsPricing from './google-ads-pricing';
import GoogleAdsDashboard from './google-ads-dashboard';

const features = [
  {
    title: 'Engaging Video & Search Ads',
    description:
      'Create compelling video and search ads that capture attention across Google’s vast network.',
    icon: <FaVideo className='w-14 h-14 text-blue-600' />,
  },
  {
    title: 'Advanced Audience Targeting',
    description:
      'Reach your ideal customers using Google’s precise targeting by demographics, interests, and search intent.',
    icon: <FaBullhorn className='w-14 h-14 text-red-600' />,
  },
  {
    title: 'Cross-Device Optimization',
    description:
      'Deliver seamless ad experiences optimized for desktop, mobile, and tablet users.',
    icon: <FaMobileAlt className='w-14 h-14 text-green-600' />,
  },
  {
    title: 'Remarketing & Lead Generation',
    description:
      'Use remarketing strategies to re-engage visitors and convert leads into customers.',
    icon: <FaUsers className='w-14 h-14 text-yellow-500' />,
  },
  {
    title: 'Performance Analytics & Reporting',
    description:
      'Monitor campaigns with Google Ads analytics to maximize ROI and refine strategies.',
    icon: <FaChartPie className='w-14 h-14 text-gray-600' />,
  },
];

const whyChooseStats = [
  {
    number: '0',
    label: 'Vulnerability',
    icon: <FaUsers className='mx-auto mb-2 w-12 h-12 text-blue-600' />,
  },
  {
    number: '0',
    label: 'Downtime',
    icon: <FaHandshake className='mx-auto mb-2 w-12 h-12 text-red-600' />,
  },
  {
    number: '0',
    label: 'Error',
    icon: <FaChartPie className='mx-auto mb-2 w-12 h-12 text-green-600' />,
  },
];

const GoogleAdsPage = () => {
  return (
    <div>
      <ServiceHero
        title='Google Ads'
        subtitle='Maximize Your ROI'
        description='Drive targeted traffic and maximize ROI with expertly managed Google Ads campaigns tailored to your business goals.'
        badge='Google Ads'
        backgroundGradient='from-yellow-600/20 via-blue-600/10 to-green-600/20 dark:from-yellow-900/30 dark:via-blue-900/20 dark:to-green-900/30'
        primaryColor='from-yellow-600 to-green-600'
        secondaryColor='from-blue-500 to-yellow-600'
        features={[
          {
            icon: 'Search',
            text: 'Targeted Campaigns',
            description: 'Reach your ideal audience',
            color: 'from-yellow-500 to-green-600',
          },
          {
            icon: 'BarChart2',
            text: 'Performance Tracking',
            description: 'Real-time analytics',
            color: 'from-blue-500 to-yellow-600',
          },
          {
            icon: 'TrendingUp',
            text: 'ROI Focused',
            description: 'Maximize your ad spend',
            color: 'from-green-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '1M+', label: 'Ad Spend Managed', icon: 'BarChart2' },
          { value: '10K+', label: 'Leads Generated', icon: 'TrendingUp' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Start Google Ads',
          href: '/contact?service=google-ads',
        }}
        ctaSecondary={{
          text: 'See Ad Results',
          href: '/portfolio?category=google-ads',
        }}
      />
      <GoogleAdsPricing />
      <GoogleAdsDashboard />
    </div>
  );
};

export default GoogleAdsPage;
