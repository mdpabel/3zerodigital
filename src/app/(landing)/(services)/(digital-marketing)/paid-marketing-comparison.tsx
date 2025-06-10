import React from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import Link from 'next/link';
import CardBorder from '@/components/common/card-border';
import { Button } from '@/components/ui/button';
import ComponentWrapper from '@/components/common/component-wrapper';

const with3ZeroPaidMarketingItems = [
  'Virtually Zero Vulnerability in campaign strategy',
  'Consistent, reliable TikTok ads uptime',
  'Error-free ad implementation & tracking',
  'Performance-optimized ad creatives',
  'Platform-friendly campaign architecture',
  'Transparent monthly performance reports',
  'Dedicated paid marketing support team',
  'Scalable plans tailored to growth',
  'Competitive and transparent pricing',
];

const without3ZeroPaidMarketingItems = [
  'Frequent campaign misconfigurations',
  'Irregular or halted ad efforts',
  'Errors in tracking and data',
  'Poor ad creative and targeting',
  'Suboptimal campaign structure',
  'Lack of reporting and insights',
  'Limited or no campaign support',
  'One-size-fits-all packages',
  'Hidden fees and unclear pricing',
];

const PaidMarketingComparison = () => {
  return (
    <ComponentWrapper className='my-10'>
      <div className='mb-8 text-center'>
        <h3 className='font-bold text-2xl'>
          Why Choose 3Zero Digital for TikTok Ads?
        </h3>
      </div>

      <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
        {/* Card 1: With 3Zero Paid Marketing */}
        <div className='relative bg-gray-50 dark:bg-gray-950 shadow-lg border border-slate-300 dark:border-slate-700 rounded-lg'>
          <CardBorder />
          <div className='p-6'>
            <h4 className='pb-5 font-semibold text-black dark:text-white text-2xl text-center'>
              TikTok Ads{' '}
              <span className='bg-green-600 px-2 rounded-[2px]'>
                with 3Zero Digital
              </span>
            </h4>
            <ul className='md:pl-8 text-gray-700 list-none'>
              {with3ZeroPaidMarketingItems.map((item, index) => (
                <li key={index} className='flex items-center mb-2'>
                  <MdCheck className='mr-2 border border-green-600 rounded-sm text-green-600' />
                  <span className='text-black dark:text-white'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Without 3Zero Paid Marketing */}
        <div className='relative bg-gray-50 dark:bg-gray-950 shadow-lg border border-slate-300 dark:border-slate-700 rounded-lg'>
          <CardBorder />
          <div className='p-6'>
            <h4 className='pb-5 font-semibold text-black dark:text-white text-2xl text-center'>
              TikTok Ads{' '}
              <span className='bg-red-600 px-2 rounded-[2px]'>
                without 3Zero Digital
              </span>
            </h4>
            <ul className='md:pl-8 text-gray-700 list-none'>
              {without3ZeroPaidMarketingItems.map((item, index) => (
                <li key={index} className='flex items-center mb-2'>
                  <MdClose className='mr-2 border border-red-600 rounded-sm text-red-600' />
                  <span className='text-black dark:text-white'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-10'>
        <Button className='p-6 w-40' asChild>
          <Link href='#getStarted'>Get Started</Link>
        </Button>
      </div>
    </ComponentWrapper>
  );
};

export default PaidMarketingComparison;
