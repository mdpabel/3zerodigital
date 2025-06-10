import ServiceHero from '@/components/common/Hero';
import UnderDevelopment from '@/components/common/under-development';
import React from 'react';
import VideoPerformanceAnalytics from './video-performance';

const page = () => {
  return (
    <div>
      <ServiceHero
        title='Video Ads & Reels Creation'
        subtitle='Engaging Video Content'
        description='Engaging video ads and reels designed to capture attention, tell your story, and drive results on social.'
        badge='Video Creation'
        backgroundGradient='from-pink-600/20 via-blue-600/10 to-yellow-600/20 dark:from-pink-900/30 dark:via-blue-900/20 dark:to-yellow-900/30'
        primaryColor='from-pink-600 to-yellow-600'
        secondaryColor='from-blue-500 to-pink-600'
        features={[
          {
            icon: 'Video',
            text: 'Social-Ready',
            description: 'Optimized for all platforms',
            color: 'from-pink-500 to-yellow-600',
          },
          {
            icon: 'PlayCircle',
            text: 'Engaging Content',
            description: 'Capture attention fast',
            color: 'from-blue-500 to-pink-600',
          },
          {
            icon: 'TrendingUp',
            text: 'Drive Results',
            description: 'Boost engagement & sales',
            color: 'from-yellow-500 to-green-600',
          },
        ]}
        stats={[
          { value: '200+', label: 'Videos Created', icon: 'Video' },
          { value: '100%', label: 'Social Ready', icon: 'PlayCircle' },
          { value: '5/5', label: 'Client Rating', icon: 'Smile' },
        ]}
        ctaPrimary={{
          text: 'Get a Video',
          href: '/contact?service=video',
        }}
        ctaSecondary={{
          text: 'See Video Portfolio',
          href: '/portfolio?category=video',
        }}
      />

      <VideoPerformanceAnalytics />
    </div>
  );
};

export default page;
