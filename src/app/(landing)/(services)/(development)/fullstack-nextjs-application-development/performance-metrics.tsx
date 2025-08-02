// components/services/nextjs/performance-metrics.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { Gauge, Globe, Zap, Eye } from 'lucide-react';

const NextJSPerformanceMetrics = () => {
  const metrics = [
    {
      label: 'Lighthouse Score',
      value: 98,
      color: 'text-green-600',
      icon: Gauge,
    },
    {
      label: 'First Contentful Paint',
      value: '0.8s',
      color: 'text-blue-600',
      icon: Zap,
    },
    {
      label: 'Largest Contentful Paint',
      value: '1.2s',
      color: 'text-purple-600',
      icon: Eye,
    },
    {
      label: 'Time to Interactive',
      value: '1.5s',
      color: 'text-orange-600',
      icon: Globe,
    },
  ];

  return (
    <ComponentWrapper className='py-16'>
      <div className='mx-auto px-4 container'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>Performance That Delivers</h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Next.js applications optimized for speed, SEO, and user experience
          </p>
        </div>

        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-4 mb-12'>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <metric.icon
                className={`w-12 h-12 mx-auto mb-4 ${metric.color}`}
              />
              <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                {metric.value}
              </div>
              <div className='text-gray-600 dark:text-gray-400 text-sm'>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className='p-8 rounded-lg text-center'>
          <h3 className='mb-4 font-bold text-2xl'>Next.js 13+ Features</h3>
          <div className='gap-6 grid md:grid-cols-3'>
            {[
              'App Router with Layouts',
              'Server Components',
              'Streaming & Suspense',
              'Edge Runtime',
              'Built-in TypeScript',
              'Automatic Code Splitting',
            ].map((feature, index) => (
              <div key={index} className='bg-white/20 p-3 rounded'>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default NextJSPerformanceMetrics;
