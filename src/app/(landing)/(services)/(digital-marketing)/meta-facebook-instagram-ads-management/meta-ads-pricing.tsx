'use client';

import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Target,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';

const metaAdsTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: 399,
    adSpend: 'Up to $1,500',
    description: 'Perfect for small businesses and startups',
    popular: false,
    features: [
      'Facebook & Instagram ads setup',
      'Audience research & targeting',
      'Ad creative design (5 creatives)',
      'Campaign optimization',
      'A/B testing basics',
      'Performance tracking',
      'Monthly reports',
      'Email support',
    ],
    results: {
      'Avg. CTR': '2.8%',
      'Engagement Rate': '4.2%',
      'Cost per Lead': '-30%',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 699,
    adSpend: 'Up to $4,000',
    description: 'Most popular for growing businesses',
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced targeting strategies',
      'Ad creative design (15 creatives)',
      'Custom audience creation',
      'Retargeting campaigns',
      'Lookalike audiences',
      'Video ad creation',
      'Bi-weekly consultations',
      'Phone & email support',
    ],
    results: {
      'Avg. CTR': '3.6%',
      'Engagement Rate': '6.1%',
      'Cost per Lead': '-45%',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 1199,
    adSpend: '$4,000+',
    description: 'For large businesses and agencies',
    popular: false,
    features: [
      'Everything in Professional',
      'Advanced creative testing',
      'Custom video production',
      'Multi-platform campaigns',
      'Advanced analytics',
      'Conversion API setup',
      'Custom audiences & events',
      'Dedicated account manager',
      'Weekly strategy calls',
      'Priority support',
    ],
    results: {
      'Avg. CTR': '4.4%',
      'Engagement Rate': '7.8%',
      'Cost per Lead': '-55%',
    },
  },
];

const MetaAdsPricing = () => {
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
            <Badge className='bg-gradient-to-r from-blue-100 dark:from-blue-900/20 to-purple-100 dark:to-purple-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <Facebook className='mr-2 w-4 h-4' />
              Meta Ads Management
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-purple-900 dark:to-purple-100 text-transparent'>
                Facebook & Instagram Ads
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Reach your target audience on Facebook and Instagram with engaging
              ad campaigns that drive results and grow your business
            </p>

            {/* Platform Icons */}
            <div className='flex justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Facebook className='w-6 h-6 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300'>
                  Facebook
                </span>
              </div>
              <div className='bg-slate-300 rounded-full w-1 h-1'></div>
              <div className='flex items-center gap-2'>
                <Instagram className='w-6 h-6 text-pink-600' />
                <span className='text-slate-600 dark:text-slate-300'>
                  Instagram
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className='gap-8 grid grid-cols-1 md:grid-cols-3 mb-12'>
            {metaAdsTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'relative p-8 rounded-2xl border transition-all duration-300',
                  tier.popular
                    ? 'bg-white dark:bg-slate-800 border-purple-500 shadow-xl scale-105'
                    : 'bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:shadow-lg',
                )}>
                {tier.popular && (
                  <div className='top-0 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 transform'>
                    <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
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

                  <div className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 px-3 py-1 border border-purple-200 dark:border-purple-800 rounded-full'>
                    <span className='font-medium text-purple-700 dark:text-purple-300 text-sm'>
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
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
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

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
            <h3 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl text-center'>
              Why Choose Our Meta Ads Management?
            </h3>

            <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {[
                {
                  icon: Target,
                  title: 'Precise Targeting',
                  description:
                    'Reach the right audience with advanced targeting options',
                },
                {
                  icon: Palette,
                  title: 'Creative Design',
                  description:
                    'Eye-catching visuals that stop the scroll and convert',
                },
                {
                  icon: Users,
                  title: 'Audience Building',
                  description:
                    'Custom and lookalike audiences for better reach',
                },
                {
                  icon: Eye,
                  title: 'Performance Focus',
                  description: 'Continuous optimization for maximum ROI',
                },
              ].map((item, idx) => (
                <div key={idx} className='text-center'>
                  <div className='inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-full w-12 h-12'>
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
                <Facebook className='mr-2 w-5 h-5' />
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

export default MetaAdsPricing;
