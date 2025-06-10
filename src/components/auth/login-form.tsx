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
import { useActionState, useEffect, useTransition } from 'react';
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
import Message from './message';
import Spinner from '../common/spinner';
import { LoginSchema } from '@/schema/auth/login-schmea';
import { useRouter, useSearchParams } from 'next/navigation';
import PasswordInputField from './password-field';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import ComponentWrapper from '../common/component-wrapper';
import { loginAction } from '@/actions/auth-actions';

type LoginFormSchema = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [{ message, success }, action] = useActionState(loginAction, {
    success: false,
    message: '',
  });
  const [pending, startTransition] = useTransition();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  useEffect(() => {
    if (success && message) {
      router.push(callbackUrl);
      session.update();
    }
  }, [message, success, router, callbackUrl, session]);

  return (
    <section className='relative flex items-center py-16 md:py-24 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-lg container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Shield className='mr-2 w-4 h-4' />
              Secure Login
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Welcome Back
              </span>
            </h1>

            <p className='text-slate-600 dark:text-slate-300 text-lg'>
              Sign in to your 3Zero Digital account
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className='bg-white/70 dark:bg-slate-800/70 shadow-xl backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-3xl overflow-hidden'>
              {/* Background gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-purple-500/10 opacity-30 dark:opacity-20' />

              <div className='relative'>
                <CardHeader className='space-y-6 pb-6'>
                  <div className='flex justify-center items-center gap-3'>
                    <div className='bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg p-3 rounded-xl'>
                      <Lock className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <CardTitle className='font-bold text-slate-900 dark:text-white text-2xl'>
                        Sign In
                      </CardTitle>
                      <CardDescription className='mt-1 text-slate-600 dark:text-slate-400'>
                        Access your secure dashboard
                      </CardDescription>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className='flex flex-wrap justify-center gap-2'>
                    <Badge className='bg-gradient-to-r from-green-600 to-green-700 border-0 text-white text-xs'>
                      0 Security Issues
                    </Badge>
                    <Badge className='bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white text-xs'>
                      Encrypted Connection
                    </Badge>
                    <Badge className='bg-gradient-to-r from-purple-600 to-purple-700 border-0 text-white text-xs'>
                      2FA Protected
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
                    <input
                      type='hidden'
                      name='callbackUrl'
                      value={callbackUrl}
                    />

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
                              <div className='relative'>
                                <PasswordInputField
                                  field={field}
                                  className={cn(
                                    'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-700/50',
                                    'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
                                    'backdrop-blur-sm transition-all duration-200',
                                    'h-12 px-4 rounded-xl',
                                  )}
                                />
                              </div>
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
                            Secure Authentication
                          </span>
                        </div>
                        <p className='text-slate-600 dark:text-slate-300 text-xs'>
                          Your login is protected with enterprise-grade security
                          protocols.
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className='flex flex-col gap-4 px-6 md:px-8 pt-2'>
                      <Button
                        type='submit'
                        disabled={pending}
                        className={cn(
                          'w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
                          'text-white border-0 rounded-xl font-semibold transition-all duration-200',
                          'shadow-lg hover:shadow-xl disabled:opacity-50',
                        )}>
                        {pending ? (
                          <div className='flex items-center gap-2'>
                            <Spinner />
                            <span>Signing In...</span>
                          </div>
                        ) : (
                          <div className='flex items-center gap-2'>
                            <span>Sign In</span>
                            <ArrowRight className='w-4 h-4' />
                          </div>
                        )}
                      </Button>

                      <div className='flex flex-col gap-3 w-full'>
                        <div className='text-center'>
                          <span className='text-slate-600 dark:text-slate-400 text-sm'>
                            Don't have an account?{' '}
                            <Link
                              href='/signup'
                              className='font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors'>
                              Create Account
                            </Link>
                          </span>
                        </div>

                        <div className='text-center'>
                          <Link
                            href='/reset-password'
                            className='font-medium text-blue-600 dark:text-blue-400 text-sm hover:underline transition-colors'>
                            Forgot your password?
                          </Link>
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
              <span>Protected by 3Zero Digital Security</span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default LoginForm;
