// components/ssl/ssl-faq-section.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const SSLFAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What type of SSL certificate do you install?',
      answer:
        'We install Domain Validated (DV) SSL certificates which provide 256-bit encryption and are perfect for most websites. For e-commerce sites or sites handling sensitive data, we can also install Extended Validation (EV) or Organization Validated (OV) certificates upon request.',
    },
    {
      question: 'How long does the SSL installation take?',
      answer:
        'Most SSL installations are completed within 2-3 hours on the same day. The process includes certificate purchase, installation, configuration, and testing. We provide regular updates throughout the process.',
    },
    {
      question: 'Will my website have any downtime during installation?',
      answer:
        "In most cases, there is no downtime during SSL installation. We perform the installation in a way that maintains your website's availability. In rare cases where downtime is necessary, it would be minimal (5-10 minutes) and scheduled at your convenience.",
    },
    {
      question: 'Do you work with all hosting providers?',
      answer:
        'Yes, we work with all major hosting providers including cPanel, Plesk, WordPress hosting, cloud hosting, and VPS servers. Our experts are experienced with various hosting environments and server configurations.',
    },
    {
      question:
        'What if my site has mixed content issues after SSL installation?',
      answer:
        'Mixed content fixes are included in our service. We identify and fix all mixed content issues, update internal links, and ensure your site loads completely over HTTPS without any security warnings.',
    },
    {
      question: 'Do you provide support after installation?',
      answer:
        'Yes, we provide 30 days of post-installation support included in the service. This covers any SSL-related issues, renewals guidance, and ensuring your certificate continues to work properly.',
    },
    {
      question: 'What happens when my SSL certificate expires?',
      answer:
        "SSL certificates typically last 1 year. We'll notify you 30 days before expiration and can handle the renewal process for you. Many hosting providers now offer auto-renewal options which we can set up during installation.",
    },
    {
      question: 'Is the SSL certificate cost included in the $149 price?',
      answer:
        'Yes, the SSL certificate cost is included in our $149 service price. This covers the certificate purchase, installation, configuration, testing, and 30 days of support - everything you need for a complete SSL setup.',
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
          Frequently Asked Questions
        </h2>
        <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg'>
          Got questions about SSL installation? Here are the answers to the most
          common questions we receive.
        </p>
      </div>

      <div className='space-y-4 mx-auto max-w-4xl'>
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
            <button
              onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              className='flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-700/50 px-6 py-4 w-full text-left transition-colors'>
              <h3 className='pr-4 font-semibold text-slate-900 dark:text-white text-lg'>
                {faq.question}
              </h3>
              {openFAQ === idx ? (
                <ChevronUp className='flex-shrink-0 w-5 h-5 text-slate-500' />
              ) : (
                <ChevronDown className='flex-shrink-0 w-5 h-5 text-slate-500' />
              )}
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openFAQ === idx ? 'auto' : 0,
                opacity: openFAQ === idx ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden'>
              <div className='px-6 pb-4'>
                <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Still have questions CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 mt-12 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl text-center'>
        <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
          Still Have Questions?
        </h3>
        <p className='mb-4 text-slate-600 dark:text-slate-300'>
          Our SSL experts are here to help. Get personalized answers to your
          specific questions.
        </p>

        <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg px-6 py-3 rounded-xl font-medium text-white transition-shadow'>
          Contact SSL Expert
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SSLFAQSection;
