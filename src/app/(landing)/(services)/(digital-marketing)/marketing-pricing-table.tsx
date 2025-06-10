'use client';

import { motion } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Target,
  Settings,
  Facebook,
  Music,
  Linkedin,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  Globe,
  MousePointer,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';

// Digital marketing services data
const marketingServices = [
  {
    id: 'local-seo',
    name: 'Local SEO',
    icon: Search,
    description: 'Dominate local search results and attract nearby customers',
    price: { starter: 299, professional: 499, enterprise: 799 },
    popular: 'professional',
    color: 'from-blue-600 to-blue-700',
    bgGradient: 'from-blue-500/10 via-blue-600/5 to-purple-500/10',
    features: {
      starter: [
        'Google My Business optimization',
        'Local keyword research',
        'NAP citation building (25)',
        'Local directory submissions',
        'Monthly ranking reports',
        'Review management setup',
      ],
      professional: [
        'Everything in Starter',
        'Advanced GMB optimization',
        'Local keyword targeting (50)',
        'NAP citation building (50)',
        'Local content creation',
        'Competitor analysis',
        'Local link building',
        'Monthly performance calls',
      ],
      enterprise: [
        'Everything in Professional',
        'Multi-location SEO',
        'Advanced local content strategy',
        'NAP citation building (100)',
        'Local PR outreach',
        'Advanced review management',
        'Custom landing pages',
        'Dedicated account manager',
      ],
    },
  },
  {
    id: 'ecommerce-seo',
    name: 'E-commerce SEO',
    icon: ShoppingCart,
    description: 'Boost online sales with specialized e-commerce optimization',
    price: { starter: 599, professional: 999, enterprise: 1499 },
    popular: 'professional',
    color: 'from-emerald-600 to-emerald-700',
    bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-green-500/10',
    features: {
      starter: [
        'Product page optimization',
        'Category page SEO',
        'Technical SEO audit',
        'Schema markup implementation',
        'Basic link building',
        'Monthly reports',
      ],
      professional: [
        'Everything in Starter',
        'Advanced product optimization',
        'Content marketing strategy',
        'Conversion rate optimization',
        'Advanced technical SEO',
        'Competitor analysis',
        'Shopping campaign setup',
        'Bi-weekly consultations',
      ],
      enterprise: [
        'Everything in Professional',
        'Enterprise-level optimization',
        'Advanced analytics setup',
        'Multi-platform integration',
        'Custom development work',
        'Priority support',
        'Dedicated team',
        'Weekly strategy calls',
      ],
    },
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    icon: Target,
    description: 'Get immediate visibility and drive qualified traffic',
    price: { starter: 399, professional: 699, enterprise: 1299 },
    popular: 'professional',
    color: 'from-orange-600 to-orange-700',
    bgGradient: 'from-orange-500/10 via-orange-600/5 to-red-500/10',
    features: {
      starter: [
        'Campaign setup & optimization',
        'Keyword research & targeting',
        'Ad copy creation (10 ads)',
        'Landing page recommendations',
        'Conversion tracking setup',
        'Monthly performance reports',
      ],
      professional: [
        'Everything in Starter',
        'Advanced campaign strategies',
        'A/B testing & optimization',
        'Ad copy creation (25 ads)',
        'Audience targeting',
        'Remarketing campaigns',
        'Bi-weekly optimization',
        'Phone consultation calls',
      ],
      enterprise: [
        'Everything in Professional',
        'Multi-campaign management',
        'Advanced audience strategies',
        'Custom ad creatives',
        'Shopping & display campaigns',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Weekly strategy sessions',
      ],
    },
  },
  {
    id: 'technical-seo',
    name: 'Technical SEO',
    icon: Settings,
    description: 'Fix technical issues and optimize site performance',
    price: { starter: 499, professional: 799, enterprise: 1199 },
    popular: 'professional',
    color: 'from-purple-600 to-purple-700',
    bgGradient: 'from-purple-500/10 via-purple-600/5 to-pink-500/10',
    features: {
      starter: [
        'Technical SEO audit',
        'Site speed optimization',
        'Mobile optimization',
        'Basic schema markup',
        'XML sitemap optimization',
        'Robots.txt optimization',
      ],
      professional: [
        'Everything in Starter',
        'Advanced technical fixes',
        'Core Web Vitals optimization',
        'Advanced schema implementation',
        'Internal linking strategy',
        'Crawl budget optimization',
        'Server optimization',
        'Monthly technical reviews',
      ],
      enterprise: [
        'Everything in Professional',
        'Enterprise-level optimization',
        'Custom development work',
        'Advanced performance tuning',
        'Multi-site optimization',
        'CDN setup & optimization',
        'Priority technical support',
        'Dedicated technical specialist',
      ],
    },
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    icon: Facebook,
    description: 'Reach your audience on Facebook and Instagram',
    price: { starter: 349, professional: 599, enterprise: 999 },
    popular: 'professional',
    color: 'from-blue-500 to-purple-600',
    bgGradient: 'from-blue-500/10 via-purple-500/5 to-pink-500/10',
    features: {
      starter: [
        'Campaign setup & targeting',
        'Audience research',
        'Ad creative design (5 creatives)',
        'A/B testing basics',
        'Performance tracking',
        'Monthly reports',
      ],
      professional: [
        'Everything in Starter',
        'Advanced targeting strategies',
        'Custom audience creation',
        'Ad creative design (15 creatives)',
        'Retargeting campaigns',
        'Lookalike audiences',
        'Conversion optimization',
        'Bi-weekly consultations',
      ],
      enterprise: [
        'Everything in Professional',
        'Multi-platform campaigns',
        'Advanced creative testing',
        'Video ad production',
        'Advanced analytics',
        'Custom conversion tracking',
        'Dedicated creative team',
        'Weekly strategy calls',
      ],
    },
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    icon: Music,
    description: 'Engage younger audiences with creative video campaigns',
    price: { starter: 399, professional: 699, enterprise: 1099 },
    popular: 'professional',
    color: 'from-pink-600 to-purple-700',
    bgGradient: 'from-pink-500/10 via-purple-500/5 to-indigo-500/10',
    features: {
      starter: [
        'Campaign setup & optimization',
        'Audience targeting',
        'Creative strategy (5 videos)',
        'Hashtag research',
        'Performance tracking',
        'Monthly reports',
      ],
      professional: [
        'Everything in Starter',
        'Advanced creative production',
        'Influencer collaboration setup',
        'Creative strategy (15 videos)',
        'Advanced targeting',
        'Trend monitoring',
        'A/B testing optimization',
        'Bi-weekly reviews',
      ],
      enterprise: [
        'Everything in Professional',
        'Custom video production',
        'Brand partnership facilitation',
        'Advanced analytics',
        'Multi-campaign management',
        'Trend prediction insights',
        'Dedicated creative director',
        'Weekly creative sessions',
      ],
    },
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    icon: Linkedin,
    description: 'Target professionals and B2B decision makers',
    price: { starter: 449, professional: 749, enterprise: 1199 },
    popular: 'professional',
    color: 'from-blue-700 to-blue-800',
    bgGradient: 'from-blue-600/10 via-blue-700/5 to-indigo-500/10',
    features: {
      starter: [
        'Campaign setup & targeting',
        'Professional audience research',
        'Ad copy creation (8 ads)',
        'Lead generation setup',
        'Basic reporting',
        'Monthly performance review',
      ],
      professional: [
        'Everything in Starter',
        'Advanced B2B targeting',
        'LinkedIn Sales Navigator integration',
        'Ad copy creation (20 ads)',
        'Account-based marketing',
        'Advanced lead qualification',
        'CRM integration',
        'Bi-weekly strategy calls',
      ],
      enterprise: [
        'Everything in Professional',
        'Enterprise targeting strategies',
        'Custom audience development',
        'Advanced lead nurturing',
        'Multi-touch attribution',
        'Sales team training',
        'Dedicated B2B specialist',
        'Weekly performance reviews',
      ],
    },
  },
];

