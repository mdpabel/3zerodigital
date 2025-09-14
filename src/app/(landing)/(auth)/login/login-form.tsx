'use client';

import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import ComponentWrapper from '@/components/common/component-wrapper';
import { LoginFormSchema, LoginSchema } from '@/lib/validations/auth';
import { AuthMessage, PasswordInputField } from '@/components/common/auth';
import { Spinner } from '@/components/common/spinner';
import { authClient } from '@/lib/auth-client';

type Props = { mode?: 'place-order' | 'normal' };

const LoginForm = ({ mode = 'normal' }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [{ message, success }, setFormState] = useState({
    success: false,
    message: '',
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const onSubmit = (values: LoginFormSchema) => {
    startTransition(async () => {
      setFormState({ success: false, message: '' });

      const { error } = await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          rememberMe: true,
          callbackURL: callbackUrl,
        },
        {
          onRequest: () => {
            // optional: set UI state, analytics, etc.
          },
          onSuccess: () => {
            setFormState({
              success: true,
              message: 'Signed in successfully. Redirecting…',
            });
            router.push(callbackUrl);
          },
          onError: (ctx) => {
            setFormState({
              success: false,
              message: ctx.error.message ?? 'Sign-in failed.',
            });
          },
        },
      );

      // If no onError was triggered but error exists, surface it.
      if (error) {
        setFormState({
          success: false,
          message: error.message ?? 'Sign-in failed.',
        });
      }
    });
  };

  return (
    <ComponentWrapper>
      <div className='mx-auto px-4 py-8 container'>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex justify-center'>
          <div className='w-full max-w-[500px]'>
            <Card className='bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-sm border-0'>
              <CardHeader className='space-y-1 pb-4'>
                <CardTitle className='font-bold text-2xl text-center'>
                  Sign In
                </CardTitle>
                <CardDescription className='text-center'>
                  Use your email and password
                </CardDescription>
              </CardHeader>

              <CardContent className='space-y-4'>
                {/* Success/Error Messages */}
                <AuthMessage message={message} success={success} />

                {/* Email/Password Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='font-medium text-sm'>
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Mail className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform' />
                              <Input
                                placeholder='Enter your email'
                                className='!pl-10 h-11'
                                disabled={pending}
                                {...field}
                              />
                            </div>
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
                          <FormLabel className='font-medium text-sm'>
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Lock className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform' />
                              <PasswordInputField
                                field={field}
                                className='!pl-10 h-11'
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
                      className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 w-full h-11 font-medium text-white'>
                      {pending ? (
                        <span className='flex items-center gap-2'>
                          <Spinner />
                          <span>Signing in…</span>
                        </span>
                      ) : (
                        <span className='flex items-center gap-2'>
                          <span>Sign In</span>
                          <ArrowRight className='w-4 h-4' />
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>

              <CardFooter className='flex flex-col space-y-4 pt-0'>
                <div className='text-sm text-center'>
                  <Link
                    href='/forgot-password'
                    className='font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400'>
                    Forgot your password?
                  </Link>
                </div>

                <Separator />

                {/* Hide signup CTA in place-order mode */}
                {mode === 'normal' ? (
                  <div className='text-muted-foreground text-sm text-center'>
                    Don&apos;t have an account?{' '}
                    <Link
                      href='/signup'
                      className='font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400'>
                      Sign up
                    </Link>
                  </div>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </ComponentWrapper>
  );
};

export default LoginForm;
