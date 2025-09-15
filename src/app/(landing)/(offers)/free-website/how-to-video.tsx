'use client';

import ComponentWrapper from '@/components/common/component-wrapper';
import { YouTubeEmbed } from '@next/third-parties/google';

export default function HowToVideo() {
  return (
    <section className='py-8 sm:py-10'>
      <ComponentWrapper>
        <YouTubeEmbed
          style='margin: auto'
          videoid='ogfYd705cRs'
          params='controls=0'
        />
      </ComponentWrapper>
    </section>
  );
}
