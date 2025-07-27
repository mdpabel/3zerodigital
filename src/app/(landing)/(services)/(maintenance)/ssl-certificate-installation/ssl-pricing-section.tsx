// components/ssl/ssl-pricing-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, ArrowRight, Clock, Star } from 'lucide-react';

const SSLPricingSection = () => {
  const features = [
    'SSL certificate purchase & installation',
    'HTTPS redirect configuration',
    'Mixed content fixes',
    'Security headers setup',
    'SSL testing & verification',
    'Browser compatibility check',
    'Search engine notification',
    'Post-installation support',
    '30-day money-back guarantee',
    'Same-day completion',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='mb-20'>
      <div className='relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-8 md:p-12 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5' />

        <div className='relative'>
          <div className='flex lg:flex-row flex-col items-center gap-12'>
            {/* Left Side - Service Details */}
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='inline-flex justify-center items-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl w-16 h-16'>
                  <Shield className='w-8 h-8 text-white' />
                </div>
                <div>
                  <h2 className='font-bold text-slate-900 dark:text-white text-3xl'>
                    SSL Installation Service
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    Complete security setup for your website
                  </p>
                </div>
              </div>

              <div className='gap-4 grid grid-cols-1 md:grid-cols-2 mb-8'>
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className='flex items-start gap-3'>
                    <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-600' />
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Service Highlights */}
              <div className='flex flex-wrap gap-3 mb-6'>
                <Badge className='bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'>
                  <Clock className='mr-1 w-3 h-3' />
                  Same-day service
                </Badge>
                <Badge className='bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'>
                  <Star className='mr-1 w-3 h-3' />
                  Expert installation
                </Badge>
                <Badge className='bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'>
                  <Shield className='mr-1 w-3 h-3' />
                  Secure & tested
                </Badge>
              </div>
            </div>

            {/* Right Side - Pricing */}
            <div className='bg-gradient-to-br from-slate-50 dark:from-slate-900/50 to-green-50 dark:to-green-950/20 p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl lg:min-w-[320px] text-center'>
              <div className='mb-6'>
                <div className='mb-2 text-slate-500 text-sm'>
                  Complete Service
                </div>
                <div className='flex justify-center items-baseline gap-1'>
                  <span className='font-bold text-slate-900 dark:text-white text-5xl'>
                    $149
                  </span>
                  <span className='text-slate-500 text-lg'>one-time</span>
                </div>
                <div className='mt-1 font-medium text-green-600 dark:text-green-400 text-sm'>
                  SSL Certificate Included
                </div>
              </div>

              <div className='space-y-3 mb-8'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-green-600 to-blue-600 py-6 w-full text-white text-lg'>
                  <Shield className='mr-2 w-5 h-5' />
                  Secure My Website Now
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <Button variant='outline' size='lg' className='w-full'>
                  <Clock className='mr-2 w-5 h-5' />
                  Schedule Installation
                </Button>
              </div>

              <div className='text-center'>
                <div className='mb-2 text-slate-600 dark:text-slate-300 text-sm'>
                  What happens next?
                </div>
                <div className='space-y-1 text-slate-500 text-xs'>
                  <div>1. We'll contact you within 2 hours</div>
                  <div>2. Schedule convenient installation time</div>
                  <div>3. Complete setup same day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SSLPricingSection;
