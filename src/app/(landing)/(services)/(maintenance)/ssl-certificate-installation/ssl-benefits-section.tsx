// components/ssl/ssl-benefits-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, Lock, Search, Globe } from 'lucide-react';

const SSLBenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Data Protection',
      description:
        'Encrypt all data transmitted between your website and visitors, preventing data theft and man-in-the-middle attacks.',
      color: 'from-green-600 to-green-700',
    },
    {
      icon: Users,
      title: 'Build Trust',
      description:
        'Display the padlock icon in browsers, showing visitors your site is secure and increasing conversion rates.',
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: Search,
      title: 'SEO Benefits',
      description:
        'Google considers SSL as a ranking factor. Secure sites rank higher in search results than non-secure ones.',
      color: 'from-purple-600 to-purple-700',
    },
    {
      icon: TrendingUp,
      title: 'Increase Conversions',
      description:
        'Studies show that SSL certificates can increase conversions by up to 13% by building customer confidence.',
      color: 'from-orange-600 to-orange-700',
    },
    {
      icon: Lock,
      title: 'Compliance',
      description:
        'Meet industry standards and compliance requirements like PCI DSS for handling sensitive customer data.',
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Globe,
      title: 'Browser Compatibility',
      description:
        'Ensure your site works perfectly across all modern browsers without security warnings or errors.',
      color: 'from-indigo-600 to-indigo-700',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='mb-20'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl'>
          Why Your Website Needs SSL
        </h2>
        <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg'>
          SSL certificates are no longer optional. They're essential for
          security, trust, and SEO performance.
        </p>
      </div>

      <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className='group bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} mb-4 group-hover:scale-110 transition-transform`}>
              <benefit.icon className='w-6 h-6 text-white' />
            </div>

            <h3 className='mb-3 font-semibold text-slate-900 dark:text-white text-xl'>
              {benefit.title}
            </h3>

            <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Security Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className='bg-gradient-to-r from-green-50 dark:from-green-950/20 to-blue-50 dark:to-blue-950/20 mt-12 p-8 border border-green-200/50 dark:border-green-800/50 rounded-2xl'>
        <div className='mb-6 text-center'>
          <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
            SSL Security Statistics
          </h3>
          <p className='text-slate-600 dark:text-slate-300'>
            The impact of SSL on website security and performance
          </p>
        </div>

        <div className='gap-6 grid grid-cols-1 md:grid-cols-4 text-center'>
          <div>
            <div className='mb-1 font-bold text-green-600 text-3xl'>84%</div>
            <div className='text-slate-600 dark:text-slate-300 text-sm'>
              of users leave unsecure sites
            </div>
          </div>
          <div>
            <div className='mb-1 font-bold text-blue-600 text-3xl'>13%</div>
            <div className='text-slate-600 dark:text-slate-300 text-sm'>
              conversion rate increase
            </div>
          </div>
          <div>
            <div className='mb-1 font-bold text-purple-600 text-3xl'>100%</div>
            <div className='text-slate-600 dark:text-slate-300 text-sm'>
              of top websites use SSL
            </div>
          </div>
          <div>
            <div className='mb-1 font-bold text-orange-600 text-3xl'>2x</div>
            <div className='text-slate-600 dark:text-slate-300 text-sm'>
              faster Google indexing
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SSLBenefitsSection;
