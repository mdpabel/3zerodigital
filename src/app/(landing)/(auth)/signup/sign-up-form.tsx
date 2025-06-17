'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
  Shield,
  Zap,
  User,
  Building,
  Phone,
  Check,
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
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import { FaGoogle } from 'react-icons/fa';

// Schema
const SignUpSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormSchema = z.infer<typeof SignUpSchema>;

// Components (reuse from login)
const Spinner = ({ className }: { className?: string }) => {
  return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />;
};

const PasswordInputField = ({
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

const features = [
  'Access to comprehensive digital services',
  'Dedicated project management dashboard',
  'Real-time progress tracking',
  'Priority customer support',
  'Free consultation and strategy sessions',
  'Secure file sharing and collaboration',
];

const SignUpForm = () => {
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
      phone: '',
      company: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFormState({
          success: true,
          message:
            'Account created successfully! Please check your email to verify your account.',
        });

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error) {
        setFormState({
          success: false,
          message:
            'An error occurred while creating your account. Please try again.',
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
        <div className='items-start gap-12 grid lg:grid-cols-2 min-h-screen'>
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='hidden md:block lg:top-8 lg:sticky space-y-8'>
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
                  Join Thousands of
                  <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent'>
                    {' '}
                    Successful Businesses
                  </span>
                </h2>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                  Start your digital transformation journey today with our
                  comprehensive suite of services.
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className='space-y-4'>
              <h3 className='font-semibold text-gray-900 dark:text-white text-xl'>
                What you'll get:
              </h3>
              <div className='space-y-3'>
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className='flex items-center gap-3'>
                    <div className='flex justify-center items-center bg-green-100 dark:bg-green-900/50 rounded-full w-6 h-6'>
                      <Check className='w-3 h-3 text-green-600 dark:text-green-400' />
                    </div>
                    <span className='text-gray-700 dark:text-gray-300'>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 border border-gray-200/50 dark:border-slate-700/50 rounded-xl'>
              <div className='space-y-2 text-center'>
                <p className='font-bold text-gray-900 dark:text-white text-2xl'>
                  500+
                </p>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Businesses Trust Us
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex justify-center'>
            <div className='w-full max-w-md'>
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
                  {message && (
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
                  )}

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
                                  className='pl-10 h-11'
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
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default SignUpForm;
