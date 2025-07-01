'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const AuthMessage = ({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) => {
  if (!message) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex items-center gap-2 rounded-lg p-3 text-sm font-medium',
        success
          ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800'
          : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
      )}>
      {success ? (
        <CheckCircle2 className='w-4 h-4' />
      ) : (
        <AlertCircle className='w-4 h-4' />
      )}
      <p>{message}</p>
    </motion.div>
  );
};

export const PasswordInputField = ({
  field,
  className,
}: {
  field: any;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        placeholder='Enter your password'
        {...field}
      />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='right-0 absolute inset-y-0 px-3 h-full text-muted-foreground hover:text-foreground'
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}>
        {showPassword ? (
          <EyeOff className='w-4 h-4' />
        ) : (
          <Eye className='w-4 h-4' />
        )}
      </Button>
    </div>
  );
};
