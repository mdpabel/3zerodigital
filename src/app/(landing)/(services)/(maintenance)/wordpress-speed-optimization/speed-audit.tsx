// components/services/optimization/speed-audit.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { Gauge, Image, Database, Zap } from 'lucide-react';

const SpeedOptimizationAudit = () => {
  const metrics = [
    {
      name: 'Page Load Time',
      before: '8.2s',
      after: '1.4s',
      improvement: '-83%',
    },
    { name: 'Page Size', before: '3.2MB', after: '892KB', improvement: '-72%' },
    { name: 'HTTP Requests', before: '127', after: '34', improvement: '-73%' },
    {
      name: 'Lighthouse Score',
      before: '34',
      after: '96',
      improvement: '+182%',
    },
  ];

  const optimizations = [
    {
      title: 'Image Optimization',
      description: 'WebP conversion & compression',
      icon: Image,
    },
    {
      title: 'Database Cleanup',
      description: 'Remove bloat & optimize queries',
      icon: Database,
    },
    {
      title: 'Caching Setup',
      description: 'Redis & CDN implementation',
      icon: Zap,
    },
    {
      title: 'Code Minification',
      description: 'CSS/JS optimization',
      icon: Gauge,
    },
  ];

  return (
    <section className='py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            Speed Optimization Results
          </h2>
          <p className='mx-auto max-w-2xl dark:text-gray-400'>
            Dramatic performance improvements that boost rankings and
            conversions
          </p>
        </div>

        {/* Before/After Metrics */}
        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-4 mb-12'>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <h3 className='mb-4 font-bold'>{metric.name}</h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm'>Before:</span>
                  <span className='font-medium text-red-600'>
                    {metric.before}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>After:</span>
                  <span className='font-medium text-green-600'>
                    {metric.after}
                  </span>
                </div>
                <div className='pt-2 text-center'>
                  <span className='bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded font-bold text-orange-600 text-sm'>
                    {metric.improvement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optimization Methods */}
        <div className='gap-6 grid md:grid-cols-4'>
          {optimizations.map((opt, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <opt.icon className='mx-auto mb-4 w-12 h-12 text-orange-600' />
              <h3 className='mb-2 font-bold'>{opt.title}</h3>
              <p className='dark:text-gray-400 text-sm'>{opt.description}</p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default SpeedOptimizationAudit;
