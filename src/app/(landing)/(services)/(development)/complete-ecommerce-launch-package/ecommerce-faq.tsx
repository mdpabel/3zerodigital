'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "What's included in the Complete Ecommerce Launch Package?",
    answer:
      'Our package includes everything you need: custom store design, product catalog setup, payment gateway integration, shipping configuration, SEO optimization, security setup, mobile optimization, admin training, and ongoing support for the first 30-180 days depending on your package.',
  },
  {
    question: 'How long does it take to launch my ecommerce store?',
    answer:
      'Timeline depends on your chosen technology and package. Shopify stores can be ready in 7-10 days, WordPress/WooCommerce takes 10-14 days, Next.js solutions need 14-21 days, and MERN stack development requires 21-28 days. Complex custom requirements may take longer.',
  },
  {
    question: 'Which ecommerce platform should I choose?',
    answer:
      "It depends on your needs: Shopify for quick launch and non-technical users, WordPress for content-rich stores and SEO, Next.js for high-performance custom stores, and MERN stack for complex multi-vendor platforms. We'll help you choose during our free consultation.",
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer:
      'Yes! All packages include initial support (30-180 days). We also offer ongoing maintenance plans starting at $299/month, covering updates, security monitoring, backups, performance optimization, and technical support.',
  },
  {
    question: 'Can you migrate my existing store to a new platform?',
    answer:
      "Absolutely! We specialize in ecommerce migrations. We'll transfer your products, customers, orders, and content while preserving SEO rankings. Migration services start at $1,499 depending on store size and complexity.",
  },
  {
    question: 'What payment methods will my store accept?',
    answer:
      'We integrate multiple payment gateways including Stripe, PayPal, Square, and local payment methods. Your store will accept credit cards, digital wallets (Apple Pay, Google Pay), bank transfers, and buy-now-pay-later options like Klarna.',
  },
  {
    question: 'Is my ecommerce store secure and PCI compliant?',
    answer:
      'Security is our top priority. All stores include SSL certificates, PCI compliance setup, regular security updates, malware protection, and secure payment processing. We follow industry best practices for data protection.',
  },
  {
    question: 'Will my store be mobile-friendly?',
    answer:
      'Yes! All our stores are fully responsive and mobile-optimized. We also offer Progressive Web App (PWA) capabilities for app-like mobile experiences, push notifications, and offline functionality.',
  },
  {
    question: 'Do you provide SEO optimization?',
    answer:
      'Every store includes comprehensive SEO setup: optimized URLs, meta tags, schema markup, sitemap generation, page speed optimization, and Google Analytics integration. We also offer ongoing SEO services for continued growth.',
  },
  {
    question:
      'What if I need custom features not included in standard packages?',
    answer:
      "We offer custom development for unique requirements. Whether it's special integrations, custom checkout flows, or advanced functionality, our team can build exactly what you need. Custom features are quoted separately.",
  },
];

const EcommerceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className='bg-gradient-to-br from-slate-50 dark:from-slate-900 to-blue-50/30 dark:to-blue-950/30 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 text-gray-300'>
              <HelpCircle className='mr-2 w-4 h-4' />
              Common Questions
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Frequently Asked Questions
              </span>
            </h2>

            <p className='text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Everything you need to know about our ecommerce development
              services
            </p>
          </motion.div>

          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 overflow-hidden'>
                  <CardContent className='p-0'>
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className='flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-700/50 p-6 w-full text-left transition-colors'>
                      <h3 className='pr-4 font-semibold text-slate-900 dark:text-white text-lg'>
                        {faq.question}
                      </h3>
                      <div className='flex-shrink-0'>
                        {openIndex === index ? (
                          <Minus className='w-5 h-5 text-slate-500' />
                        ) : (
                          <Plus className='w-5 h-5 text-slate-500' />
                        )}
                      </div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: openIndex === index ? 'auto' : 0,
                        opacity: openIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'>
                      <div className='px-6 pb-6'>
                        <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommerceFAQ;
