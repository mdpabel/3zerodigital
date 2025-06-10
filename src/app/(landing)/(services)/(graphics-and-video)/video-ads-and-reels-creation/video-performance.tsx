// components/services/video/video-performance.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { Play, Eye, Share2, TrendingUp } from 'lucide-react';

const VideoPerformanceAnalytics = () => {
  const videoTypes = [
    {
      type: 'Product Demo Videos',
      avgViews: '125K',
      engagement: '8.9%',
      conversionRate: '12.3%',
      platforms: ['Instagram', 'Facebook', 'YouTube'],
    },
    {
      type: 'Brand Story Videos',
      avgViews: '89K',
      engagement: '15.2%',
      conversionRate: '8.7%',
      platforms: ['Instagram', 'TikTok', 'LinkedIn'],
    },
    {
      type: 'Testimonial Videos',
      avgViews: '67K',
      engagement: '18.5%',
      conversionRate: '22.1%',
      platforms: ['Facebook', 'YouTube', 'Website'],
    },
  ];

  const videoMetrics = [
    {
      metric: 'Average View Duration',
      value: '45 seconds',
      improvement: '+67%',
    },
    { metric: 'Click-Through Rate', value: '4.8%', improvement: '+156%' },
    { metric: 'Social Shares', value: '2.3K', improvement: '+234%' },
    { metric: 'Conversion Rate', value: '14.2%', improvement: '+189%' },
  ];

  return (
    <section className='bg-gradient-to-br from-red-50 dark:from-red-900/20 to-orange-50 dark:to-orange-900/20 py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>Video Content Performance</h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Engaging video content that drives views, engagement, and
            conversions
          </p>
        </div>

        {/* Video Types Performance */}
        <div className='gap-6 grid lg:grid-cols-3 mb-12'>
          {videoTypes.map((video, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <div className='flex items-center gap-3 mb-4'>
                <Play className='w-8 h-8 text-red-600' />
                <h3 className='font-bold'>{video.type}</h3>
              </div>

              <div className='space-y-3 mb-4'>
                <div className='flex justify-between'>
                  <span className='text-sm'>Avg. Views:</span>
                  <span className='font-bold text-red-600'>
                    {video.avgViews}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Engagement:</span>
                  <span className='font-bold text-green-600'>
                    {video.engagement}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Conversion:</span>
                  <span className='font-bold text-blue-600'>
                    {video.conversionRate}
                  </span>
                </div>
              </div>

              <div>
                <div className='mb-2 text-gray-600 text-sm'>
                  Best performing on:
                </div>
                <div className='flex gap-2'>
                  {video.platforms.map((platform, idx) => (
                    <span
                      key={idx}
                      className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs'>
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Video Metrics */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {videoMetrics.map((metric, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <div className='mb-2 font-bold text-red-600 text-2xl'>
                {metric.value}
              </div>
              <h3 className='mb-2 font-medium'>{metric.metric}</h3>
              <div className='font-bold text-green-600 text-sm'>
                {metric.improvement}
              </div>
            </div>
          ))}
        </div>

        {/* Video Creation Features */}
        <div className='gap-6 grid md:grid-cols-4'>
          {[
            {
              icon: Play,
              title: 'Custom Animation',
              desc: 'Motion graphics & effects',
            },
            {
              icon: Eye,
              title: 'A/B Testing',
              desc: 'Multiple versions tested',
            },
            {
              icon: Share2,
              title: 'Multi-Platform',
              desc: 'Optimized for each channel',
            },
            {
              icon: TrendingUp,
              title: 'Performance Tracking',
              desc: 'Detailed analytics',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <feature.icon className='mx-auto mb-4 w-12 h-12 text-red-600' />
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

export default VideoPerformanceAnalytics;
