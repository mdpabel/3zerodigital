'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { cn } from '@/lib/utils';
import { signInAction } from '@/actions/auth-actions';
import ComponentWrapper from '@/components/common/component-wrapper';
import { Category } from '@prisma/client';
import { FaGoogle } from 'react-icons/fa';
import { LoginFormSchema, LoginSchema } from '@/lib/validations/auth';

// Components
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

const Message = ({
  type,
  message,
}: {
  type: 'success' | 'error';
  message: string;
}) => {
  if (!message) return null;
  const isSuccess = type === 'success';
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg p-3 text-sm font-medium',
        isSuccess
          ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800'
          : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
      )}>
      {isSuccess ? (
        <CheckCircle2 className='w-4 h-4' />
      ) : (
        <AlertCircle className='w-4 h-4' />
      )}
      <p>{message}</p>
    </div>
  );
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [{ message, success }, setFormState] = useState({
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

  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  useEffect(() => {
    if (success && message) {
      router.push(callbackUrl);
    }
  }, [message, success, router, callbackUrl]);

  const handleCredentialsSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await signInAction(formData);
        setFormState({
          success: result.success,
          message: result.message,
        });
      } catch (error) {
        setFormState({
          success: false,
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    });
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormState({
        success: true,
        message: `Successfully authenticated with ${provider}. Redirecting...`,
      });
    });
  };

  return (
    <ComponentWrapper>
      <div className='mx-auto px-4 py-8 container'>
        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex justify-center'>
          <div className='w-full max-w-md'>
            <Card className='bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-sm border-0'>
              <CardHeader className='space-y-1 pb-4'>
                <CardTitle className='font-bold text-2xl text-center'>
                  Sign In
                </CardTitle>
                <CardDescription className='text-center'>
                  Choose your preferred sign-in method
                </CardDescription>
              </CardHeader>

              <CardContent className='space-y-4'>
                {/* Social Login Buttons */}
                <div className='space-y-3'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => handleSocialLogin('google')}
                    disabled={pending}
                    className='bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700 w-full h-11'>
                    <FaGoogle className='mr-3 w-5 h-5' />
                    Continue with Google
                  </Button>

                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => handleSocialLogin('github')}
                    disabled={pending}
                    className='bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700 w-full h-11'>
                    <Github className='mr-3 w-5 h-5' />
                    Continue with GitHub
                  </Button>
                </div>

                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <Separator className='w-full' />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <Form {...form}>
                  <form
                    action={async (formData) => {
                      const isValid = await form.trigger();
                      if (isValid) {
                        handleCredentialsSubmit(formData);
                      }
                    }}
                    className='space-y-4'>
                    <input
                      type='hidden'
                      name='callbackUrl'
                      value={callbackUrl}
                    />

                    {message && !success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                        <Message type='error' message={message} />
                      </motion.div>
                    )}

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
                        <div className='flex items-center gap-2'>
                          <Spinner />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <span>Sign In</span>
                          <ArrowRight className='w-4 h-4' />
                        </div>
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

                <div className='text-muted-foreground text-sm text-center'>
                  Don't have an account?{' '}
                  <Link
                    href='/signup'
                    className='font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400'>
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </ComponentWrapper>
  );
};

export default LoginForm;
