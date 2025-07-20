'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from './types';

interface StepperProgressProps {
  currentStep: number;
  steps: Step[];
}

const StepperProgress = ({ currentStep, steps }: StepperProgressProps) => {
  return (
    <div className='bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-slate-100 dark:to-slate-800/50 p-4 md:p-6 border-slate-200 dark:border-slate-700 border-b'>
      <div className='flex justify-between items-center'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex flex-1 items-center'>
            <div className='flex flex-col items-center'>
              <motion.div
                animate={{
                  backgroundColor:
                    currentStep >= step.id
                      ? 'rgb(59 130 246)'
                      : 'rgb(226 232 240)',
                  scale: currentStep === step.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className='relative flex justify-center items-center shadow-lg rounded-full w-8 md:w-10 h-8 md:h-10 font-bold text-white text-xs md:text-sm'>
                {currentStep > step.id ? (
                  <CheckCircle className='w-4 md:w-5 h-4 md:h-5' />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>
              <div className='mt-2 md:mt-3 text-center'>
                <p
                  className={cn(
                    'text-xs font-medium transition-colors',
                    currentStep >= step.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400',
                  )}>
                  {step.name}
                </p>
                <p className='hidden sm:block mt-1 text-slate-400 dark:text-slate-500 text-xs'>
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <motion.div
                animate={{
                  backgroundColor:
                    currentStep > step.id
                      ? 'rgb(59 130 246)'
                      : 'rgb(226 232 240)',
                }}
                transition={{ duration: 0.3 }}
                className='flex-1 bg-slate-200 mx-2 md:mx-4 rounded-full h-1'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;
