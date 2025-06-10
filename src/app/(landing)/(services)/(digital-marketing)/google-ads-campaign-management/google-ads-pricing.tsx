'use client';

import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  MousePointer,
  Eye,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';

const googleAdsTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: 499,
    adSpend: 'Up to $2,000',
    description: 'Perfect for small businesses getting started',
    popular: false,
    features: [
      'Google Ads account setup',
      'Keyword research & strategy',
      'Up to 2 campaigns',
      'Ad copy creation (10 ads)',
      'Landing page recommendations',
      'Conversion tracking setup',
      'Monthly performance reports',
      'Email support',
    ],
    results: {
      'Avg. CTR': '3.2%',
      'Conversion Rate': '4.1%',
      'Cost Reduction': '25%',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 899,
    adSpend: 'Up to $5,000',
    description: 'Most popular for growing businesses',
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 5 campaigns',
      'Advanced keyword targeting',
      'Ad copy creation (25 ads)',
      'A/B testing & optimization',
      'Audience targeting setup',
      'Remarketing campaigns',
      'Bi-weekly optimization calls',
      'Phone & email support',
    ],
    results: {
      'Avg. CTR': '4.8%',
      'Conversion Rate': '6.3%',
      'Cost Reduction': '35%',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 1499,
    adSpend: '$5,000+',
    description: 'For large businesses and high ad spend',
    popular: false,
    features: [
      'Everything in Professional',
      'Unlimited campaigns',
      'Shopping & display campaigns',
      'Advanced audience strategies',
      'Custom ad creatives',
      'Competitor analysis',
      'Advanced analytics & reporting',
      'Dedicated account manager',
      'Weekly strategy sessions',
      'Priority support',
    ],
    results: {
      'Avg. CTR': '5.9%',
      'Conversion Rate': '8.2%',
      'Cost Reduction': '45%',
    },
  },
];

const GoogleAdsPricing = () => {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-16 text-center'>
            <Badge className='bg-blue-100 dark:bg-blue-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <Target className='mr-2 w-4 h-4' />
              Google Ads Management
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Professional Google Ads Management
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Get immediate visibility on Google and drive qualified traffic to
              your website with our expert Google Ads management services
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Target className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  Google Certified Partners
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <TrendingUp className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  Average 35% Cost Reduction
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  200+ Successful Campaigns
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className='gap-8 grid grid-cols-1 md:grid-cols-3 mb-12'>
            {googleAdsTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'relative p-8 rounded-2xl border transition-all duration-300',
                  tier.popular
                    ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-xl scale-105'
                    : 'bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:shadow-lg',
                )}>
                {tier.popular && (
                  <div className='top-0 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 transform'>
                    <Badge className='bg-blue-600 text-white'>
                      <Sparkles className='mr-1 w-3 h-3' />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className='mb-6 text-center'>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                    {tier.name}
                  </h3>
                  <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
                    {tier.description}
                  </p>

                  <div className='mb-2'>
                    <span className='font-bold text-slate-900 dark:text-white text-4xl'>
                      ${tier.price}
                    </span>
                    <span className='text-slate-500 text-sm'>/month</span>
                  </div>

                  <div className='bg-blue-50 dark:bg-blue-950/20 px-3 py-1 border border-blue-200 dark:border-blue-800 rounded-full'>
                    <span className='font-medium text-blue-700 dark:text-blue-300 text-sm'>
                      {tier.adSpend} ad spend
                    </span>
                  </div>
                </div>

                <div className='space-y-3 mb-6'>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className='flex items-start gap-3'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-600 dark:text-green-400' />
                      <span className='text-slate-600 dark:text-slate-300 text-sm'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className='bg-slate-50 dark:bg-slate-900/50 mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg'>
                  <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                    Expected Results
                  </h4>
                  <div className='space-y-2'>
                    {Object.entries(tier.results).map(([metric, value]) => (
                      <div
                        key={metric}
                        className='flex justify-between items-center'>
                        <span className='text-slate-600 dark:text-slate-400 text-xs'>
                          {metric}
                        </span>
                        <span className='font-bold text-slate-900 dark:text-white text-sm'>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className={cn(
                    'w-full',
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600',
                  )}
                  size='lg'>
                  {tier.popular ? (
                    <>
                      Get Started Now
                      <ArrowRight className='ml-2 w-4 h-4' />
                    </>
                  ) : (
                    'Choose Plan'
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* What's Included Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
            <h3 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl text-center'>
              Why Choose Our Google Ads Management?
            </h3>

            <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {[
                {
                  icon: Target,
                  title: 'Certified Experts',
                  description:
                    'Google Ads certified professionals managing your campaigns',
                },
                {
                  icon: BarChart3,
                  title: 'Data-Driven',
                  description:
                    'Decisions based on real performance data and analytics',
                },
                {
                  icon: DollarSign,
                  title: 'Cost Effective',
                  description: 'Maximize ROI and reduce wasted ad spend',
                },
                {
                  icon: Clock,
                  title: 'Ongoing Optimization',
                  description:
                    'Continuous monitoring and optimization for best results',
                },
              ].map((item, idx) => (
                <div key={idx} className='text-center'>
                  <div className='inline-flex justify-center items-center bg-blue-600 mb-4 rounded-full w-12 h-12'>
                    <item.icon className='w-6 h-6 text-white' />
                  </div>
                  <h4 className='mb-2 font-semibold text-slate-900 dark:text-white'>
                    {item.title}
                  </h4>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className='flex sm:flex-row flex-col justify-center gap-4 mt-8'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                <Target className='mr-2 w-5 h-5' />
                Start Your Campaign
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                <Users className='mr-2 w-5 h-5' />
                Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default GoogleAdsPricing;
