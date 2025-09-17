'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';

export default function WebsiteSetupPage() {
  return (
    <div className='relative overflow-hidden'>
      {/* HERO */}
      <section className='relative py-10 sm:py-14'>
        <ComponentWrapper>
          <div className='mx-auto px-4 max-w-5xl text-center container'>
            <h1 className='mb-3 font-extrabold text-3xl sm:text-4xl md:text-5xl text-balance leading-[1.1] tracking-tight'>
              Professional Website Setup Service
            </h1>
            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-base sm:text-lg'>
              Let our team help you set up your website professionally, quickly,
              and securely. Get started now and have your website up in no time.
            </p>

            <div className='flex sm:flex-row flex-col sm:justify-center items-stretch sm:items-center gap-3 mx-auto mt-7 w-full sm:w-auto sm:max-w-none max-w-md'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto'>
                <Link href='https://wa.me/83837273484'>
                  Contact Us via WhatsApp{' '}
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='w-full sm:w-auto'>
                <Link href='/docs'>Explore Self Setup Option</Link>
              </Button>
            </div>
          </div>
        </ComponentWrapper>
      </section>

      {/* SIMPLE PRICING TABLE */}
      <section className='relative py-10'>
        <ComponentWrapper>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='font-bold text-2xl sm:text-3xl'>
              Simple & Transparent Pricing
            </h2>
            <div className='mt-6'>
              <div className='py-4 border-gray-300 border-t-2'>
                <div className='flex justify-center items-center'>
                  <span className='font-semibold text-gray-800 dark:text-gray-100 text-lg'>
                    Website Setup Service
                  </span>
                  <span className='mx-4 text-gray-600 dark:text-gray-300'>
                    |
                  </span>
                  <span className='font-semibold text-gray-800 dark:text-gray-100 text-lg'>
                    500tk
                  </span>
                </div>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  Full setup with professional assistance—ideal for those who
                  prefer a hassle-free experience.
                </p>
              </div>
            </div>
          </div>
        </ComponentWrapper>
      </section>

      {/* HOW IT WORKS */}
      <section className='relative py-10 sm:py-12 md:py-16'>
        <ComponentWrapper>
          <div className='mx-auto px-4 max-w-5xl container'>
            <h2 className='font-bold text-2xl sm:text-3xl text-center'>
              How Our Setup Service Works
            </h2>

            <div className='gap-6 grid grid-cols-1 sm:grid-cols-3 mt-7 sm:mt-8'>
              {[
                {
                  title: 'Step 1: Reach Out',
                  desc: 'Contact us via WhatsApp to initiate the setup process and discuss your website requirements.',
                  icon: <ArrowRight className='w-5 h-5' />,
                },
                {
                  title: 'Step 2: Setup Process',
                  desc: 'We handle everything, from setting up the website to making sure it is fully functional.',
                  icon: <ArrowRight className='w-5 h-5' />,
                },
                {
                  title: 'Step 3: Go Live',
                  desc: 'Once the setup is complete, your website will go live, ready for visitors.',
                  icon: <ArrowRight className='w-5 h-5' />,
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
                <Link href='https://wa.me/83837273484'>
                  Contact Us via WhatsApp{' '}
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
            </div>
          </div>
        </ComponentWrapper>
      </section>

      {/* CONTACT */}
      <section className='relative py-10 sm:py-12 md:py-16'>
        <ComponentWrapper>
          <div className='mx-auto px-4 max-w-5xl text-center container'>
            <h2 className='font-bold text-2xl sm:text-3xl text-center'>
              Contact Us for Your Website Setup
            </h2>
            <p className='mt-4 text-slate-600 dark:text-slate-300 text-lg'>
              Ready to get started? Reach out via WhatsApp for a seamless setup
              experience. We’re here to help every step of the way.
            </p>

            <div className='mt-8'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto'>
                <Link href='https://wa.me/83837273484'>
                  Contact Us via WhatsApp
                </Link>
              </Button>
            </div>

            <div className='mt-8 text-gray-500 text-sm'>
              <p>Or reach out directly via:</p>
              <p className='font-semibold text-gray-700 dark:text-gray-300'>
                <a href='tel:+83837273484' className='hover:text-blue-600'>
                  +83837273484 (WhatsApp)
                </a>
              </p>
            </div>
          </div>
        </ComponentWrapper>
      </section>
    </div>
  );
}
