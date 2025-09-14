'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  Loader2,
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
import ComponentWrapper from '@/components/common/component-wrapper';
import { authClient } from '@/lib/auth-client';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
type ForgotPasswordFormSchema = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [{ message, success }, setFormState] = useState({
    success: false,
    message: '',
  });
  const [pending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values: ForgotPasswordFormSchema) => {
    startTransition(async () => {
      setFormState({ success: false, message: '' });

      try {
        // Better Auth requires an absolute URL for redirect destinations
        const redirectTo = `${window.location.origin}/reset-password`;

        const { error } = await authClient.requestPasswordReset({
          email: values.email,
          redirectTo,
        });

        if (error) {
          setFormState({
            success: false,
            message:
              error.message ??
              'We could not send the reset email. Please try again.',
          });
          return;
        }

        setFormState({
          success: true,
          message:
            "If an account exists for that email, we've sent password reset instructions.",
        });
      } catch {
        setFormState({
          success: false,
          message: 'We could not send the reset email. Please try again.',
        });
      }
    });
  };

  return (
    <ComponentWrapper>
      <div className='mx-auto px-4 py-12 container'>
        <div className='mx-auto w-full max-w-md'>
          <Card className='bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-sm border-0'>
            <CardHeader className='space-y-1 pb-4'>
              <div className='flex justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-600 mx-auto mb-2 rounded-full w-12 h-12'>
                <Lock className='w-6 h-6 text-white' />
              </div>
              <CardTitle className='font-bold text-2xl text-center'>
                Reset Password
              </CardTitle>
              <CardDescription className='text-center'>
                Enter your email to receive reset instructions
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-4'>
              {message && (
                <div
                  className={[
                    'flex items-center gap-2 rounded-lg border p-3 text-sm font-medium',
                    success
                      ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200'
                      : 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
                  ].join(' ')}>
                  {success ? (
                    <CheckCircle2 className='w-5 h-5' />
                  ) : (
                    <AlertCircle className='w-5 h-5' />
                  )}
                  <p>{message}</p>
                </div>
              )}

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
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Mail className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform' />
                            <Input
                              placeholder='you@example.com'
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

                  <Button
                    type='submit'
                    disabled={pending}
                    className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 w-full h-11 font-medium text-white'>
                    {pending ? (
                      <span className='flex items-center gap-2'>
                        <Loader2 className='w-4 h-4 animate-spin' />
                        <span>Sending instructions…</span>
                      </span>
                    ) : (
                      <span className='flex items-center gap-2'>
                        <span>Send Reset Instructions</span>
                        <ArrowRight className='w-4 h-4' />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
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
        </div>
      </div>
    </ComponentWrapper>
  );
}
