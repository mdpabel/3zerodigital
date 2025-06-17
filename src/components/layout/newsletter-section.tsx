'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { subscribeToNewsletter } from '@/actions/newsletter-actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import ComponentWrapper from '../common/component-wrapper';
import { subscribeToNewsletter } from '@/actions/lead-actions';

const NewsletterSection = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        toast.success(result.message);
        // Reset form
        const form = document.getElementById(
          'newsletter-form',
        ) as HTMLFormElement;
        form?.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <ComponentWrapper className='py-12'>
      <div className='mx-auto max-w-4xl text-center'>
        <h3 className='mb-4 font-bold text-white text-2xl'>
          Stay Updated with Our Latest News & Offers
        </h3>
        <p className='mb-6 text-blue-100'>
          Get exclusive tips, tutorials, and special discounts delivered to your
          inbox
        </p>
        <form
          id='newsletter-form'
          action={handleSubmit}
          className='flex sm:flex-row flex-col gap-4 mx-auto max-w-md'>
          <Input
            type='email'
            name='email'
            placeholder='Enter your email'
            className='bg-white/20 border-white/30 text-white placeholder:text-white/70'
            required
            disabled={isPending}
          />
          <Button
            type='submit'
            variant='secondary'
            className='bg-white hover:bg-gray-100 text-blue-600'
            disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      </div>
    </ComponentWrapper>
  );
};

export default NewsletterSection;
