'use client';

import { CheckCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AddOnService } from '../types';

interface StepThreeAddonsProps {
  addOnServices: AddOnService[];
  selectedAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
}

const StepThreeAddons = ({
  addOnServices,
  selectedAddOns,
  onToggleAddOn,
}: StepThreeAddonsProps) => {
  const selectedAddOnServices = selectedAddOns
    .map((id) => addOnServices.find((service) => service.id === id))
    .filter(Boolean) as AddOnService[];

  if (addOnServices.length === 0) {
    return (
      <div className='space-y-6 md:space-y-8'>
        <div className='text-center'>
          <h2 className='mb-3 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
            Enhance Your Service
          </h2>
          <p className='text-slate-600 dark:text-slate-300 text-sm md:text-base'>
            Optional add-on services to maximize protection
          </p>
        </div>

        <div className='py-8 md:py-12 text-center'>
          <div className='flex justify-center items-center bg-slate-100 dark:bg-slate-800 mx-auto mb-4 rounded-full w-16 h-16'>
            <CheckCircle className='w-8 h-8 text-green-600' />
          </div>
          <h3 className='mb-2 font-semibold text-slate-900 dark:text-white'>
            No Add-ons Available
          </h3>
          <p className='text-slate-600 dark:text-slate-300 text-sm'>
            Your core service includes everything you need.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='text-center'>
        <h2 className='mb-3 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
          Enhance Your Service
        </h2>
        <p className='text-slate-600 dark:text-slate-300 text-sm md:text-base'>
          Optional add-on services to maximize protection
        </p>
      </div>

      <div className='gap-4 md:gap-6 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-6xl'>
        {addOnServices.map((service) => (
          <div
            key={service.id}
            onClick={() => onToggleAddOn(service.id)}
            className={cn(
              'relative cursor-pointer p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-300 group hover:scale-[1.01]',
              selectedAddOns.includes(service.id)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:shadow-md',
            )}>
            {/* Badges */}
            {service.popular && (
              <div className='top-0 right-3 md:right-4 absolute -translate-y-1/2'>
                <Badge className='bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs'>
                  Popular
                </Badge>
              </div>
            )}
            {service.urgent && (
              <div className='top-0 right-3 md:right-4 absolute -translate-y-1/2'>
                <Badge className='bg-red-500 text-white text-xs animate-pulse'>
                  <Zap className='mr-1 w-2 h-2' />
                  Urgent
                </Badge>
              </div>
            )}

            {/* Content */}
            <div className='flex justify-between items-start mb-3 md:mb-4'>
              <div className='flex items-center gap-2 md:gap-3'>
                <div
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    selectedAddOns.includes(service.id)
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-slate-100 dark:bg-slate-800',
                  )}>
                  <service.icon
                    className={cn(
                      'w-5 md:w-6 h-5 md:h-6 transition-colors',
                      selectedAddOns.includes(service.id)
                        ? 'text-blue-600'
                        : 'text-slate-600',
                    )}
                  />
                </div>
                <div>
                  <h4 className='font-bold text-slate-900 dark:text-white text-sm md:text-base'>
                    {service.name}
                  </h4>
                  <p className='font-bold text-blue-600 text-base md:text-lg'>
                    +${service.price}
                  </p>
                </div>
              </div>

              {selectedAddOns.includes(service.id) && (
                <div className='bg-blue-600 p-1 rounded-full'>
                  <CheckCircle className='w-3 md:w-4 h-3 md:h-4 text-white' />
                </div>
              )}
            </div>

            <p className='mb-3 md:mb-4 text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed'>
              {service.description}
            </p>

            {/* Features */}
            <div className='space-y-1 md:space-y-2'>
              {service.features.map((feature, idx) => (
                <div key={idx} className='flex items-center gap-2'>
                  <CheckCircle className='flex-shrink-0 w-3 h-3 text-green-500' />
                  <span className='text-slate-600 dark:text-slate-300 text-xs'>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Summary */}
      {selectedAddOns.length > 0 && (
        <div className='bg-blue-50 dark:bg-blue-950/20 mx-auto p-4 md:p-6 border border-blue-200 dark:border-blue-800 rounded-xl max-w-2xl'>
          <h4 className='mb-3 font-semibold text-blue-900 dark:text-blue-100 text-sm md:text-base'>
            Selected Add-ons ({selectedAddOns.length})
          </h4>
          <div className='space-y-2'>
            {selectedAddOnServices.map((addOn) => (
              <div key={addOn.id} className='flex justify-between items-center'>
                <span className='text-blue-800 dark:text-blue-200 text-xs md:text-sm'>
                  {addOn.name}
                </span>
                <span className='font-semibold text-blue-900 dark:text-blue-100 text-sm'>
                  +${addOn.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepThreeAddons;
