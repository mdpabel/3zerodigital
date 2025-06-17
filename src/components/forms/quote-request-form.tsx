'use client';

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  User,
  Building,
  MessageSquare,
  Send,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Calendar,
  Code,
  TrendingUp,
  Video,
  Palette,
  Settings,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { submitQuoteRequest } from '@/actions/lead-actions';
import { toast } from 'sonner';

const serviceOptions = [
  { value: 'web-development', label: 'Web Development', icon: Code },
  { value: 'seo-marketing', label: 'SEO & Marketing', icon: TrendingUp },
  { value: 'video-editing', label: 'Video Editing', icon: Video },
  { value: 'graphics-design', label: 'Graphics & Design', icon: Palette },
  { value: 'maintenance', label: 'Website Maintenance', icon: Settings },
  { value: 'other', label: 'Other Services', icon: Globe },
];

const budgetRanges = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'discuss', label: "Let's discuss" },
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '2-3-months', label: '2-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-plus-months', label: '6+ months' },
  { value: 'flexible', label: 'Flexible' },
];

const QuoteRequestForm = () => {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await submitQuoteRequest(formData);

      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        // Reset form
        const form = document.getElementById('quote-form') as HTMLFormElement;
        form?.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  if (submitted) {
    return (
      <Card className='mx-auto w-full max-w-2xl'>
        <CardContent className='p-8 text-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className='flex justify-center items-center bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-6 p-4 rounded-full w-20 h-20'>
            <CheckCircle className='w-10 h-10 text-white' />
          </motion.div>

          <h2 className='mb-4 font-bold text-3xl'>Quote Request Submitted!</h2>

          <p className='mb-6 text-muted-foreground text-lg'>
            Thank you for your quote request. We'll review your requirements and
            get back to you within 24 hours with a detailed proposal.
          </p>

          <Button
            onClick={() => setSubmitted(false)}
            className='bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white'>
            Submit Another Quote
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mx-auto w-full max-w-4xl'>
      <CardHeader>
        <CardTitle className='text-2xl'>Request a Quote</CardTitle>
        <p className='text-muted-foreground'>
          Tell us about your project and we'll provide you with a detailed quote
          within 24 hours.
        </p>
      </CardHeader>
      <CardContent>
        <form id='quote-form' action={handleSubmit} className='space-y-6'>
          {/* Personal Info */}
          <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name *</Label>
              <Input
                id='name'
                name='name'
                placeholder='John Doe'
                required
                disabled={isPending}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address *</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='john@company.com'
                required
                disabled={isPending}
              />
            </div>
          </div>

          <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='+1 (555) 123-4567'
                disabled={isPending}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='company'>Company Name</Label>
              <Input
                id='company'
                name='company'
                placeholder='Your Company Inc.'
                disabled={isPending}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className='space-y-2'>
            <Label htmlFor='service'>Service Required *</Label>
            <select
              id='service'
              name='service'
              className='flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed'
              required
              disabled={isPending}>
              <option value=''>Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='projectType'>Project Type *</Label>
            <Input
              id='projectType'
              name='projectType'
              placeholder='e.g., E-commerce website, Brand redesign, SEO campaign'
              required
              disabled={isPending}
            />
          </div>

          <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='budget'>Budget Range</Label>
              <select
                id='budget'
                name='budget'
                className='flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed'
                disabled={isPending}>
                <option value=''>Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='timeline'>Project Timeline</Label>
              <select
                id='timeline'
                name='timeline'
                className='flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed'
                disabled={isPending}>
                <option value=''>Select timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Project Description *</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Please describe your project in detail. Include your goals, target audience, specific requirements, and any other relevant information...'
              rows={6}
              required
              disabled={isPending}
            />
          </div>

          <Button
            type='submit'
            className='bg-gradient-to-r from-blue-600 to-purple-600 border-0 w-full text-white'
            disabled={isPending}>
            {isPending ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className='mr-2 border-2 border-white/30 border-t-white rounded-full w-5 h-5'
                />
                Submitting Request...
              </>
            ) : (
              <>
                <Send className='mr-2 w-5 h-5' />
                Request Quote
                <ArrowRight className='ml-2 w-5 h-5' />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;
