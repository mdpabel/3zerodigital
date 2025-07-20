'use client';

import { Shield, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CoreService } from '../types';

interface StepTwoCoreServiceProps {
  coreService: CoreService;
  siteCount: number;
  allowMultipleSites?: boolean;
  guarantees: string[];
}

const StepTwoCoreService = ({
  coreService,
  siteCount,
  allowMultipleSites = true,
  guarantees = [],
}: StepTwoCoreServiceProps) => {
  const calculateSavings = () => {
    if (!coreService.originalPrice) return 0;
    return (coreService.originalPrice - coreService.price) * siteCount;
  };

  console.log(coreService.features);

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='text-center'>
        <h2 className='mb-3 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
          Your Service Package
        </h2>
        <p className='text-slate-600 dark:text-slate-300 text-sm md:text-base'>
          Professional service with guarantee
        </p>
      </div>

      <div className='mx-auto max-w-4xl'>
        <div className='relative bg-gradient-to-br from-blue-50 dark:from-blue-950/30 to-purple-50 dark:to-purple-950/30 p-6 md:p-8 border-2 border-blue-200 dark:border-blue-800 rounded-2xl'>
          <div className='gap-6 md:gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Service Info */}
            <div className='lg:text-left text-center'>
              <div className='inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-2xl w-12 md:w-16 h-12 md:h-16'>
                <Shield className='w-6 md:w-8 h-6 md:h-8 text-white' />
              </div>
              <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-lg md:text-xl'>
                {coreService.name}
              </h3>
              <div className='flex lg:flex-col items-center lg:items-start gap-2'>
                <span className='font-bold text-2xl md:text-3xl'>
                  <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                    ${coreService.price}
                  </span>
                </span>
                {allowMultipleSites && siteCount > 1 && (
                  <span className='text-slate-500 text-sm'>
                    × {siteCount} = ${coreService.price * siteCount}
                  </span>
                )}
                {coreService.originalPrice && (
                  <span className='text-slate-500 dark:text-slate-400 text-sm line-through'>
                    ${coreService.originalPrice}
                  </span>
                )}
              </div>
              {calculateSavings() > 0 && (
                <Badge className='bg-green-100 dark:bg-green-900/20 mt-2 text-green-800 dark:text-green-300'>
                  Save ${calculateSavings()}
                </Badge>
              )}
            </div>

            {/* Features */}
            <div className='lg:col-span-2'>
              <h4 className='mb-4 font-semibold text-slate-900 dark:text-white text-sm md:text-base'>
                What's Included
              </h4>
              <div className='gap-2 md:gap-3 grid grid-cols-1 sm:grid-cols-2'>
                {coreService.features?.map((feature, idx) => (
                  <div key={idx} className='flex items-start gap-2 md:gap-3'>
                    <CheckCircle className='flex-shrink-0 mt-0.5 w-4 md:w-5 h-4 md:h-5 text-green-600' />
                    <span className='text-slate-600 dark:text-gray-200 text-xs md:text-sm'>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Service Times */}
              {/* <div className='flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-6'>
                <div className='text-center'>
                  <div className='text-slate-500 text-xs'>Response</div>
                  <div className='font-bold text-slate-900 dark:text-white text-sm'>
                    {coreService.responseTime}
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-slate-500 text-xs'>Completion</div>
                  <div className='font-bold text-slate-900 dark:text-white text-sm'>
                    {coreService.completionTime}
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Guarantees */}
          <div className='bg-green-50/50 dark:bg-green-950/20 mt-6 p-3 md:p-4 border border-green-200/50 dark:border-green-800/30 rounded-lg'>
            <h4 className='mb-2 font-semibold text-green-800 dark:text-green-300 text-sm'>
              Our Guarantee
            </h4>
            <div className='flex flex-wrap gap-3 md:gap-4'>
              {guarantees.map((guarantee, idx) => (
                <div key={idx} className='flex items-center gap-2'>
                  <Shield className='w-3 h-3 text-green-600' />
                  <span className='text-green-700 dark:text-green-300 text-xs'>
                    {guarantee}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwoCoreService;
