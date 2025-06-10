'use client';

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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useActionState, useTransition } from 'react';
import Spinner from '../common/spinner';
import Message from './message';
import { SignUpSchema } from '@/schema/auth/create-user-schema';
import PasswordInputField from './password-field';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Mail,
  User,
  Lock,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ComponentWrapper from '../common/component-wrapper';

type SignUpFormSchema = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const [{ message, success }, action] = useActionState(signUpAction, {
    success: false,
    message: '',
  });
  const [pending, startTransition] = useTransition();

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  return (
    <section className='relative flex items-center py-16 md:py-24 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <UserPlus className='mr-2 w-4 h-4' />
              Join 3Zero Digital
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Create Your Account
              </span>
            </h1>

            <p className='text-slate-600 dark:text-slate-300 text-lg'>
              Join thousands of professionals using our secure platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className='bg-white/70 dark:bg-slate-800/70 shadow-xl backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-3xl overflow-hidden'>
              {/* Background gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-600/5 to-green-500/10 opacity-30 dark:opacity-20' />

              <div className='relative'>
                <CardHeader className='space-y-6 pb-6'>
                  <div className='flex justify-center items-center gap-3'>
                    <div className='bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-3 rounded-xl'>
                      <UserPlus className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <CardTitle className='font-bold text-slate-900 dark:text-white text-2xl'>
                        Sign Up
                      </CardTitle>
                      <CardDescription className='mt-1 text-slate-600 dark:text-slate-400'>
                        Create your secure account
                      </CardDescription>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className='flex flex-wrap justify-center gap-2'>
                    <Badge className='bg-gradient-to-r from-green-600 to-green-700 border-0 text-white text-xs'>
                      0 Data Breaches
                    </Badge>
                    <Badge className='bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white text-xs'>
                      End-to-End Encrypted
                    </Badge>
                    <Badge className='bg-gradient-to-r from-purple-600 to-purple-700 border-0 text-white text-xs'>
                      GDPR Compliant
                    </Badge>
                  </div>
                </CardHeader>

                <Form {...form}>
                  <form
                    action={async (formData) => {
                      const isValid = await form.trigger();
                      if (isValid) {
                        startTransition(() => action(formData));
                      }
                    }}
                    className='space-y-6'>
                    <CardContent className='space-y-6 px-6 md:px-8'>
                      {message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}>
                          <Message
                            type={success ? 'success' : 'error'}
                            message={message}
                          />
                        </motion.div>
                      )}

                      {/* Name Fields */}
                      <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                        <FormField
                          control={form.control}
                          name='firstName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300'>
                                <User className='w-4 h-4' />
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter first name'
                                  className={cn(
                                    'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-700/50',
                                    'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
                                    'backdrop-blur-sm transition-all duration-200',
                                    'h-12 px-4 rounded-xl',
                                  )}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='lastName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300'>
                                <User className='w-4 h-4' />
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter last name'
                                  className={cn(
                                    'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-700/50',
                                    'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
                                    'backdrop-blur-sm transition-all duration-200',
                                    'h-12 px-4 rounded-xl',
                                  )}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300'>
                              <Mail className='w-4 h-4' />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your email'
                                className={cn(
                                  'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-700/50',
                                  'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
                                  'backdrop-blur-sm transition-all duration-200',
                                  'h-12 px-4 rounded-xl',
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Field */}
                      <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300'>
                              <Lock className='w-4 h-4' />
                              Password
                            </FormLabel>
                            <FormControl>
                              <PasswordInputField
                                showPassGen
                                field={field}
                                className={cn(
                                  'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-700/50',
                                  'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
                                  'backdrop-blur-sm transition-all duration-200',
                                  'h-12 px-4 rounded-xl',
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <input type='hidden' name='honeypot' />

                      {/* Security info */}
                      <div className='bg-slate-50/50 dark:bg-slate-900/50 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl'>
                        <div className='flex items-center gap-2 mb-2'>
                          <Shield className='w-4 h-4 text-green-600 dark:text-green-400' />
                          <span className='font-semibold text-slate-900 dark:text-white text-sm'>
                            Your Data is Protected
                          </span>
                        </div>
                        <p className='text-slate-600 dark:text-slate-300 text-xs'>
                          We use enterprise-grade encryption to protect your
                          personal information and never share your data with
                          third parties.
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className='flex flex-col gap-4 px-6 md:px-8 pt-2'>
                      <Button
                        type='submit'
                        disabled={pending}
                        className={cn(
                          'w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
                          'text-white border-0 rounded-xl font-semibold transition-all duration-200',
                          'shadow-lg hover:shadow-xl disabled:opacity-50',
                        )}>
                        {pending ? (
                          <div className='flex items-center gap-2'>
                            <Spinner />
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <div className='flex items-center gap-2'>
                            <span>Create Account</span>
                            <ArrowRight className='w-4 h-4' />
                          </div>
                        )}
                      </Button>

                      <div className='flex flex-col gap-3 w-full'>
                        <div className='text-center'>
                          <span className='text-slate-600 dark:text-slate-400 text-sm'>
                            Already have an account?{' '}
                            <Link
                              href='/login'
                              className='font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors'>
                              Sign In
                            </Link>
                          </span>
                        </div>

                        <div className='text-center'>
                          <p className='text-slate-500 dark:text-slate-400 text-xs'>
                            By creating an account, you agree to our{' '}
                            <Link
                              href='/terms'
                              className='text-blue-600 dark:text-blue-400 hover:underline'>
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                              href='/privacy'
                              className='text-blue-600 dark:text-blue-400 hover:underline'>
                              Privacy Policy
                            </Link>
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </form>
                </Form>
              </div>
            </Card>
          </motion.div>

          {/* Additional security note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-8 text-center'>
            <div className='flex justify-center items-center gap-2 text-slate-500 dark:text-slate-400 text-sm'>
              <Sparkles className='w-4 h-4' />
              <span>Join 10,000+ users trusting 3Zero Digital</span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default SignUpForm;
