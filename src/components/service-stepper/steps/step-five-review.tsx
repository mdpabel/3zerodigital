'use client';

import { CreditCard, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CoreService, AddOnService, FormData } from '../types';

interface StepFiveReviewProps {
  coreService: CoreService;
  addOnServices: AddOnService[];
  selectedAddOns: string[];
  formData: FormData;
  siteCount: number;
  allowMultipleSites?: boolean;
  requiresSiteUrl?: boolean;
  onProceedToPayment: () => void;
}

const StepFiveReview = ({
  coreService,
  addOnServices,
  selectedAddOns,
  formData,
  siteCount,
  allowMultipleSites = true,
  requiresSiteUrl = true,
  onProceedToPayment,
}: StepFiveReviewProps) => {
  const calculateSubtotal = () => {
    const serviceTotal = coreService.price * siteCount;
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find((service) => service.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return serviceTotal + addOnTotal;
  };

  const calculateSavings = () => {
    if (!coreService.originalPrice) return 0;
    return (coreService.originalPrice - coreService.price) * siteCount;
  };

  const selectedAddOnServices = selectedAddOns
    .map((id) => addOnServices.find((service) => service.id === id))
    .filter(Boolean) as AddOnService[];

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='text-center'>
        <h2 className='mb-3 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
          Review Your Order
        </h2>
        <p className='text-slate-600 dark:text-slate-300 text-sm md:text-base'>
          Please review your order details before payment
        </p>
      </div>

      <div className='gap-6 md:gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto max-w-6xl'>
        {/* Order Details */}
        <div className='space-y-4 md:space-y-6 lg:col-span-2'>
          {/* Service Details */}
          <div className='bg-white dark:bg-slate-800/50 p-4 md:p-6 border border-slate-200 dark:border-slate-700 rounded-xl'>
            <h3 className='mb-4 font-semibold text-slate-900 dark:text-white text-sm md:text-base'>
              Service Details
            </h3>
            <div className='space-y-2 md:space-y-3 text-sm md:text-base'>
              {requiresSiteUrl && (
                <div className='flex justify-between items-center'>
                  <span className='text-slate-600 dark:text-slate-300'>
                    Website
                  </span>
                  <span className='font-medium break-all'>
                    {formData.siteUrl}
                  </span>
                </div>
              )}
              {allowMultipleSites && (
                <div className='flex justify-between items-center'>
                  <span className='text-slate-600 dark:text-slate-300'>
                    Sites
                  </span>
                  <span className='font-medium'>{siteCount}</span>
                </div>
              )}
              <div className='flex justify-between items-center'>
                <span className='text-slate-600 dark:text-slate-300'>
                  Urgency
                </span>
                <Badge
                  variant={
                    formData.urgencyLevel === 'urgent'
                      ? 'destructive'
                      : 'secondary'
                  }>
                  {formData.urgencyLevel === 'urgent' ? 'Urgent' : 'Normal'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className='bg-white dark:bg-slate-800/50 p-4 md:p-6 border border-slate-200 dark:border-slate-700 rounded-xl'>
            <h3 className='mb-4 font-semibold text-slate-900 dark:text-white text-sm md:text-base'>
              Account Information
            </h3>
            <div className='space-y-1 md:space-y-2 text-sm md:text-base'>
              <p className='text-slate-600 dark:text-slate-300'>
                {formData.firstName} {formData.lastName}
              </p>
              <p className='text-slate-600 dark:text-slate-300'>
                {formData.email}
              </p>
              {formData.phone && (
                <p className='text-slate-600 dark:text-slate-300'>
                  {formData.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='bg-gradient-to-br from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-4 md:p-6 border border-blue-200 dark:border-blue-800 rounded-xl'>
          <h3 className='mb-4 md:mb-6 font-semibold text-slate-900 dark:text-white text-sm md:text-base'>
            Order Summary
          </h3>

          <div className='space-y-3 md:space-y-4'>
            <div className='flex justify-between items-center text-sm md:text-base'>
              <span className='text-slate-600 dark:text-slate-300'>
                {coreService.name}{' '}
                {allowMultipleSites && siteCount > 1 && `× ${siteCount}`}
              </span>
              <span className='font-semibold'>
                ${coreService.price * siteCount}
              </span>
            </div>

            {selectedAddOnServices.map((addOn) => (
              <div
                key={addOn.id}
                className='flex justify-between items-center text-sm md:text-base'>
                <span className='text-slate-600 dark:text-slate-300'>
                  {addOn.name}
                </span>
                <span className='font-semibold'>+${addOn.price}</span>
              </div>
            ))}

            {calculateSavings() > 0 && (
              <div className='flex justify-between items-center text-green-600 text-sm md:text-base'>
                <span>Savings</span>
                <span className='font-semibold'>-${calculateSavings()}</span>
              </div>
            )}
          </div>

          <div className='bg-slate-200 dark:bg-slate-700 my-4 md:my-6 h-px' />

          <div className='flex justify-between items-center mb-4 md:mb-6'>
            <span className='font-bold text-slate-900 dark:text-white text-lg md:text-xl'>
              Total
            </span>
            <span className='font-bold text-2xl md:text-3xl'>
              <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                ${calculateSubtotal()}
              </span>
            </span>
          </div>

          <Button
            onClick={onProceedToPayment}
            size='lg'
            className='bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg w-full h-12 md:h-14 text-white text-sm md:text-base'>
            <CreditCard className='mr-2 w-4 md:w-5 h-4 md:h-5' />
            Proceed to Payment
          </Button>

          {/* Security Badges */}
          <div className='flex sm:flex-row flex-col justify-center items-center gap-2 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-slate-200 dark:border-slate-700 border-t'>
            <div className='flex items-center gap-2'>
              <Lock className='w-3 md:w-4 h-3 md:h-4 text-green-600' />
              <span className='text-green-600 text-xs'>SSL Secured</span>
            </div>
            <div className='flex items-center gap-2'>
              <Shield className='w-3 md:w-4 h-3 md:h-4 text-blue-600' />
              <span className='text-blue-600 text-xs'>
                Money Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFiveReview;
