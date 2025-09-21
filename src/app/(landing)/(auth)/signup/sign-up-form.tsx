'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';

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
import { Checkbox } from '@/components/ui/checkbox';
import ComponentWrapper from '@/components/common/component-wrapper';
import { SignUpFormSchema, SignUpSchema } from '@/lib/validations/auth';
import { AuthMessage, PasswordInputField } from '@/components/common/auth';
import { Spinner } from '@/components/common/spinner';
import { authClient } from '@/lib/auth-client';
import { checkEmailWithUserCheck } from '@/actions/validation';

const SignUpForm = ({
  mode = 'normal',
}: {
  mode?: 'place-order' | 'normal';
}) => {
  const router = useRouter();
  const [{ message, success }, setFormState] = useState({
    success: false,
    message: '',
  });
  const [pending, startTransition] = useTransition();

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: SignUpFormSchema) => {
    if (!values.acceptTerms) {
      form.setError('acceptTerms', { message: 'You must accept the terms.' });
      return;
    }

    startTransition(async () => {
      setFormState({ success: false, message: '' });

      const emailValidate = await checkEmailWithUserCheck(values.email);

      if (!emailValidate.success) {
        setFormState({
          message: emailValidate.message,
          success: emailValidate.success,
        });

        return;
      }

      const name = `${values.firstName} ${values.lastName}`.trim();
      const callbackURL = '/dashboard'; // change if you prefer a different landing page

      const { error } = await authClient.signUp.email({
        name,
        email: values.email,
        password: values.password,
        // image: optional user avatar URL
        callbackURL,
      });

      if (error) {
        setFormState({
          success: false,
          message: error.message ?? 'Sign up failed.',
        });
        return;
      }

      setFormState({
        success: true,
        message: 'Account created. Redirecting…',
      });
      router.push(callbackURL);
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
                  Create Account
                </CardTitle>
                <CardDescription className='text-center'>
                  Get started with your digital transformation
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
                    {/* Name Fields */}
                    <div className='gap-4 grid grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='font-medium text-sm'>
                              First Name
                            </FormLabel>
                            <FormControl>
                              <div className='relative'>
                                <User className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform' />
                                <Input
                                  placeholder='John'
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
                        name='lastName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='font-medium text-sm'>
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Doe'
                                className='h-11'
                                disabled={pending}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
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
                                placeholder='john@example.com'
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

                    {/* Password Fields */}
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

                    <FormField
                      control={form.control}
                      name='confirmPassword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='font-medium text-sm'>
                            Confirm Password
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

                    {/* Terms Checkbox */}
                    <FormField
                      control={form.control}
                      name='acceptTerms'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={pending}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='text-sm'>
                              I agree to the{' '}
                              <Link
                                href='/terms-of-service'
                                className='text-blue-600 hover:underline'>
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link
                                href='/privacy-policy'
                                className='text-blue-600 hover:underline'>
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type='submit'
                      disabled={pending}
                      className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 w-full h-11 font-medium text-white'>
                      {pending ? (
                        <div className='flex items-center gap-2'>
                          <Spinner />
                          <span>Creating account…</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <span>Create Account</span>
                          <ArrowRight className='w-4 h-4' />
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>

              {mode === 'normal' ? (
                <CardFooter className='pt-0'>
                  <div className='w-full text-muted-foreground text-sm text-center'>
                    Already have an account?{' '}
                    <Link
                      href='/login'
                      className='font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400'>
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              ) : null}
            </Card>
          </div>
        </motion.div>
      </div>
    </ComponentWrapper>
  );
};

export default SignUpForm;
