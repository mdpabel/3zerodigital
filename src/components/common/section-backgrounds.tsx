import { cn } from '@/lib/utils';

// Simple, clean background components
export const CleanBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('bg-white dark:bg-[#030712]', className)}>{children}</div>
);

export const SubtleGradientBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('relative bg-white dark:bg-[#030712]', className)}>
    <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 dark:from-blue-950/20 via-purple-50/20 dark:via-purple-950/10 to-teal-50/30 dark:to-teal-950/20' />
    <div className='relative'>{children}</div>
  </div>
);

export const CardBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50',
      className,
    )}>
    {children}
  </div>
);
