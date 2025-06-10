import { cn } from '@/lib/utils';

interface BackgroundProps {
  variant?: 'base' | 'gradient' | 'minimal';
  className?: string;
  children?: React.ReactNode;
}

export const Background = ({
  variant = 'base',
  className,
  children,
}: BackgroundProps) => {
  const variants = {
    // Just the base color
    base: 'bg-white dark:bg-[#030712]',

    // Hero-style gradient (no animations or decorations)
    gradient: `
      bg-white dark:bg-[#030712]
      before:absolute before:inset-0 
      before:bg-gradient-to-br before:from-blue-50/50 dark:before:from-blue-950/30 
      before:via-purple-50/30 dark:before:via-purple-950/20 
      before:to-teal-50/50 dark:before:to-teal-950/30
      before:pointer-events-none
    `,

    // Very subtle gradient
    minimal: `
      bg-white dark:bg-[#030712]
      before:absolute before:inset-0 
      before:bg-gradient-to-br before:from-blue-50/20 dark:before:from-blue-950/10 
      before:to-purple-50/20 dark:before:to-purple-950/10
      before:pointer-events-none
    `,
  };

  return (
    <div className={cn('relative', variants[variant], className)}>
      {children}
    </div>
  );
};