const MarketingServicesPricing = () => {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-16 text-center'>
            <Badge className='bg-gradient-to-r from-blue-100 dark:from-blue-900/20 to-purple-100 dark:to-purple-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <TrendingUp className='mr-2 w-4 h-4' />
              Digital Marketing Services
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-purple-900 dark:to-purple-100 text-transparent'>
                Grow Your Business Online
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Professional digital marketing services designed to increase your
              visibility, drive traffic, and grow your revenue
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className='gap-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            {marketingServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden',
                )}>
                {/* Background gradient */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20',
                    service.bgGradient,
                  )}
                />

                <div className='relative'>
                  {/* Service Header */}
                  <div className='mb-6'>
                    <div
                      className={cn(
                        'inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r mb-4',
                        service.color,
                      )}>
                      <service.icon className='w-6 h-6 text-white' />
                    </div>

                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                      {service.name}
                    </h3>
                    <p className='text-slate-600 dark:text-slate-300 text-sm'>
                      {service.description}
                    </p>
                  </div>

                  {/* Pricing Tiers */}
                  <div className='space-y-4'>
                    {Object.entries(service.price).map(([tier, price]) => (
                      <div
                        key={tier}
                        className={cn(
                          'p-4 rounded-xl border transition-all duration-300',
                          service.popular === tier
                            ? 'bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-blue-950/20 border-blue-300 dark:border-blue-700'
                            : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700',
                        )}>
                        <div className='flex justify-between items-center mb-3'>
                          <div>
                            <h4 className='font-semibold text-slate-900 dark:text-white capitalize'>
                              {tier}
                            </h4>
                            {service.popular === tier && (
                              <Badge className='bg-blue-600 mt-1 text-white text-xs'>
                                <Sparkles className='mr-1 w-3 h-3' />
                                Most Popular
                              </Badge>
                            )}
                          </div>
                          <div className='text-right'>
                            <div className='font-bold text-slate-900 dark:text-white text-lg'>
                              ${price}
                            </div>
                            <div className='text-slate-500 text-xs'>
                              per month
                            </div>
                          </div>
                        </div>

                        <div className='space-y-1'>
                          {service.features[
                            tier as keyof typeof service.features
                          ]
                            ?.slice(0, 4)
                            .map((feature, idx) => (
                              <div key={idx} className='flex items-start gap-2'>
                                <CheckCircle className='flex-shrink-0 mt-0.5 w-3 h-3 text-green-600 dark:text-green-400' />
                                <span className='text-slate-600 dark:text-slate-300 text-xs'>
                                  {feature}
                                </span>
                              </div>
                            ))}
                        </div>

                        <Button
                          className={cn(
                            'w-full mt-4',
                            service.popular === tier
                              ? `bg-gradient-to-r ${service.color} text-white border-0`
                              : 'bg-white/80 dark:bg-slate-800/80',
                          )}
                          size='sm'>
                          {service.popular === tier ? (
                            <>
                              Get Started
                              <ArrowRight className='ml-2 w-4 h-4' />
                            </>
                          ) : (
                            'Learn More'
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 mt-16 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl text-center'>
            <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              Not Sure Which Service is Right for You?
            </h3>
            <p className='mb-6 text-slate-600 dark:text-slate-300'>
              Get a free consultation and custom strategy recommendation
            </p>
            <div className='flex sm:flex-row flex-col justify-center gap-4'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                <Users className='mr-2 w-5 h-5' />
                Free Strategy Call
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                <BarChart3 className='mr-2 w-5 h-5' />
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default MarketingServicesPricing;
