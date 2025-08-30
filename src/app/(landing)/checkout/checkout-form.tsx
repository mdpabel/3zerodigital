'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Shield,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import { Template } from '@prisma/client';
import { templateOrderAction } from '@/actions/template-order-actions';

const checkoutFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutForm = ({ template }: { template: Template }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      additionalNotes: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await templateOrderAction({
        ...data,
        templateId: template.id,
      });

      console.log({ response });

      if (!response.success) {
        setError(
          response.message || response.error || 'An unknown error occurred',
        );
        return;
      }

      // Redirect based on response
      if (response.redirectUrl) {
        router.push(response.redirectUrl);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ComponentWrapper>
      <div className='py-12 md:py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10 text-center'>
          <h1 className='mb-3 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl'>
            Complete Your Purchase
          </h1>
          <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300'>
            You're one step away from accessing your template
          </p>
        </motion.div>

        <div className='gap-8 grid md:grid-cols-5 mx-auto px-4 max-w-7xl'>
          {/* Left side: Checkout Form (3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='md:col-span-3'>
            <Card className='shadow-lg border border-slate-200 dark:border-slate-800'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='w-5 h-5 text-blue-600' />
                  Account Details
                </CardTitle>
                <CardDescription>
                  We'll use this information to create your account and process
                  your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'>
                    <div className='gap-4 grid md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder='John' {...field} />
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder='Doe' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='your@email.com'
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
                          <FormLabel>Create Password</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              placeholder='••••••••'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be at least 8 characters with mixed case and
                            numbers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='pt-3'>
                      <h3 className='flex items-center gap-2 mb-4 font-medium text-slate-900 dark:text-white text-lg'>
                        <Shield className='w-5 h-5 text-blue-600' />
                        Contact Information
                      </h3>

                      <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='+1 (555) 123-4567'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='additionalNotes'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific requirements or information you'd like us to know"
                              className='min-h-24'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='pt-2 pb-3'>
                      <p className='text-slate-500 dark:text-slate-400 text-sm'>
                        Already have an account?{' '}
                        <a
                          href='/login'
                          className='font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400'>
                          Log in here
                        </a>
                      </p>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-red-50 dark:bg-red-900/20 p-3 rounded-md text-red-500 text-sm text-center'>
                        {error}
                      </motion.p>
                    )}

                    <Button
                      type='submit'
                      size='lg'
                      className='w-full'
                      disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Processing...'
                      ) : (
                        <>
                          {template.price === 0
                            ? 'Access Template'
                            : 'Proceed to Payment'}
                          <ArrowRight className='ml-2 w-4 h-4' />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side: Template Details (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='md:col-span-2'>
            <Card className='top-24 sticky shadow-lg border border-slate-200 dark:border-slate-800'>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Template details and pricing</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='bg-slate-100 dark:bg-slate-800 mb-4 rounded-lg aspect-video overflow-hidden'>
                  {template.images[0] ? (
                    <img
                      src={template.images[0]}
                      alt={template.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='flex justify-center items-center w-full h-full text-slate-400'>
                      Template Preview
                    </div>
                  )}
                </div>

                <h3 className='font-semibold text-slate-900 dark:text-white text-xl'>
                  {template.name}
                </h3>

                <Separator className='my-4' />

                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-slate-600 dark:text-slate-400'>
                      Template Price
                    </span>
                    <span className='font-medium'>
                      {template.price === 0
                        ? 'Free'
                        : new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(template.salePrice)}
                    </span>
                  </div>

                  {template.price > 0 && (
                    <>
                      <div className='flex justify-between'>
                        <span className='text-slate-600 dark:text-slate-400'>
                          Tax
                        </span>
                        <span className='font-medium'>$0.00</span>
                      </div>
                      <Separator className='my-2' />
                      <div className='flex justify-between font-bold text-lg'>
                        <span>Total</span>
                        <span>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(template.salePrice)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex flex-col space-y-3 bg-slate-50 dark:bg-slate-800/50 px-6 py-4 rounded-b-lg'>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-600' />
                  <span className='text-slate-700 dark:text-slate-300 text-sm'>
                    Instant access after{' '}
                    {template.price === 0 ? 'signup' : 'payment'}
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-600' />
                  <span className='text-slate-700 dark:text-slate-300 text-sm'>
                    Full source code and documentation
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-600' />
                  <span className='text-slate-700 dark:text-slate-300 text-sm'>
                    Lifetime updates and support
                  </span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CheckoutForm;
