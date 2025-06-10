'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema for SEO form
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  businessName: z.string().min(1, 'Business name is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  websiteURL: z.string().url('Invalid URL').optional(),
  additionalDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  title: string;
};

const SEOServiceForm = ({ title }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    // Replace with your form submission logic
    console.log('Local SEO Form submitted:', data);
  };

  return (
    <div id='getStarted' className='mx-auto mt-12 max-w-4xl'>
      <h2 className='mb-6 font-bold text-zinc-800 dark:text-zinc-200 text-3xl md:text-4xl text-center'>
        {title}
      </h2>
      <p className='mx-auto mb-8 md:mb-12 max-w-3xl text-zinc-700 dark:text-zinc-400 text-lg md:text-xl text-center'>
        Fill out the form below to receive a free consultation tailored for your
        local business.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 bg-white dark:bg-gray-900 shadow-xl p-6 md:p-10 rounded-lg'>
          {/* Name */}
          <FormField
            name='name'
            control={form.control}
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
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Your Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Name */}
          <FormField
            name='businessName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder='Business Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Address */}
          <FormField
            name='businessAddress'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder='Business Address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            name='phoneNumber'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='Phone Number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website URL */}
          <FormField
            name='websiteURL'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL (optional)</FormLabel>
                <FormControl>
                  <Input placeholder='https://yourwebsite.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional Details */}
          <FormField
            name='additionalDetails'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us more about your business or goals...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='p-5 w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SEOServiceForm;
