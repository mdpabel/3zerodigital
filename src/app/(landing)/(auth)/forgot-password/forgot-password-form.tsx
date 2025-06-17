'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Shield,
  Zap,
  Clock,
  Key,
  Lock,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';

// Schema
const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormSchema = z.infer<typeof ForgotPasswordSchema>;

// Components
const Spinner = ({ className }: { className?: string }) => {
  return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />;
};

const steps = [
  {
    icon: Mail,
    title: 'Enter Email',
    description: 'Provide your registered email address',
  },
  {
    icon: Clock,
    title: 'Check Inbox',
    description: "We'll send reset instructions within minutes",
  },
  {
    icon: Key,
    title: 'Reset Password',
    description: 'Follow the link to create a new password',
  },
];

const ForgotPasswordForm = () => {
  const [{ message, success, submitted }, setFormState] = useState({
    success: false,
    message: '',
    submitted: false,
  });
  const [pending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFormState({
          success: true,
          submitted: true,
          message:
            'Password reset instructions have been sent to your email address.',
        });
      } catch (error) {
        setFormState({
          success: false,
          submitted: false,
          message:
            'An error occurred while processing your request. Please try again.',
        });
      }
    });
  };

  return (
    <ComponentWrapper>
      <div className='mx-auto px-4 py-8 container'>
        <div className='items-center gap-12 grid lg:grid-cols-2 min-h-screen'>
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='hidden md:block space-y-8'>
            {/* Brand Header */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='flex justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl w-12 h-12'>
                  <Zap className='w-6 h-6 text-white' />
                </div>
                <div>
                  <Link
                    href='/'
                    className='font-bold text-gray-900 hover:text-blue-600 dark:text-white text-3xl transition-colors'>
                    3Zero Digital
                  </Link>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Your Digital Success Partner
                  </p>
                </div>
              </div>

              <div className='space-y-2'>
                <h2 className='font-bold text-gray-900 dark:text-white text-4xl leading-tight'>
                  Forgot Your
                  <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent'>
                    {' '}
                    Password?
                  </span>
                </h2>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                  No worries! We'll help you reset it quickly and securely.
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className='space-y-6'>
              <h3 className='font-semibold text-gray-900 dark:text-white text-xl'>
                How it works:
              </h3>
              <div className='space-y-4'>
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className='flex items-start gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 border border-gray-200/50 dark:border-slate-700/50 rounded-xl'>
                    <div className='flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-900/50 rounded-full w-10 h-10'>
                      <step.icon className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900 dark:text-white'>
                        {step.title}
                      </h4>
                      <p className='mt-1 text-gray-600 dark:text-gray-400 text-sm'>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className='bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 rounded-xl'>
              <div className='flex items-center gap-2 mb-2'>
                <Shield className='w-5 h-5 text-green-600 dark:text-green-400' />
                <h4 className='font-semibold text-green-800 dark:text-green-200'>
                  Secure Process
                </h4>
              </div>
              <p className='text-green-700 dark:text-green-300 text-sm'>
                Your password reset link is valid for 24 hours and can only be
                used once for security purposes.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex justify-center'>
            <div className='w-full max-w-md'>
              <Card className='bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-sm border-0'>
                <CardHeader className='space-y-1 pb-6'>
                  <div className='flex justify-center items-center gap-2 mb-4'>
                    <div className='flex justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full w-12 h-12'>
                      <Lock className='w-6 h-6 text-white' />
                    </div>
                  </div>
                  <CardTitle className='font-bold text-2xl text-center'>
                    Reset Password
                  </CardTitle>
                  <CardDescription className='text-center'>
                    {submitted
                      ? 'Check your email for reset instructions'
                      : 'Enter your email to receive reset instructions'}
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6'>
                  {/* Success/Error Messages */}
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'flex items-center gap-2 rounded-lg p-4 text-sm font-medium',
                        success
                          ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800'
                          : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
                      )}>
                      {success ? (
                        <CheckCircle2 className='w-5 h-5' />
                      ) : (
                        <AlertCircle className='w-5 h-5' />
                      )}
                      <p>{message}</p>
                    </motion.div>
                  )}

                  {!submitted ? (
                    <Form {...form}>
                      <form
                        action={async (formData) => {
                          const isValid = await form.trigger();
                          if (isValid) {
                            handleSubmit(formData);
                          }
                        }}
                        className='space-y-6'>
                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='font-medium text-sm'>
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <div className='relative'>
                                  <Mail className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform' />
                                  <Input
                                    placeholder='Enter your email address'
                                    className='!pl-10 h-12'
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type='submit'
                          disabled={pending}
                          className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 w-full h-12 font-medium text-white'>
                          {pending ? (
                            <div className='flex items-center gap-2'>
                              <Spinner />
                              <span>Sending instructions...</span>
                            </div>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <span>Send Reset Instructions</span>
                              <ArrowRight className='w-4 h-4' />
                            </div>
                          )}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <div className='space-y-4 text-center'>
                      <div className='flex justify-center items-center bg-green-100 dark:bg-green-900/50 mx-auto rounded-full w-16 h-16'>
                        <CheckCircle2 className='w-8 h-8 text-green-600 dark:text-green-400' />
                      </div>
                      <div className='space-y-2'>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>
                          Instructions Sent!
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 text-sm'>
                          We've sent password reset instructions to your email
                          address. The link will expire in 24 hours.
                        </p>
                      </div>
                      <Button
                        onClick={() =>
                          setFormState({
                            success: false,
                            message: '',
                            submitted: false,
                          })
                        }
                        variant='outline'
                        className='w-full'>
                        Send Another Email
                      </Button>
                    </div>
                  )}
                </CardContent>

                <CardFooter className='pt-0'>
                  <div className='w-full text-center'>
                    <Link
                      href='/login'
                      className='inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400 text-sm'>
                      <ArrowLeft className='w-4 h-4' />
                      Back to Sign In
                    </Link>
                  </div>
                </CardFooter>
              </Card>

              {/* Additional Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='mt-6 text-center'>
                <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 border border-gray-200/50 dark:border-slate-700/50 rounded-xl'>
                  <p className='mb-2 text-gray-600 dark:text-gray-400 text-sm'>
                    Still having trouble?
                  </p>
                  <Link
                    href='/contact'
                    className='font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400 text-sm'>
                    Contact our support team
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default ForgotPasswordForm;
