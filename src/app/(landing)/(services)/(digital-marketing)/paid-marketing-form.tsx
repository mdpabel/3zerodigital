'use client';

import React, { ReactNode } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  businessType: z.string().nonempty('Please select your business type'),
  monthlyAdBudget: z.string().nonempty('Please select your ad budget'),
  marketingGoals: z
    .string()
    .min(10, 'Please describe your marketing goals (at least 10 characters)'),
  currentPlatforms: z.string().optional(),
  additionalDetails: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const businessTypes = [
  'E-commerce',
  'Local Business',
  'Tech Startup',
  'Service Provider',
  'Other',
];

const adBudgets = [
  '< $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '> $10,000',
];

type Props = {
  title: string;
  Icon?: ReactNode;
};

const PaidMarketingForm = ({ title, Icon }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
      monthlyAdBudget: '',
    },
  });

  // You can add submission logic here or integrate with your API

  return (
    <div
      id='getStarted'
      className='bg-white dark:bg-gray-900 shadow-lg mx-auto p-6 rounded-lg max-w-3xl'>
      {Icon && <div className='flex justify-center mb-6'>{Icon}</div>}

      <h2 className='mb-6 font-bold text-zinc-900 dark:text-white text-3xl text-center'>
        {title}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            // Handle form submission here
            console.log(data);
          })}
          className='space-y-6'
          noValidate>
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='Your Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Type */}
          <FormField
            control={form.control}
            name='businessType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select your business type' />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Ad Budget */}
          <FormField
            control={form.control}
            name='monthlyAdBudget'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Ad Budget</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select your ad budget' />
                    </SelectTrigger>
                    <SelectContent>
                      {adBudgets.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Marketing Goals */}
          <FormField
            control={form.control}
            name='marketingGoals'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marketing Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Describe your marketing goals'
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Current Platforms */}
          <FormField
            control={form.control}
            name='currentPlatforms'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Advertising Platforms (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='E.g., Google Ads, Facebook Ads'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional Details */}
          <FormField
            control={form.control}
            name='additionalDetails'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Any additional information'
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaidMarketingForm;
