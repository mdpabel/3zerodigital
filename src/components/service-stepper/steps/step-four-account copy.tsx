'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormData } from '../types';

interface StepFourAccountProps {
  formData: FormData;
  errors: Record<string, string>;
  authMode: 'signup' | 'login';
  userExists: boolean | null;
  onUpdateFormData: (field: string, value: string) => void;
  onEmailBlur: () => void;
  onToggleAuthMode: () => void;
}

const StepFourAccount = ({
  formData,
  errors,
  authMode,
  userExists,
  onUpdateFormData,
  onEmailBlur,
  onToggleAuthMode,
}: StepFourAccountProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='text-center'>
        <h2 className='mb-3 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
          {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className='text-slate-600 dark:text-slate-300 text-sm md:text-base'>
          {authMode === 'signup'
            ? 'Create an account to track your order and access support'
            : 'Login to your existing account to continue'}
        </p>
      </div>

      <div className='mx-auto max-w-lg'>
        <div className='space-y-4 md:space-y-6'>
          {/* Name Fields (only for signup) */}
          {authMode === 'signup' && (
            <div className='gap-4 grid grid-cols-2'>
              <div>
                <Label
                  htmlFor='firstName'
                  className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
                  First Name *
                </Label>
                <Input
                  id='firstName'
                  value={formData.firstName}
                  onChange={(e) =>
                    onUpdateFormData('firstName', e.target.value)
                  }
                  className={cn(
                    'mt-2 h-12 border-2 text-sm md:text-base',
                    errors.firstName && 'border-red-500',
                  )}
                />
                {errors.firstName && (
                  <p className='mt-1 text-red-500 text-xs'>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor='lastName'
                  className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
                  Last Name *
                </Label>
                <Input
                  id='lastName'
                  value={formData.lastName}
                  onChange={(e) => onUpdateFormData('lastName', e.target.value)}
                  className={cn(
                    'mt-2 h-12 border-2 text-sm md:text-base',
                    errors.lastName && 'border-red-500',
                  )}
                />
                {errors.lastName && (
                  <p className='mt-1 text-red-500 text-xs'>{errors.lastName}</p>
                )}
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <Label
              htmlFor='email'
              className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
              Email Address *
            </Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => onUpdateFormData('email', e.target.value)}
              onBlur={onEmailBlur}
              className={cn(
                'mt-2 h-12 border-2 text-sm md:text-base',
                errors.email && 'border-red-500',
              )}
            />
            {errors.email && (
              <p className='mt-1 text-red-500 text-xs'>{errors.email}</p>
            )}
            {userExists !== null && (
              <p className='mt-1 text-blue-600 text-xs'>
                {userExists
                  ? 'Account found! Please login.'
                  : 'New account will be created.'}
              </p>
            )}
          </div>

          {/* Phone (only for signup) */}
          {authMode === 'signup' && (
            <div>
              <Label
                htmlFor='phone'
                className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
                Phone Number
              </Label>
              <Input
                id='phone'
                type='tel'
                value={formData.phone}
                onChange={(e) => onUpdateFormData('phone', e.target.value)}
                className='mt-2 border-2 h-12 text-sm md:text-base'
              />
            </div>
          )}

          {/* Password */}
          <div>
            <Label
              htmlFor='password'
              className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
              Password *
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => onUpdateFormData('password', e.target.value)}
                className={cn(
                  'mt-2 h-12 border-2 pr-12 text-sm md:text-base',
                  errors.password && 'border-red-500',
                )}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='top-1/2 right-3 absolute text-slate-500 hover:text-slate-700 -translate-y-1/2'>
                {showPassword ? (
                  <EyeOff className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 text-red-500 text-xs'>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password (only for signup) */}
          {authMode === 'signup' && (
            <div>
              <Label
                htmlFor='confirmPassword'
                className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
                Confirm Password *
              </Label>
              <Input
                id='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={(e) =>
                  onUpdateFormData('confirmPassword', e.target.value)
                }
                className={cn(
                  'mt-2 h-12 border-2 text-sm md:text-base',
                  errors.confirmPassword && 'border-red-500',
                )}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-red-500 text-xs'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Auth Mode Toggle */}
          <div className='text-center'>
            <button
              type='button'
              onClick={onToggleAuthMode}
              className='text-blue-600 hover:text-blue-800 text-sm underline'>
              {authMode === 'signup'
                ? 'Already have an account? Login'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFourAccount;
