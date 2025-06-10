// components/services/seo/local-seo-optimization.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { MapPin, Star, Phone, Clock } from 'lucide-react';

const LocalSEOOptimization = () => {
  const gmbFeatures = [
    { title: 'Business Profile Setup', completion: 100 },
    { title: 'Photo Optimization', completion: 95 },
    { title: 'Review Management', completion: 88 },
    { title: 'Local Citations', completion: 92 },
    { title: 'NAP Consistency', completion: 100 },
    { title: 'Local Keywords', completion: 85 },
  ];

  const localResults = [
    { metric: 'Local Search Visibility', increase: '+245%' },
    { metric: 'Google Maps Impressions', increase: '+180%' },
    { metric: 'Direction Requests', increase: '+160%' },
    { metric: 'Phone Calls', increase: '+220%' },
  ];

  return (
    <section className='bg-gradient-to-br from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>Local SEO Domination</h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Optimize your local presence to capture customers in your area
          </p>
        </div>

        {/* GMB Optimization Progress */}
        <div className='bg-white dark:bg-gray-800 shadow-lg mb-12 p-8 rounded-lg'>
          <h3 className='mb-6 font-bold text-xl text-center'>
            Google My Business Optimization
          </h3>
          <div className='gap-6 grid md:grid-cols-3'>
            {gmbFeatures.map((feature, index) => (
              <div key={index} className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium text-sm'>{feature.title}</span>
                  <span className='text-green-600 text-sm'>
                    {feature.completion}%
                  </span>
                </div>
                <div className='bg-gray-200 dark:bg-gray-700 rounded-full w-full h-2'>
                  <div
                    className='bg-green-600 rounded-full h-2 transition-all duration-300'
                    style={{ width: `${feature.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Results */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {localResults.map((result, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <div className='mb-2 font-bold text-green-600 text-3xl'>
                {result.increase}
              </div>
              <div className='text-gray-600 dark:text-gray-400 text-sm'>
                {result.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Local SEO Features */}
        <div className='gap-6 grid md:grid-cols-4'>
          {[
            {
              icon: MapPin,
              title: 'Google Maps Ranking',
              desc: 'Top 3 local positions',
            },
            {
              icon: Star,
              title: 'Review Optimization',
              desc: '4.8+ star ratings',
            },
            {
              icon: Phone,
              title: 'Click-to-Call Setup',
              desc: 'Direct customer calls',
            },
            {
              icon: Clock,
              title: '24/7 Monitoring',
              desc: 'Constant optimization',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <feature.icon className='mx-auto mb-4 w-12 h-12 text-blue-600' />
              <h3 className='mb-2 font-bold'>{feature.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default LocalSEOOptimization;
