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
  FaCogs,
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PaidMarketingComparison from '../paid-marketing-comparison';
import ServiceHero from '@/components/common/Hero';

const features = [
  {
    title: 'Creative Video Ads',
    description:
      'Leverage TikTok’s engaging video format to capture attention and drive conversions.',
    icon: <FaVideo className='w-14 h-14 text-pink-600' />,
  },
  {
    title: 'Targeted Audience Reach',
    description:
      'Reach your ideal customers with TikTok’s advanced targeting options based on interests, demographics, and behavior.',
    icon: <FaBullhorn className='w-14 h-14 text-pink-600' />,
  },
  {
    title: 'Mobile-First Optimization',
    description:
      'Optimize ads specifically for TikTok’s mobile users for maximum engagement.',
    icon: <FaMobileAlt className='w-14 h-14 text-pink-600' />,
  },
  {
    title: 'Influencer Collaboration',
    description:
      'Partner with TikTok influencers to amplify your brand message and reach wider audiences.',
    icon: <FaUsers className='w-14 h-14 text-pink-600' />,
  },
  {
    title: 'Data-Driven Campaigns',
    description:
      'Use TikTok’s analytics to continually optimize ad performance and maximize ROI.',
    icon: <FaChartPie className='w-14 h-14 text-pink-600' />,
  },
];

const whyChooseStats = [
  {
    number: '0',
    label: 'Vulnerability',
    icon: <FaUsers className='mx-auto mb-2 w-12 h-12 text-pink-600' />,
  },
  {
    number: '0',
    label: 'Downtime',
    icon: <FaHandshake className='mx-auto mb-2 w-12 h-12 text-pink-600' />,
  },
  {
    number: '0',
    label: 'Error',
    icon: <FaChartPie className='mx-auto mb-2 w-12 h-12 text-pink-600' />,
  },
];

const TikTokAdsPage = () => {
  return (
    <div>
      <ServiceHero
        title='TikTok Ads'
        subtitle='Go Viral, Get Results'
        description='Create viral impact and drive conversions with engaging, trend-driven TikTok Ads tailored to your brand.'
        badge='TikTok Ads'
        backgroundGradient='from-pink-600/20 via-blue-600/10 to-yellow-600/20 dark:from-pink-900/30 dark:via-blue-900/20 dark:to-yellow-900/30'
        primaryColor='from-pink-600 to-yellow-600'
        secondaryColor='from-blue-500 to-pink-600'
        features={[
          {
            icon: 'Video',
            text: 'Viral Content',
            description: 'Trendy, shareable ads',
            color: 'from-pink-500 to-yellow-600',
          },
          {
            icon: 'Zap',
            text: 'Fast Growth',
            description: 'Rapid audience expansion',
            color: 'from-blue-500 to-pink-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Conversions',
            description: 'Turn views into sales',
            color: 'from-yellow-500 to-green-600',
          },
        ]}
        stats={[
          { value: '10M+', label: 'Views Generated', icon: 'Video' },
          { value: '100K+', label: 'Engagements', icon: 'Zap' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Start TikTok Ads',
          href: '/contact?service=tiktok-ads',
        }}
        ctaSecondary={{
          text: 'See TikTok Results',
          href: '/portfolio?category=tiktok-ads',
        }}
      />

      {/* Did You Know - no background, pink underline only */}
      <section className='mx-auto mb-16 px-6 max-w-4xl text-center'>
        <h2 className='mb-4 font-bold text-zinc-900 dark:text-white text-3xl'>
          Did You <span className='text-pink-600 underline'>Know?</span>
        </h2>
        <p className='mx-auto max-w-3xl text-zinc-700 dark:text-zinc-300 text-lg'>
          TikTok boasts over 1 billion monthly active users worldwide, with a
          majority under 30. Video ads on TikTok have an average engagement rate
          of over 17%, far higher than most social platforms.
        </p>
      </section>

      {/* Features - stacked vertical, no scroll */}
      <section className='space-y-10 mx-auto mb-16 px-6 max-w-7xl'>
        <h3 className='mb-4 font-semibold text-zinc-900 dark:text-white text-3xl text-center'>
          Why TikTok Ads Work
        </h3>
        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className='bg-gray-900 dark:bg-gray-800 shadow-md hover:shadow-lg p-6 rounded-xl transition'>
              <div className='mb-4'>{icon}</div>
              <h4 className='mb-2 font-semibold text-white'>{title}</h4>
              <p className='text-gray-300'>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <PaidMarketingComparison />

      {/* Contact Form with neutral background */}
      <section
        id='getStarted'
        className='bg-white dark:bg-gray-900 shadow-lg mx-auto mb-20 px-6 py-10 rounded-lg max-w-4xl'>
        <PaidMarketingForm
          title='Get Your Customized TikTok Ads Strategy'
          Icon={<SiTiktok className='mx-auto mb-6 w-16 h-16 text-pink-600' />}
        />
      </section>

      {/* ROI Section - dark gray bg, split layout */}
      <section className='flex md:flex-row flex-col items-center gap-12 bg-gray-900 dark:bg-gray-800 mx-auto mb-20 p-10 px-6 rounded-lg max-w-7xl'>
        <div className='md:w-1/3'>
          <SiTiktok className='mx-auto md:mx-0 w-56 h-56 text-pink-600' />
        </div>
        <div className='md:w-2/3 md:text-left text-center'>
          <h3 className='mb-6 font-bold text-3xl'>
            ROI-Driven TikTok Advertising That Delivers
          </h3>
          <p className='mx-auto md:mx-0 mb-4 max-w-xl text-gray-300 leading-relaxed'>
            At 3Zero Digital, we focus on maximizing your ad spend to deliver
            real results by:
          </p>
          <ul className='space-y-3 mx-auto md:mx-0 max-w-xl text-gray-300 text-left list-disc list-inside'>
            <li>
              Creating engaging, authentic TikTok videos that resonate with your
              audience.
            </li>
            <li>Targeting your ideal demographics and interests precisely.</li>
            <li>
              Constantly optimizing campaigns based on real-time data and
              trends.
            </li>
            <li>
              Ensuring clear, transparent reporting on campaign performance and
              ROI.
            </li>
            <li>Scaling your TikTok ads strategy as your business grows.</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className='flex md:flex-row flex-col justify-between items-center gap-8 bg-white dark:bg-gray-900 my-20 p-10 rounded-lg'>
        <div className='max-w-xl'>
          <h3 className='mb-4 font-bold text-3xl'>
            Partner with <span className='text-pink-600'>3Zero Digital</span>{' '}
            for TikTok ads that convert.
          </h3>
          <p className='mb-6 leading-relaxed'>
            With <strong>0 Vulnerability, 0 Downtime, and 0 Error</strong>, we
            deliver precise, scalable campaigns that grow your brand and ROI.
            Start seeing results in just 30 days!
          </p>
          <Button className='p-5' asChild>
            <Link href='#getStarted'>Launch My TikTok Ads</Link>
          </Button>
        </div>

        {/* Icon added here */}
        <SiTiktok className='mx-auto md:mx-0 w-32 h-32 text-pink-600' />
      </section>
    </div>
  );
};

export default TikTokAdsPage;
