'use client';

import { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import ComponentWrapper from '@/components/common/component-wrapper';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your new password'),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';

  const [{ message, success }, setFormState] = useState({
    success: false,
    message: '',
  });
  const [pending, startTransition] = useTransition();

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (values: ResetPasswordForm) => {
    if (!token) {
      setFormState({
        success: false,
        message: 'Invalid or missing reset token.',
      });
      return;
    }

    startTransition(async () => {
      setFormState({ success: false, message: '' });
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token,
      });

      if (error) {
        setFormState({
          success: false,
          message: error.message ?? 'Could not reset password. Try again.',
        });
        return;
      }

      setFormState({
        success: true,
        message: 'Your password has been updated.',
      });
      // Redirect after a short pause (optional)
      setTimeout(() => router.push('/login'), 800);
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
                Set a new password
              </CardTitle>
              <CardDescription className='text-center'>
                Enter and confirm your new password
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
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium text-sm'>
                          New password
                        </FormLabel>
                        <FormControl>
                          {/* Replace with <PasswordInputField field={field} className="h-11" disabled={pending} /> if you use your helper */}
                          <Input
                            type='password'
                            placeholder='********'
                            className='h-11'
                            disabled={pending}
                            {...field}
                          />
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
                          Confirm new password
                        </FormLabel>
                        <FormControl>
                          {/* Replace with <PasswordInputField field={field} className="h-11" disabled={pending} /> if you use your helper */}
                          <Input
                            type='password'
                            placeholder='********'
                            className='h-11'
                            disabled={pending}
                            {...field}
                          />
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
                        <span>Updating password…</span>
                      </span>
                    ) : (
                      <span className='flex items-center gap-2'>
                        <span>Reset Password</span>
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
