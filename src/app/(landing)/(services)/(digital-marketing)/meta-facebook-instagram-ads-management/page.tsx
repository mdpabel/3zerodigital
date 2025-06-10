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
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PaidMarketingComparison from '../paid-marketing-comparison';
import ServiceHero from '@/components/common/Hero';
import MetaAdsPricing from './meta-ads-pricing';
import MetaAdsTargeting from './meta-ads-targeting';

const features = [
  {
    title: 'Engaging Video & Image Ads',
    description:
      'Create visually captivating ads tailored for Facebook and Instagram feeds and stories.',
    icon: <FaVideo className='w-14 h-14 text-blue-600' />,
  },
  {
    title: 'Advanced Audience Targeting',
    description:
      'Reach your perfect audience with Facebook and Instagram’s powerful targeting based on interests, behaviors, and demographics.',
    icon: <FaBullhorn className='w-14 h-14 text-blue-600' />,
  },
  {
    title: 'Mobile-Optimized Campaigns',
    description:
      'Ensure ads look perfect and perform well on mobile devices across Facebook and Instagram.',
    icon: <FaMobileAlt className='w-14 h-14 text-blue-600' />,
  },
  {
    title: 'Influencer & Partner Collaborations',
    description:
      'Leverage influencers and brand partnerships on Meta platforms for amplified reach and trust.',
    icon: <FaUsers className='w-14 h-14 text-blue-600' />,
  },
  {
    title: 'Real-Time Data Analytics',
    description:
      'Use Meta’s analytics tools to optimize your campaigns continuously for maximum ROI.',
    icon: <FaChartPie className='w-14 h-14 text-blue-600' />,
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
    icon: <FaHandshake className='mx-auto mb-2 w-12 h-12 text-blue-600' />,
  },
  {
    number: '0',
    label: 'Error',
    icon: <FaChartPie className='mx-auto mb-2 w-12 h-12 text-blue-600' />,
  },
];

const MetaAdsPage = () => {
  return (
    <div>
      <ServiceHero
        title='Meta Ads (Facebook & Instagram)'
        subtitle='Reach & Engage Your Audience'
        description='Reach your ideal audience and boost engagement with high-converting Meta (Facebook & Instagram) Ads campaigns.'
        badge='Meta Ads'
        backgroundGradient='from-blue-600/20 via-pink-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-pink-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-pink-600'
        secondaryColor='from-indigo-500 to-blue-600'
        features={[
          {
            icon: 'Facebook',
            text: 'Social Reach',
            description: 'Facebook & Instagram ads',
            color: 'from-blue-500 to-pink-600',
          },
          {
            icon: 'Users',
            text: 'Audience Targeting',
            description: 'Find your perfect customers',
            color: 'from-pink-500 to-blue-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Boost Engagement',
            description: 'Increase likes & sales',
            color: 'from-indigo-500 to-green-600',
          },
        ]}
        stats={[
          { value: '5M+', label: 'Impressions', icon: 'Facebook' },
          { value: '10K+', label: 'Leads Generated', icon: 'TrendingUp' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Start Meta Ads',
          href: '/contact?service=meta-ads',
        }}
        ctaSecondary={{
          text: 'See Meta Results',
          href: '/portfolio?category=meta-ads',
        }}
      />

      <MetaAdsPricing />
      <MetaAdsTargeting />
    </div>
  );
};

export default MetaAdsPage;
