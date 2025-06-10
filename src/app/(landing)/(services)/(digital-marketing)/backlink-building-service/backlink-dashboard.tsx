// components/services/seo/backlink-dashboard.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { TrendingUp, Link, Globe, Award } from 'lucide-react';

const BacklinkDashboard = () => {
  const metrics = [
    { label: 'Domain Authority', before: 32, after: 67, icon: Award },
    { label: 'Quality Backlinks', before: 45, after: 312, icon: Link },
    { label: 'Referring Domains', before: 23, after: 156, icon: Globe },
    {
      label: 'Organic Traffic',
      before: '2.1K',
      after: '8.7K',
      icon: TrendingUp,
    },
  ];

  const linkTypes = [
    { type: 'Guest Posts', da: '60-80', quantity: 15, price: '$150' },
    { type: 'Editorial Links', da: '70-90', quantity: 8, price: '$300' },
    { type: 'Resource Pages', da: '50-70', quantity: 25, price: '$80' },
    { type: 'Broken Link Building', da: '40-60', quantity: 35, price: '$50' },
  ];

  return (
    <section className='py-16'>
      <ComponentWrapper className='mx-auto px-4 container'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            High-Quality Backlink Portfolio
          </h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Strategic link building that boosts domain authority and organic
            rankings
          </p>
        </div>

        {/* Metrics Dashboard */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <div className='flex items-center gap-3 mb-4'>
                <metric.icon className='w-8 h-8 text-blue-600' />
                <h3 className='font-bold'>{metric.label}</h3>
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <div className='text-gray-500 text-sm'>Before</div>
                  <div className='font-bold text-red-600 text-lg'>
                    {metric.before}
                  </div>
                </div>
                <TrendingUp className='w-6 h-6 text-green-600' />
                <div>
                  <div className='text-gray-500 text-sm'>After</div>
                  <div className='font-bold text-green-600 text-lg'>
                    {metric.after}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link Building Packages */}
        <div className='bg-gray-50 dark:bg-gray-900 p-8 rounded-lg'>
          <h3 className='mb-8 font-bold text-2xl text-center'>
            Link Building Packages
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {linkTypes.map((link, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 shadow p-6 rounded-lg'>
                <h4 className='mb-2 font-bold'>{link.type}</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span>Domain Authority:</span>
                    <span className='font-medium'>{link.da}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Quantity:</span>
                    <span className='font-medium'>{link.quantity} links</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Price per link:</span>
                    <span className='font-bold text-green-600'>
                      {link.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default BacklinkDashboard;
