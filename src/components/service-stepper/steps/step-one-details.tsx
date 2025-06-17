// app/components/service-stepper/step-one-details.tsx
'use client';

import {
  Plus,
  Minus,
  Globe,
  FileText,
  Zap,
  Clock,
  CheckCircle,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormData, CustomField } from '../types';
import { URGENCY_OPTIONS } from '../constants';

interface StepOneDetailsProps {
  formData: FormData;
  errors: Record<string, string>;
  siteCount: number;
  allowMultipleSites?: boolean;
  requiresSiteUrl?: boolean;
  requiresDescription?: boolean;
  customFields?: CustomField[];
  onUpdateFormData: (
    field: string,
    value: string | string[], // Allow string array for checkboxes
  ) => void;
  onUpdateSiteCount: (count: number) => void;
}

const StepOneDetails = ({
  formData,
  errors,
  siteCount,
  allowMultipleSites = true,
  requiresSiteUrl = true,
  requiresDescription = true,
  customFields = [],
  onUpdateFormData,
  onUpdateSiteCount,
}: StepOneDetailsProps) => {
  const handleCheckboxChange = (fieldId: string, option: string) => {
    const currentValues = (formData[fieldId] as string[]) || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((item) => item !== option)
      : [...currentValues, option];
    onUpdateFormData(fieldId, newValues);
  };

  const renderCustomField = (field: CustomField) => {
    const fieldValue = formData[field.id];
    const hasError = !!errors[field.id];

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={(fieldValue as string) || ''}
            onChange={(e) => onUpdateFormData(field.id, e.target.value)}
            className={cn(
              'mt-2 min-h-[120px] border-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-500/50',
              hasError && 'border-red-500',
            )}
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            value={(fieldValue as string) || ''}
            onChange={(e) => onUpdateFormData(field.id, e.target.value)}
            className={cn(
              'mt-2 h-12 w-full rounded-lg border-2 border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-800 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-500/50',
              hasError && 'border-red-500',
            )}>
            <option value=''>Select...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div
            className={cn(
              'mt-2 space-y-2 rounded-lg border-2 border-transparent p-1',
              hasError && '!border-red-500',
            )}>
            {field.options?.map((option) => {
              const isChecked = ((fieldValue as string[]) || []).includes(
                option,
              );
              return (
                <Label
                  key={option}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors',
                    isChecked
                      ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50',
                  )}>
                  <input
                    type='checkbox'
                    className='hidden'
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(field.id, option)}
                  />
                  {isChecked ? (
                    <CheckCircle className='w-5 h-5 text-blue-500' />
                  ) : (
                    <Square className='w-5 h-5 text-slate-400' />
                  )}
                  <span className='font-normal text-slate-700 dark:text-slate-300 text-sm'>
                    {option}
                  </span>
                </Label>
              );
            })}
          </div>
        );
      default:
        return (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={(fieldValue as string) || ''}
            onChange={(e) => onUpdateFormData(field.id, e.target.value)}
            className={cn(
              'mt-2 h-12 border-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-500/50',
              hasError && 'border-red-500',
            )}
          />
        );
    }
  };

  return (
    <div className='space-y-4'>
      <div className='text-center'>
        <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
          Service Details
        </h2>
        <p className='mx-auto max-w-xl text-slate-600 dark:text-slate-300 text-sm md:text-base'>
          Provide us with the essential details about your project so we can get
          started.
        </p>
      </div>

      <div className='gap-6 md:gap-8 grid grid-cols-1 lg:grid-cols-3 pt-6'>
        {/* Main Content Column */}
        <div className='space-y-6 lg:col-span-2'>
          {requiresSiteUrl && (
            <div>
              <Label
                htmlFor='siteUrl'
                className='flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base'>
                <Globe className='w-5 h-5 text-blue-500' />
                Website URL *
              </Label>
              <div className='relative mt-2'>
                <Input
                  id='siteUrl'
                  placeholder='https://yoursite.com'
                  value={formData.siteUrl}
                  onChange={(e) => onUpdateFormData('siteUrl', e.target.value)}
                  className={cn(
                    'h-12 border-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-500/50',
                    errors.siteUrl && 'border-red-500',
                  )}
                />
              </div>
              {errors.siteUrl && (
                <p className='mt-1 text-red-500 text-xs md:text-sm'>
                  {errors.siteUrl}
                </p>
              )}
            </div>
          )}

          {requiresDescription && (
            <div>
              <Label
                htmlFor='siteDescription'
                className='flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base'>
                <FileText className='w-5 h-5 text-blue-500' />
                Describe Your Requirements *
              </Label>
              <Textarea
                id='siteDescription'
                placeholder='Please describe your specific needs, any errors you are seeing, or the goals for this service...'
                value={formData.siteDescription}
                onChange={(e) =>
                  onUpdateFormData('siteDescription', e.target.value)
                }
                className={cn(
                  'mt-2 min-h-[160px] border-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-500/50',
                  errors.siteDescription && 'border-red-500',
                )}
              />
              {errors.siteDescription && (
                <p className='mt-1 text-red-500 text-xs md:text-sm'>
                  {errors.siteDescription}
                </p>
              )}
            </div>
          )}

          {customFields.length > 0 && (
            <div className='space-y-6 bg-slate-50/50 dark:bg-slate-800/40 p-4 md:p-6 border border-slate-200/80 dark:border-slate-700/60 rounded-xl'>
              <h3 className='font-semibold text-slate-800 dark:text-slate-200'>
                Additional Information
              </h3>
              <div className='gap-6 grid grid-cols-1 sm:grid-cols-2'>
                {customFields.map((field) => (
                  <div
                    key={field.id}
                    className={
                      field.type === 'checkbox' ? 'sm:col-span-2' : ''
                    }>
                    <Label
                      htmlFor={field.id}
                      className='font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base'>
                      {field.label} {field.required && '*'}
                    </Label>
                    {renderCustomField(field)}
                    {errors[field.id] && (
                      <p className='mt-1 text-red-500 text-xs md:text-sm'>
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Configuration Sidebar */}
        <div className='space-y-6 lg:col-span-1'>
          {allowMultipleSites && (
            <div className='bg-white dark:bg-slate-800/60 p-4 md:p-6 border border-slate-200/80 dark:border-slate-700/60 rounded-xl'>
              <Label className='font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base'>
                Number of Sites
              </Label>
              <div className='flex justify-between items-center gap-4 mt-3'>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => onUpdateSiteCount(Math.max(1, siteCount - 1))}
                  disabled={siteCount <= 1}
                  className='rounded-full w-10 h-10 shrink-0'>
                  <Minus className='w-4 h-4' />
                </Button>
                <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-slate-800 text-transparent dark:text-slate-100 text-2xl md:text-3xl text-center'>
                  {siteCount}
                </span>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => onUpdateSiteCount(siteCount + 1)}
                  className='rounded-full w-10 h-10 shrink-0'>
                  <Plus className='w-4 h-4' />
                </Button>
              </div>
            </div>
          )}

          <div className='bg-white dark:bg-slate-800/60 p-4 md:p-6 border border-slate-200/80 dark:border-slate-700/60 rounded-xl'>
            <Label className='font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base'>
              Urgency Level
            </Label>
            <div className='flex flex-col gap-3 mt-3'>
              {URGENCY_OPTIONS.map((option) => {
                const isSelected = formData.urgencyLevel === option.id;
                const Icon = option.id === 'urgent' ? Zap : Clock;
                return (
                  <button
                    key={option.id}
                    type='button'
                    onClick={() => onUpdateFormData('urgencyLevel', option.id)}
                    className={cn(
                      'group relative flex items-center justify-between rounded-lg border-2 p-3 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                      isSelected
                        ? 'border-blue-500 bg-blue-500/5'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600',
                    )}>
                    <div className='flex items-center gap-3'>
                      <Icon
                        className={cn(
                          'h-5 w-5 transition-colors',
                          isSelected
                            ? 'text-blue-500'
                            : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                        )}
                      />
                      <div>
                        <p className='font-medium text-slate-800 dark:text-slate-100 text-sm md:text-base'>
                          {option.name}
                        </p>
                        <p className='text-slate-500 dark:text-slate-400 text-xs md:text-sm'>
                          {option.desc}
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 group-hover:border-slate-400 dark:border-slate-600',
                      )}>
                      {isSelected && (
                        <CheckCircle className='w-5 h-5 text-white' />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneDetails;
