import { Skeleton } from '@/components/ui/skeleton';
import ComponentWrapper from '../common/component-wrapper';

const PortfolioSkeleton = () => {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Header Skeleton */}
          <div className='mb-12 md:mb-16 text-center'>
            <div className='mb-6'>
              <Skeleton className='mx-auto mb-6 w-32 h-8' />
            </div>
            <Skeleton className='mx-auto mb-4 w-96 h-12' />
            <Skeleton className='mx-auto w-full max-w-3xl h-6' />
          </div>

          {/* Grid Skeleton */}
          <div className='gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl overflow-hidden'>
                {/* Image Skeleton */}
                <Skeleton className='w-full h-48 md:h-56' />

                {/* Content Skeleton */}
                <div className='p-6'>
                  <Skeleton className='mb-2 w-3/4 h-6' />
                  <Skeleton className='mb-4 w-full h-4' />

                  {/* Features */}
                  <div className='flex gap-2 mb-4'>
                    <Skeleton className='w-20 h-6' />
                    <Skeleton className='w-24 h-6' />
                    <Skeleton className='w-18 h-6' />
                  </div>

                  {/* Bottom */}
                  <div className='flex justify-between items-center pt-4'>
                    <Skeleton className='w-16 h-6' />
                    <Skeleton className='w-24 h-8' />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Skeleton */}
          <div className='mt-12 md:mt-16 text-center'>
            <Skeleton className='mx-auto w-48 h-12' />
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default PortfolioSkeleton;
