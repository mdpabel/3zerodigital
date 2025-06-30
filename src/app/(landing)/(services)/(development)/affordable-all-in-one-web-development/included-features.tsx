'use client';

import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Server, Mail, Rocket } from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Globe,
    title: 'Free .com Domain',
    description:
      'We register a professional .com domain name for your business, included free for the first year.',
    color: 'text-blue-500',
  },
  {
    icon: Server,
    title: 'High-Speed Hosting',
    description:
      'Your website is hosted on fast, reliable servers (cPanel, Vercel, or Shopify) to ensure a great user experience.',
    color: 'text-purple-500',
  },
  {
    icon: ShieldCheck,
    title: 'Free SSL Certificate',
    description:
      'We install and configure an SSL certificate, securing your site with HTTPS and boosting visitor trust.',
    color: 'text-green-500',
  },
  {
    icon: Mail,
    title: 'Professional Email',
    description:
      'Get a professional email address like you@yourdomain.com to build credibility with your customers.',
    color: 'text-orange-500',
  },
  {
    icon: Rocket,
    title: 'Performance Optimized',
    description:
      'We build for speed, targeting 95%+ scores on Google PageSpeed Insights for better SEO and engagement.',
    color: 'text-red-500',
  },
];

const IncludedFeatures = () => {
  return (
    <section className='bg-white dark:bg-slate-900 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-green-800 dark:via-green-200 to-slate-900 dark:to-white text-transparent'>
                Truly All-in-One
              </span>
            </h2>
            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Unlike other services, our $79 package includes everything you
              need to get online. No upsells, no hidden costs.
            </p>
          </motion.div>

          <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className='bg-slate-50/50 dark:bg-slate-800/50 p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-xl h-full'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='bg-gradient-to-br from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-800 p-3 rounded-lg'>
                      <feature.icon className={cn('w-6 h-6', feature.color)} />
                    </div>
                    <h3 className='font-bold text-slate-900 dark:text-white text-lg'>
                      {feature.title}
                    </h3>
                  </div>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default IncludedFeatures;
