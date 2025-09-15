'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ComponentWrapper from '@/components/common/component-wrapper';
import {
  Globe,
  Server,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Cloud,
} from 'lucide-react';
import HowToVideo from './how-to-video';
import PortfolioClient from '@/components/portfolio/portfolio-client';
import {
  TemplateCategory,
  TemplateWithNestedCategories,
} from '@/components/portfolio/types';

type Props = {
  initialTemplates: TemplateWithNestedCategories[];
  categories: TemplateCategory[];
  showFilters?: boolean;
  totalCount?: number;
};

export default function CampaignPage({
  initialTemplates,
  categories,
  showFilters,
  totalCount,
}: Props) {
  const featured = initialTemplates.slice(0, 6);

  return (
    <div className='relative overflow-hidden'>
      {/* HERO */}
      <section className='relative py-10 sm:py-14'>
        <ComponentWrapper>
          <div className='mx-auto px-4 max-w-5xl text-center container'>
            <Badge className='bg-white/85 dark:bg-slate-800/85 backdrop-blur mx-auto mb-4 border font-medium text-slate-800 dark:text-slate-100'>
              Limited Time • 100% Free
            </Badge>

            <h1 className='mb-3 font-extrabold text-3xl sm:text-4xl md:text-5xl text-balance leading-[1.1] tracking-tight'>
              Launch Online with
              <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                {' '}
                Zero Cost
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-base sm:text-lg text-pretty'>
              Get a <strong>free personal website</strong>,{' '}
              <strong>1 year of hosting</strong>, and a{' '}
              <strong>Google Maps Scraper</strong>—all included.
            </p>

            {/* quick badges */}
            <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-5'>
              <span className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full text-blue-700 dark:text-blue-300 text-xs sm:text-sm'>
                <Globe className='w-4 h-4' /> Free Website
              </span>
              <span className='inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm'>
                <Server className='w-4 h-4' /> Free Hosting (1 Year)
              </span>
              <span className='inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm'>
                <MapPin className='w-4 h-4' /> Free Google Maps Scraper
              </span>
            </div>

            {/* CTAs (full width on mobile) */}
            <div className='flex sm:flex-row flex-col sm:justify-center items-stretch sm:items-center gap-3 mx-auto mt-7 w-full sm:w-auto sm:max-w-none max-w-md'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto'>
                <Link href='#templates'>
                  Get Started Free <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='w-full sm:w-auto'>
                <Link href='/templates?tag=free'>Browse Free Templates</Link>
              </Button>
            </div>
          </div>
        </ComponentWrapper>
      </section>

      {/* HOW-TO VIDEO */}
      <HowToVideo />

      {/* THREE CARDS */}
      <section className='relative py-10'>
        <ComponentWrapper>
          <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto px-4 max-w-6xl container'>
            {/* Free Website */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className='bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 border dark:border-slate-700/50 rounded-2xl'>
              <div className='inline-flex justify-center items-center bg-blue-100 dark:bg-blue-900/40 mb-4 rounded-xl w-11 h-11 text-blue-700 dark:text-blue-300'>
                <Globe className='w-5 h-5' />
              </div>
              <h3 className='font-semibold text-lg sm:text-xl'>
                Free Personal Website
              </h3>
              <p className='mt-2 text-slate-600 dark:text-slate-300 text-sm'>
                Professionally designed templates (Next.js + WordPress). Fast,
                secure, and easy to customize.
              </p>
              <ul className='space-y-2 mt-4 text-sm'>
                {[
                  'Modern, responsive design',
                  'SEO-ready structure',
                  'Clean code & docs',
                ].map((t) => (
                  <li key={t} className='flex items-center gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-emerald-500' />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className='mt-5 w-full'>
                <Link href='#templates'>Pick a Template</Link>
              </Button>
            </motion.div>

            {/* Free Hosting */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className='bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 border dark:border-slate-700/50 rounded-2xl'>
              <div className='inline-flex justify-center items-center bg-indigo-100 dark:bg-indigo-900/40 mb-4 rounded-xl w-11 h-11 text-indigo-700 dark:text-indigo-300'>
                <Server className='w-5 h-5' />
              </div>
              <h3 className='font-semibold text-lg sm:text-xl'>
                Free Hosting (1 Year)
              </h3>
              <p className='mt-2 text-slate-600 dark:text-slate-300 text-sm'>
                One year of reliable hosting to get you fully online—no strings
                attached.
              </p>
              <ul className='space-y-2 mt-4 text-sm'>
                {[
                  '1 Year Hosting Included',
                  '1024MB Storage',
                  'JetBackup Daily Backups',
                  'Imunify360 Real-time Protection',
                  // 'DirectAdmin Control Panel',
                ].map((t) => (
                  <li key={t} className='flex items-center gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-emerald-500' />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant='outline' className='mt-5 w-full'>
                <Link href='/free/hosting-details'>View Hosting Details</Link>
              </Button>
            </motion.div>

            {/* Scraper */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className='bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 border dark:border-slate-700/50 rounded-2xl'>
              <div className='inline-flex justify-center items-center bg-emerald-100 dark:bg-emerald-900/40 mb-4 rounded-xl w-11 h-11 text-emerald-700 dark:text-emerald-300'>
                <MapPin className='w-5 h-5' />
              </div>
              <h3 className='font-semibold text-lg sm:text-xl'>
                Free Google Maps Scraper
              </h3>
              <p className='mt-2 text-slate-600 dark:text-slate-300 text-sm'>
                Find local leads fast—export businesses with name, phone,
                website, and more.
              </p>
              <ul className='space-y-2 mt-4 text-sm'>
                {[
                  'Target by city/category',
                  'CSV export in one click',
                  'Perfect for outreach',
                ].map((t) => (
                  <li key={t} className='flex items-center gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-emerald-500' />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className='mt-5 w-full'>
                <Link href='/tools/google-maps-scraper'>Open Scraper</Link>
              </Button>
            </motion.div>
          </div>
        </ComponentWrapper>
      </section>

      {/* FEATURED TEMPLATES */}
      <section
        id='templates'
        className='relative bg-slate-50 dark:bg-slate-900/50 py-14 sm:py-20 md:py-24'>
        <PortfolioClient
          initialTemplates={initialTemplates}
          categories={categories}
          showFilters={showFilters}
          totalCount={totalCount}
        />
      </section>

      {/* HOW IT WORKS */}
      <section className='relative py-10 sm:py-12 md:py-16'>
        <ComponentWrapper>
          <div className='mx-auto px-4 max-w-5xl container'>
            <h2 className='font-bold text-2xl sm:text-3xl text-center'>
              How it{' '}
              <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                Works
              </span>
            </h2>

            <div className='gap-6 grid grid-cols-1 sm:grid-cols-3 mt-7 sm:mt-8'>
              {[
                {
                  title: 'Choose Template',
                  desc: 'Pick your free website template.',
                  icon: <Globe className='w-5 h-5' />,
                },
                {
                  title: 'Sign Up',
                  desc: 'Create your free account to claim the offer.',
                  icon: <CheckCircle2 className='w-5 h-5' />,
                },
                {
                  title: 'Go Live',
                  desc: 'We provide hosting & setup docs. You launch!',
                  icon: <Cloud className='w-5 h-5' />,
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className='bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 border dark:border-slate-700/50 rounded-2xl text-center'>
                  <div className='inline-flex justify-center items-center bg-slate-100 dark:bg-slate-800 mx-auto mb-3 rounded-lg w-10 h-10'>
                    {s.icon}
                  </div>
                  <h3 className='font-semibold'>{s.title}</h3>
                  <p className='mt-2 text-slate-600 dark:text-slate-300 text-sm'>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className='flex sm:flex-row flex-col sm:justify-center items-stretch sm:items-center gap-3 mx-auto mt-9 sm:mt-10 w-full sm:w-auto sm:max-w-none max-w-md'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto'>
                <Link href='#templates'>
                  Claim Your Free Package{' '}
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='w-full sm:w-auto'>
                <Link href='/contact'>Talk to Us</Link>
              </Button>
            </div>
          </div>
        </ComponentWrapper>
      </section>
    </div>
  );
}
