'use client';

import { motion } from 'framer-motion';
import { Globe, Server, MapPin, Gift } from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';

type FreePerksBadgeProps = {
  className?: string;
};

export default function FreePerksBadge({ className }: FreePerksBadgeProps) {
  return (
    <ComponentWrapper className={cn('pt-2', className)}>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className='flex justify-center'>
        <div
          className='group inline-flex items-center gap-3 bg-white/75 dark:bg-slate-900/70 shadow-sm backdrop-blur px-3 py-2 border border-blue-500/25 dark:border-blue-400/20 rounded-full text-sm'
          aria-label='Free perks'>
          <Gift className='w-4 h-4 text-blue-600 dark:text-blue-400' />
          <span className='font-medium text-slate-900 dark:text-white'>
            All free:
          </span>

          <span
            className='hidden sm:block bg-slate-300/70 dark:bg-slate-700/70 w-px h-4'
            aria-hidden
          />

          <div className='flex flex-wrap items-center gap-2'>
            <Pill icon={Globe} label='Website' />
            <Pill icon={Server} label='Hosting' />
            <Pill icon={MapPin} label='Google Maps Scraper' />
          </div>
        </div>
      </motion.div>
    </ComponentWrapper>
  );
}

function Pill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className='inline-flex items-center gap-1.5 bg-blue-50/80 dark:bg-blue-500/10 px-2.5 py-1 rounded-full ring-1 ring-blue-200/60 dark:ring-blue-400/30 ring-inset text-blue-700 dark:text-blue-200'>
      <Icon className='w-3.5 h-3.5' />
      <span className='whitespace-nowrap'>{label}</span>
      <span
        className='inline-flex bg-emerald-500 ml-1 rounded-full w-1.5 h-1.5'
        aria-label='free'
      />
    </span>
  );
}
