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
import { SiLinkedin } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PaidMarketingComparison from '../paid-marketing-comparison';
import ServiceHero from '@/components/common/Hero';

const features = [
  {
    title: 'Professional Video & Image Ads',
    description:
      'Create polished, professional ads designed for LinkedIn’s business-focused audience.',
    icon: <FaVideo className='w-14 h-14 text-blue-700' />,
  },
  {
    title: 'Targeted B2B Audience Reach',
    description:
      'Reach decision-makers, professionals, and companies using LinkedIn’s precise demographic and industry targeting.',
    icon: <FaBullhorn className='w-14 h-14 text-blue-700' />,
  },
  {
    title: 'Mobile & Desktop Optimized',
    description:
      'Deliver seamless ads optimized for both desktop and mobile LinkedIn users.',
    icon: <FaMobileAlt className='w-14 h-14 text-blue-700' />,
  },
  {
    title: 'Thought Leader & Influencer Collaborations',
    description:
      'Collaborate with LinkedIn influencers to build authority and expand reach.',
    icon: <FaUsers className='w-14 h-14 text-blue-700' />,
  },
  {
    title: 'Insightful Campaign Analytics',
    description:
      'Leverage LinkedIn analytics to optimize campaigns and maximize your ROI continuously.',
    icon: <FaChartPie className='w-14 h-14 text-blue-700' />,
  },
];

const whyChooseStats = [
  {
    number: '0',
    label: 'Vulnerability',
    icon: <FaUsers className='mx-auto mb-2 w-12 h-12 text-blue-700' />,
  },
  {
    number: '0',
    label: 'Downtime',
    icon: <FaHandshake className='mx-auto mb-2 w-12 h-12 text-blue-700' />,
  },
  {
    number: '0',
    label: 'Error',
    icon: <FaChartPie className='mx-auto mb-2 w-12 h-12 text-blue-700' />,
  },
];

const LinkedInAdsPage = () => {
  return (
    <div>
      <ServiceHero
        title='LinkedIn Ads'
        subtitle='Connect with Professionals'
        description='Connect with professionals and decision-makers through strategic LinkedIn Ads that drive B2B leads and brand authority.'
        badge='LinkedIn Ads'
        backgroundGradient='from-blue-600/20 via-indigo-600/10 to-green-600/20 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-green-900/30'
        primaryColor='from-blue-600 to-green-600'
        secondaryColor='from-indigo-500 to-blue-600'
        features={[
          {
            icon: 'Linkedin',
            text: 'B2B Targeting',
            description: 'Reach decision-makers',
            color: 'from-blue-500 to-green-600',
          },
          {
            icon: 'Users',
            text: 'Professional Audience',
            description: 'Engage business leaders',
            color: 'from-indigo-500 to-blue-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Lead Generation',
            description: 'Drive quality B2B leads',
            color: 'from-green-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '1M+', label: 'Impressions', icon: 'Linkedin' },
          { value: '10K+', label: 'Leads Generated', icon: 'TrendingUp' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Start LinkedIn Ads',
          href: '/contact?service=linkedin-ads',
        }}
        ctaSecondary={{
          text: 'See LinkedIn Results',
          href: '/portfolio?category=linkedin-ads',
        }}
      />

      {/* Did You Know - no background, blue underline only */}
      <section className='mx-auto mb-16 px-6 max-w-4xl text-center'>
        <h2 className='mb-4 font-bold text-zinc-900 dark:text-white text-3xl'>
          Did You <span className='text-blue-700 underline'>Know?</span>
        </h2>
        <p className='mx-auto max-w-3xl text-zinc-700 dark:text-zinc-300 text-lg'>
          LinkedIn has over 900 million users worldwide, making it the premier
          platform for B2B marketing and professional networking.
        </p>
      </section>

      {/* Features - stacked vertical, no scroll */}
      <section className='space-y-10 mx-auto mb-16 px-6 max-w-7xl'>
        <h3 className='mb-4 font-semibold text-zinc-900 dark:text-white text-3xl text-center'>
          Why LinkedIn Ads Work
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

      {/* Why Choose Us Section */}
      <PaidMarketingComparison />

      {/* Contact Form with neutral background */}
      <section
        id='getStarted'
        className='bg-white dark:bg-gray-900 shadow-lg mx-auto mb-20 px-6 py-10 rounded-lg max-w-4xl'>
        <PaidMarketingForm
          title='Get Your Customized LinkedIn Ads Strategy'
          Icon={<SiLinkedin className='mx-auto mb-6 w-16 h-16 text-blue-700' />}
        />
      </section>

      {/* ROI Section - dark gray bg, split layout */}
      <section className='flex md:flex-row flex-col items-center gap-12 bg-gray-900 dark:bg-gray-800 mx-auto mb-20 p-10 px-6 rounded-lg max-w-7xl'>
        <div className='flex justify-center md:w-1/3'>
          <SiLinkedin className='w-28 h-28 text-blue-700' />
        </div>
        <div className='md:w-2/3 md:text-left text-center'>
          <h3 className='mb-6 font-bold text-white text-3xl'>
            ROI-Driven LinkedIn Advertising That Delivers
          </h3>
          <p className='mx-auto md:mx-0 mb-4 max-w-xl text-gray-300 leading-relaxed'>
            At 3Zero Digital, we help you maximize your B2B ad spend by:
          </p>
          <ul className='space-y-3 mx-auto md:mx-0 max-w-xl text-gray-300 text-left list-disc list-inside'>
            <li>
              Crafting professional ads tailored to LinkedIn’s business
              audience.
            </li>
            <li>
              Targeting decision-makers, companies, and professionals precisely.
            </li>
            <li>Optimizing campaigns with real-time data and insights.</li>
            <li>
              Providing transparent performance reporting and ROI tracking.
            </li>
            <li>Scaling campaigns as your business network grows.</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className='flex md:flex-row flex-col justify-between items-center gap-8 bg-white dark:bg-gray-900 my-20 p-10 rounded-lg'>
        <div className='max-w-xl'>
          <h3 className='mb-4 font-bold text-3xl'>
            Partner with <span className='text-blue-700'>3Zero Digital</span>{' '}
            for LinkedIn ads that convert.
          </h3>
          <p className='mb-6 leading-relaxed'>
            With <strong>0 Vulnerability, 0 Downtime, and 0 Error</strong>, we
            deliver precise, scalable campaigns that grow your professional
            network and ROI. Start seeing results in just 30 days!
          </p>
          <Button className='p-5' asChild>
            <Link href='#getStarted'>Launch My LinkedIn Ads</Link>
          </Button>
        </div>

        {/* Icon */}
        <SiLinkedin className='mx-auto md:mx-0 w-32 h-32 text-blue-700' />
      </section>
    </div>
  );
};

export default LinkedInAdsPage;
