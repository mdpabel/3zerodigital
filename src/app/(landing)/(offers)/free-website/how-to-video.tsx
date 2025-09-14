'use client';

import ComponentWrapper from '@/components/common/component-wrapper';
import { YouTubeEmbed } from '@next/third-parties/google';

export default function HowToVideo() {
  return (
    <section className='relative mx-auto py-12 md:py-16'>
      <ComponentWrapper>
        <div className='mx-auto px-4 max-w-5xl'>
          {/* Frame */}
          <div className='relative shadow-2xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10'>
            {/* subtle glow */}
            <div className='-z-10 absolute inset-0 bg-gradient-to-br from-blue-500/15 to-fuchsia-500/15 blur-xl rounded-2xl pointer-events-none' />

            <div className='bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden'>
              {/* title bar */}
              <div className='flex items-center gap-3 px-3 md:px-4 py-2 dark:border-white/10 border-b border-black/5'>
                <div className='flex items-center gap-1.5'>
                  <span className='bg-[#ff5f56] rounded-full w-2.5 h-2.5' />
                  <span className='bg-[#ffbd2e] rounded-full w-2.5 h-2.5' />
                  <span className='bg-[#27c93f] rounded-full w-2.5 h-2.5' />
                </div>
                <div className='mx-auto min-w-0 font-medium text-slate-800 dark:text-slate-100 text-sm text-center truncate'>
                  Free Website + Hosting: Step-by-Step Guide
                  <span className='bg-black/5 dark:bg-white/10 ml-2 px-1.5 py-0.5 rounded-md ring-1 ring-black/5 dark:ring-white/10 font-semibold text-[10px] text-slate-700 dark:text-slate-200 tracking-wider'>
                    HD
                  </span>
                </div>
              </div>

              {/* Player: force the <lite-youtube> to fill the frame */}
              <div className='[&>lite-youtube]:block [&>lite-youtube]:absolute relative [&>lite-youtube]:inset-0 [&>lite-youtube]:w-full [&>lite-youtube]:h-full aspect-video'>
                <YouTubeEmbed
                  videoid='ogfYd705cRs'
                  params='rel=0&modestbranding=1&playsinline=1'
                />
              </div>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
}
