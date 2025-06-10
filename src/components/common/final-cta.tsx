'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  Sparkles,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ComponentWrapper from './component-wrapper';

const FinalCTA = () => {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Background gradient */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10 rounded-3xl' />

          <div className='relative bg-white/70 dark:bg-slate-800/70 shadow-2xl backdrop-blur-md p-8 md:p-12 lg:p-16 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl text-center'>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-8 md:mb-12'>
              <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
                <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
                Ready to Get Started?
              </Badge>

              <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-6xl'>
                <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                  Experience the 3Zero Difference
                </span>
              </h2>

              <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed'>
                Join 150+ businesses who trust their digital presence to our
                3zero approach. Zero vulnerabilities, zero downtime, zero errors
                - guaranteed.
              </p>
            </motion.div>

            {/* 3Zero Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex flex-wrap justify-center items-center gap-4 mb-8 md:mb-12'>
              <div className='flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 px-4 py-2 border border-emerald-200 dark:border-emerald-800 rounded-full'>
                <Shield className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                <span className='font-semibold text-emerald-700 dark:text-emerald-300 text-sm'>
                  0 Vulnerabilities
                </span>
              </div>

              <div className='flex items-center gap-2 bg-blue-50 dark:bg-blue-950 px-4 py-2 border border-blue-200 dark:border-blue-800 rounded-full'>
                <Zap className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                <span className='font-semibold text-blue-700 dark:text-blue-300 text-sm'>
                  0 Downtime
                </span>
              </div>

              <div className='flex items-center gap-2 bg-purple-50 dark:bg-purple-950 px-4 py-2 border border-purple-200 dark:border-purple-800 rounded-full'>
                <CheckCircle className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                <span className='font-semibold text-purple-700 dark:text-purple-300 text-sm'>
                  0 Errors
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='flex sm:flex-row flex-col justify-center items-center gap-4 mb-8'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-8 py-6 border-0 text-white text-lg transition-all duration-300'>
                <Link href='/contact' className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Book Free Consultation
                  <ArrowRight className='w-5 h-5' />
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                size='lg'
                className='bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl px-8 py-6 text-lg transition-all duration-300'>
                <Link href='/services' className='flex items-center gap-2'>
                  <MessageCircle className='w-5 h-5' />
                  View All Services
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='flex flex-wrap justify-center items-center gap-6 text-slate-500 dark:text-slate-400 text-sm'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                <span>Free consultation</span>
              </div>

              <div className='flex items-center gap-2'>
                <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                <span>No long-term contracts</span>
              </div>

              <div className='flex items-center gap-2'>
                <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                <span>30-day guarantee</span>
              </div>
            </motion.div>
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default FinalCTA;
