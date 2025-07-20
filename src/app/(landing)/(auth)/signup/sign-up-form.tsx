'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Github,
  Loader2,
  Lock,
  Mail,
  User,
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
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import { FaGoogle } from 'react-icons/fa';
import { SignUpFormSchema, SignUpSchema } from '@/lib/validations/auth';
import { signUpAction } from '@/actions/auth-actions';
import { AuthMessage, PasswordInputField } from '@/components/common/auth';
import { Spinner } from '@/components/common/spinner';

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

  const handleSubmit = (formData: FormData) => {
    formData.append(
      'acceptTerms',
      form.getValues('acceptTerms') ? 'true' : 'false',
    );

    startTransition(async () => {
      try {
        const result = await signUpAction(formData);

        if (!result.success && result.errors) {
          result.errors.forEach((error) => {
            form.setError(error.field as keyof SignUpFormSchema, {
              message: error.message,
            });
          });
        }

        setFormState({
          success: result.success,
          message: result.message,
        });

        if (result.success) {
          // Redirect to dashboard or another page
          setTimeout(() => {
            router.push('/');
          }, 300);
        }
      } catch (error) {
        setFormState({
          success: false,
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    });
  };

  const handleSocialSignup = (provider: 'google' | 'github') => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormState({
        success: true,
        message: `Account created with ${provider}. Redirecting...`,
      });
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
                {/* Social Signup Buttons */}
                <div className='space-y-3'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => handleSocialSignup('google')}
                    disabled={pending}
                    className='bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700 w-full h-11'>
                    <FaGoogle className='mr-3 w-5 h-5' />
                    Sign up with Google
                  </Button>

                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => handleSocialSignup('github')}
                    disabled={pending}
                    className='bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700 w-full h-11'>
                    <Github className='mr-3 w-5 h-5' />
                    Sign up with GitHub
                  </Button>
                </div>

                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <Separator className='w-full' />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                      Or create account with email
                    </span>
                  </div>
                </div>

                {/* Success/Error Messages */}
                <AuthMessage message={message} success={success} />

                {/* Email/Password Form */}
                <Form {...form}>
                  <form
                    action={async (formData) => {
                      const isValid = await form.trigger();
                      if (isValid) {
                        handleSubmit(formData);
                      }
                    }}
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
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='text-sm'>
                              I agree to the{' '}
                              <Link
                                href='/terms'
                                className='text-blue-600 hover:underline'>
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link
                                href='/privacy'
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
                          <span>Creating account...</span>
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
