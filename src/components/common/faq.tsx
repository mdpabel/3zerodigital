'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  Sparkles,
  Code,
  Shield,
  Clock,
  DollarSign,
  Settings,
  TrendingUp,
  Video,
  Palette,
  MessageSquare,
  Phone,
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  Users,
  Star,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '../common/component-wrapper';

// FAQ Categories and Questions
const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: HelpCircle,
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'development',
    name: 'Web Development',
    icon: Code,
    color: 'from-purple-600 to-purple-700',
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: DollarSign,
    color: 'from-emerald-600 to-emerald-700',
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    color: 'from-orange-600 to-orange-700',
  },
  {
    id: 'support',
    name: 'Support',
    icon: Settings,
    color: 'from-indigo-600 to-indigo-700',
  },
];

const faqData = [
  // General Questions
  {
    id: 1,
    category: 'general',
    question: 'What makes 3Zero Digital different from other agencies?',
    answer:
      'Our unique "3Zero Promise" ensures zero vulnerabilities, zero downtime, and zero errors in every project. We combine cutting-edge technology with rigorous security protocols and 24/7 monitoring to deliver websites that are not just beautiful, but bulletproof.',
  },
  {
    id: 2,
    category: 'general',
    question: 'How long does it take to complete a project?',
    answer:
      'Project timelines vary based on complexity: Simple websites (2-4 weeks), Standard projects (4-8 weeks), Complex applications (8+ weeks). We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
  },
  {
    id: 3,
    category: 'general',
    question: 'Do you work with businesses of all sizes?',
    answer:
      'Yes! We work with startups, small businesses, and enterprise clients. Our solutions scale with your business needs, from simple landing pages to complex e-commerce platforms and enterprise applications.',
  },
  {
    id: 4,
    category: 'general',
    question: 'What technologies do you use?',
    answer:
      'We use modern, industry-leading technologies including Next.js, React, WordPress, Shopify, MERN stack, and headless CMS solutions. We choose the best technology stack based on your specific project requirements.',
  },

  // Web Development Questions
  {
    id: 5,
    category: 'development',
    question: 'Can you redesign my existing website?',
    answer:
      'Absolutely! We specialize in website redesigns and can migrate your existing content while improving design, performance, and security. We ensure zero downtime during the migration process.',
  },
  {
    id: 6,
    category: 'development',
    question: 'Do you build mobile-responsive websites?',
    answer:
      'All our websites are built mobile-first and are fully responsive across all devices. We test on multiple screen sizes and browsers to ensure a perfect user experience everywhere.',
  },
  {
    id: 7,
    category: 'development',
    question: 'Can you integrate with my existing systems?',
    answer:
      'Yes, we have extensive experience integrating with CRMs, payment gateways, inventory systems, APIs, and third-party services. We ensure seamless data flow between your website and existing business tools.',
  },
  {
    id: 8,
    category: 'development',
    question: 'Do you provide e-commerce solutions?',
    answer:
      'We build custom e-commerce solutions using Shopify, WooCommerce, and custom platforms. Our e-commerce sites include secure payment processing, inventory management, and conversion optimization.',
  },

  // Pricing Questions
  {
    id: 9,
    category: 'pricing',
    question: 'How much does a website cost?',
    answer:
      'Pricing varies based on complexity: Basic websites start at $2,500, Standard projects range from $5,000-$15,000, and Premium applications start at $15,000+. We provide detailed quotes after understanding your specific requirements.',
  },
  {
    id: 10,
    category: 'pricing',
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible payment options including 50% upfront and 50% on completion, or monthly payment plans for larger projects. We work with you to find a payment structure that fits your budget.',
  },
  {
    id: 11,
    category: 'pricing',
    question: "What's included in your pricing?",
    answer:
      'Our pricing includes design, development, testing, security setup, basic SEO optimization, training, and 30 days of post-launch support. Additional features like ongoing maintenance and advanced SEO are available separately.',
  },
  {
    id: 12,
    category: 'pricing',
    question: 'Are there any hidden fees?',
    answer:
      'No hidden fees, ever. We provide transparent, detailed quotes that include all costs. The only additional costs would be optional add-ons or changes to the original scope that you specifically request.',
  },

  // Security Questions
  {
    id: 13,
    category: 'security',
    question: 'How do you ensure website security?',
    answer:
      'We implement enterprise-grade security including SSL certificates, regular security audits, malware scanning, firewall protection, secure coding practices, and regular updates. Our "0 Vulnerabilities" promise means we take security seriously.',
  },
  {
    id: 14,
    category: 'security',
    question: 'Do you provide website backups?',
    answer:
      'Yes, we implement automated daily backups with multiple restore points. Your data is stored securely and can be quickly restored if needed. This is part of our "0 Downtime" guarantee.',
  },
  {
    id: 15,
    category: 'security',
    question: 'What if my website gets hacked?',
    answer:
      'While our security measures prevent most attacks, if issues occur, we provide immediate response within 1 hour for security emergencies, complete malware removal, and security hardening at no additional cost.',
  },

  // Support Questions
  {
    id: 16,
    category: 'support',
    question: 'Do you provide ongoing maintenance?',
    answer:
      'Yes, we offer comprehensive maintenance packages starting at $299/month including updates, security monitoring, backups, performance optimization, and priority support.',
  },
  {
    id: 17,
    category: 'support',
    question: 'How quickly do you respond to support requests?',
    answer:
      'We guarantee response times of: Emergency issues (1 hour), Urgent requests (4 hours), Standard requests (24 hours). Our support team is available 24/7 for critical issues.',
  },
  {
    id: 18,
    category: 'support',
    question: 'Can you train our team to manage the website?',
    answer:
      'Absolutely! We provide comprehensive training sessions, detailed documentation, and video tutorials. We ensure your team feels confident managing content, basic updates, and day-to-day operations.',
  },
  {
    id: 19,
    category: 'support',
    question: 'What happens after the website launches?',
    answer:
      'We provide 30 days of free post-launch support, monitor for any issues, and are available for ongoing maintenance. We also offer training and can provide long-term support packages.',
  },
];

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on category and search
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedCategoryData = faqCategories.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
              Frequently Asked Questions
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Got Questions?
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Find answers to common questions about our services, pricing, and
              processes. Can't find what you're looking for? We're here to help.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='mb-8'>
            <div className='relative mx-auto max-w-xl'>
              <Search className='top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform' />
              <Input
                type='text'
                placeholder='Search questions...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md pl-10 border border-slate-200/50 dark:border-slate-700/50'
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-12'>
            <div className='flex flex-wrap justify-center gap-3'>
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300',
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                    : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300',
                )}>
                <Globe className='w-4 h-4' />
                All Questions
              </button>

              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300',
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white border-transparent`
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300',
                  )}>
                  <category.icon className='w-4 h-4' />
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='space-y-4'>
            {filteredFAQs.length === 0 ? (
              <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-center'>
                <Search className='mx-auto mb-4 w-12 h-12 text-slate-400' />
                <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                  No questions found
                </h3>
                <p className='text-slate-600 dark:text-slate-300'>
                  Try adjusting your search or browse different categories.
                </p>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className='hover:bg-white/50 dark:hover:bg-slate-800/50 p-6 w-full text-left transition-colors duration-200'>
                    <div className='flex justify-between items-start gap-4'>
                      <div className='flex-1'>
                        <h3 className='mb-1 font-bold text-slate-900 dark:text-white text-lg'>
                          {faq.question}
                        </h3>
                        {selectedCategoryData && (
                          <Badge
                            className={cn(
                              'bg-gradient-to-r text-white border-0 text-xs',
                              selectedCategoryData.color,
                            )}>
                            <selectedCategoryData.icon className='mr-1 w-3 h-3' />
                            {selectedCategoryData.name}
                          </Badge>
                        )}
                      </div>

                      <motion.div
                        animate={{
                          rotate: openItems.includes(faq.id) ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className='flex-shrink-0'>
                        <ChevronDown className='w-6 h-6 text-slate-500' />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'>
                        <div className='px-6 pb-6 border-slate-200/30 dark:border-slate-700/30 border-t'>
                          <p className='pt-4 text-slate-600 dark:text-slate-300 leading-relaxed'>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='mt-16'>
            <div className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 shadow-xl backdrop-blur-md p-8 md:p-12 border border-blue-200/50 dark:border-blue-800/50 rounded-3xl text-center'>
              <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                Still have questions?
              </h3>

              <p className='mx-auto mb-8 max-w-2xl text-slate-600 dark:text-slate-300 text-lg'>
                Can't find the answer you're looking for? Our team is here to
                help. Get in touch for a free consultation and personalized
                answers.
              </p>

              <div className='flex sm:flex-row flex-col justify-center gap-4'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                  <MessageSquare className='mr-2 w-5 h-5' />
                  Contact Us
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <Button
                  variant='outline'
                  size='lg'
                  className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                  <Phone className='mr-2 w-5 h-5' />
                  Schedule Call
                </Button>
              </div>

              {/* Trust indicators */}
              <div className='flex flex-wrap justify-center items-center gap-6 mt-8'>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <CheckCircle className='w-4 h-4 text-green-600' />
                  <span className='text-sm'>Free consultation</span>
                </div>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Clock className='w-4 h-4 text-blue-600' />
                  <span className='text-sm'>24hr response</span>
                </div>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Star className='w-4 h-4 text-yellow-500' />
                  <span className='text-sm'>5-star service</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default FAQ;
