// components/services/ads/meta-ads-targeting.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { Users, Heart, Share2, ShoppingBag } from 'lucide-react';

const MetaAdsTargeting = () => {
  const audienceSegments = [
    {
      name: 'Lookalike Audiences',
      size: '2.3M',
      engagement: '4.2%',
      cpm: '$3.45',
      conversions: 234,
    },
    {
      name: 'Interest-Based',
      size: '5.7M',
      engagement: '3.8%',
      cpm: '$2.89',
      conversions: 189,
    },
    {
      name: 'Custom Audiences',
      size: '850K',
      engagement: '6.1%',
      cpm: '$4.12',
      conversions: 345,
    },
    {
      name: 'Retargeting',
      size: '120K',
      engagement: '8.9%',
      cpm: '$5.67',
      conversions: 456,
    },
  ];

  const adFormats = [
    { format: 'Video Ads', performance: '+156% Engagement' },
    { format: 'Carousel Ads', performance: '+89% CTR' },
    { format: 'Collection Ads', performance: '+234% Conversions' },
    { format: 'Story Ads', performance: '+67% Reach' },
  ];

  return (
    <section className='bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            Meta Ads Audience Targeting
          </h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Precision targeting across Facebook and Instagram for maximum
            engagement
          </p>
        </div>

        {/* Audience Performance */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {audienceSegments.map((audience, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <h3 className='mb-4 font-bold'>{audience.name}</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-sm'>Audience Size:</span>
                  <span className='font-medium'>{audience.size}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Engagement:</span>
                  <span className='font-medium text-green-600'>
                    {audience.engagement}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>CPM:</span>
                  <span className='font-medium'>{audience.cpm}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Conversions:</span>
                  <span className='font-bold text-blue-600'>
                    {audience.conversions}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Format Performance */}
        <div className='bg-white dark:bg-gray-800 shadow-lg mb-12 p-8 rounded-lg'>
          <h3 className='mb-8 font-bold text-xl text-center'>
            Ad Format Performance
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {adFormats.map((format, index) => (
              <div
                key={index}
                className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center'>
                <h4 className='mb-2 font-bold'>{format.format}</h4>
                <div className='font-bold text-blue-600'>
                  {format.performance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Metrics */}
        <div className='gap-6 grid md:grid-cols-4'>
          {[
            {
              icon: Users,
              title: 'Reach',
              value: '2.4M',
              desc: 'Monthly active users',
            },
            {
              icon: Heart,
              title: 'Engagement',
              value: '5.8%',
              desc: 'Above average rate',
            },
            {
              icon: Share2,
              title: 'Shares',
              value: '12.3K',
              desc: 'Viral coefficient',
            },
            {
              icon: ShoppingBag,
              title: 'Conversions',
              value: '1,234',
              desc: 'This month',
            },
          ].map((metric, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <metric.icon className='mx-auto mb-4 w-12 h-12 text-purple-600' />
              <div className='mb-2 font-bold text-purple-600 text-3xl'>
                {metric.value}
              </div>
              <h3 className='mb-1 font-bold'>{metric.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default MetaAdsTargeting;
