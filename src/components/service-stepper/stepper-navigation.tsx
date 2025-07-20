'use client';

import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StepperNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  isNextDisabled?: boolean;
}

const StepperNavigation = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onComplete,
  isNextDisabled = false,
}: StepperNavigationProps) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className='flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-4 md:p-6 border-slate-200 dark:border-slate-700 border-t'>
      <Button
        variant='outline'
        onClick={onBack}
        disabled={currentStep === 1}
        className={cn(
          'h-10 md:h-12 px-4 md:px-6 text-white text-sm md:text-base',
          currentStep === 1 && 'invisible',
        )}>
        <ArrowLeft className='mr-2 w-3 md:w-4 h-3 md:h-4' />
        Back
      </Button>

      <div className='flex items-center gap-3 md:gap-4'>
        <span className='text-slate-500 text-xs md:text-sm'>
          Step {currentStep} of {totalSteps}
        </span>

        {!isLastStep ? (
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className='px-4 md:px-6 h-10 md:h-12 text-sm md:text-base'>
            Next Step
            <ArrowRight className='ml-2 w-3 md:w-4 h-3 md:h-4' />
          </Button>
        ) : (
          <Button
            onClick={onComplete}
            size='lg'
            className='bg-gradient-to-r from-red-600 to-orange-600 shadow-lg px-6 md:px-8 h-10 md:h-12 text-white text-sm md:text-base'>
            <AlertTriangle className='mr-2 w-4 md:w-5 h-4 md:h-5' />
            Complete Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepperNavigation;
