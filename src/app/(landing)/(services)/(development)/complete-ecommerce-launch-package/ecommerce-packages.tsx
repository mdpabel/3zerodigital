'use client';

import { motion } from 'framer-motion';
import {
  Check,
  Star,
  Zap,
  Crown,
  ShoppingCart,
  Palette,
  Code2,
  HeartHandshake,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const packages = [
  {
    id: 'starter',
    name: 'Starter Store',
    description: 'Perfect for small businesses getting started',
    icon: ShoppingCart,
    color: 'from-green-600 to-green-700',
    bgGradient: 'from-green-500/10 via-green-600/5 to-emerald-500/10',
    price: 2999,
    originalPrice: 3999,
    timeline: '7-10 days',
    features: [
      'Up to 50 products',
      'Basic payment integration',
      'Mobile-responsive design',
      'SSL certificate',
      'Basic SEO setup',
      'Contact forms',
      '30 days support',
      'Training session',
    ],
    notIncluded: [
      'Custom integrations',
      'Advanced analytics',
      'Multi-language support',
    ],
    bestFor: 'Small businesses, startups, local stores',
    guarantee: '30-day money back',
    support: '30 days',
  },
  {
    id: 'professional',
    name: 'Professional Store',
    description: 'Full-featured store for growing businesses',
    icon: Palette,
    color: 'from-blue-600 to-blue-700',
    bgGradient: 'from-blue-500/10 via-blue-600/5 to-indigo-500/10',
    price: 4999,
    originalPrice: 6999,
    timeline: '10-14 days',
    popular: true,
    features: [
      'Unlimited products',
      'Advanced payment options',
      'Custom design',
      'Advanced SEO',
      'Analytics integration',
      'Email marketing setup',
      'Social media integration',
      'Inventory management',
      '90 days support',
      'Training & documentation',
    ],
    notIncluded: ['Custom app development', 'Multi-vendor features'],
    bestFor: 'Growing businesses, established brands',
    guarantee: '60-day money back',
    support: '90 days',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Store',
    description: 'Complete solution for large-scale operations',
    icon: Crown,
    color: 'from-purple-600 to-purple-700',
    bgGradient: 'from-purple-500/10 via-purple-600/5 to-pink-500/10',
    price: 8999,
    originalPrice: 12999,
    timeline: '14-21 days',
    premium: true,
    features: [
      'Everything in Professional',
      'Custom functionality',
      'Multi-vendor support',
      'Advanced analytics',
      'API integrations',
      'Performance optimization',
      'Security hardening',
      'Load balancing setup',
      '180 days support',
      'Dedicated project manager',
      'Priority support',
    ],
    notIncluded: [],
    bestFor: 'Large businesses, enterprises, complex requirements',
    guarantee: '90-day money back',
    support: '180 days',
  },
  {
    id: 'custom',
    name: 'Custom Solution',
    description: 'Tailored solution for unique requirements',
    icon: Code2,
    color: 'from-orange-600 to-orange-700',
    bgGradient: 'from-orange-500/10 via-orange-600/5 to-red-500/10',
    price: null,
    timeline: 'Custom',
    features: [
      'Fully custom development',
      'Unlimited revisions',
      'Custom integrations',
      'Advanced features',
      'Scalable architecture',
      'Performance optimization',
      'Security audit',
      'Ongoing maintenance',
      '1 year support',
      'Dedicated team',
    ],
    notIncluded: [],
    bestFor: 'Unique requirements, complex businesses',
    guarantee: 'Custom terms',
    support: '1 year',
  },
];

const EcommercePackages = () => {
  return (
    <section className='bg-white dark:bg-slate-900 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50'>
              <HeartHandshake className='mr-2 w-4 h-4' />
              Package Options
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Choose Your Package
              </span>
            </h2>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Transparent pricing with no hidden fees. All packages include our
              3Zero guarantee
            </p>
          </motion.div>

          {/* Packages Grid */}
          <div className='gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'relative',
                  pkg.popular && 'xl:scale-105 xl:-mt-4',
                )}>
                <Card
                  className={cn(
                    'relative overflow-hidden border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md hover:shadow-xl transition-all duration-300 group h-full',
                    pkg.popular &&
                      'border-blue-500/50 dark:border-blue-400/50 shadow-lg',
                  )}>
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className='-top-4 left-1/2 absolute -translate-x-1/2 transform'>
                      <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-white'>
                        <Star className='mr-1 w-3 h-3' />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Premium Badge */}
                  {pkg.premium && (
                    <div className='-top-4 left-1/2 absolute -translate-x-1/2 transform'>
                      <Badge className='bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-white'>
                        <Crown className='mr-1 w-3 h-3' />
                        Premium
                      </Badge>
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20',
                      pkg.bgGradient,
                    )}
                  />

                  <CardHeader className='relative pb-4 text-center'>
                    <div
                      className={cn(
                        'w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r flex items-center justify-center shadow-lg',
                        pkg.color,
                      )}>
                      <pkg.icon className='w-8 h-8 text-white' />
                    </div>

                    <CardTitle className='mb-2 text-slate-900 dark:text-white text-xl'>
                      {pkg.name}
                    </CardTitle>

                    <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
                      {pkg.description}
                    </p>

                    {/* Pricing */}
                    <div className='mb-4'>
                      {pkg.price ? (
                        <>
                          <div className='flex justify-center items-center gap-2 mb-2'>
                            <span className='font-bold text-slate-900 dark:text-white text-3xl'>
                              \(${pkg.price.toLocaleString()}\)
                            </span>
                            {pkg.originalPrice && (
                              <span className='text-slate-500 text-lg line-through'>
                                \(${pkg.originalPrice.toLocaleString()}\)
                              </span>
                            )}
                          </div>
                          {pkg.originalPrice && (
                            <Badge className='bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'>
                              Save \($
                              {(pkg.originalPrice - pkg.price).toLocaleString()}
                              \)
                            </Badge>
                          )}
                        </>
                      ) : (
                        <div className='font-bold text-slate-900 dark:text-white text-2xl'>
                          Custom Quote
                        </div>
                      )}
                    </div>

                    <div className='text-slate-500 dark:text-slate-400 text-sm'>
                      Timeline: {pkg.timeline}
                    </div>
                  </CardHeader>

                  <CardContent className='relative space-y-6'>
                    {/* Features */}
                    <div>
                      <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                        What's Included
                      </h4>
                      <div className='space-y-2'>
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className='flex items-start gap-2'>
                            <Check className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-600 dark:text-green-400' />
                            <span className='text-slate-600 dark:text-slate-300 text-sm'>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best For */}
                    <div className='bg-slate-50/50 dark:bg-slate-900/50 p-3 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                      <div className='mb-1 font-medium text-slate-500 dark:text-slate-400 text-xs'>
                        BEST FOR
                      </div>
                      <div className='text-slate-700 dark:text-slate-200 text-sm'>
                        {pkg.bestFor}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className='pt-4'>
                      <Button
                        asChild
                        className={cn(
                          'w-full bg-gradient-to-r text-white border-0',
                          pkg.color,
                        )}>
                        <Link
                          href={`/contact?service=ecommerce&package=${pkg.id}`}>
                          {pkg.price ? 'Get Started' : 'Get Quote'}
                        </Link>
                      </Button>

                      <div className='mt-3 text-center'>
                        <div className='text-slate-500 dark:text-slate-400 text-xs'>
                          {pkg.guarantee} • {pkg.support} support
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-12 text-center'>
            <div className='bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-purple-50 dark:to-purple-950/30 p-8 border border-blue-200/30 dark:border-blue-800/30 rounded-2xl'>
              <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-xl'>
                All Packages Include Our 3Zero Guarantee
              </h3>
              <div className='gap-6 grid grid-cols-1 md:grid-cols-3 mb-6'>
                <div className='text-center'>
                  <div className='flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-3 rounded-full w-12 h-12'>
                    <Zap className='w-6 h-6 text-white' />
                  </div>
                  <div className='font-semibold text-slate-900 dark:text-white'>
                    Zero Downtime
                  </div>
                  <div className='text-slate-600 dark:text-slate-300 text-sm'>
                    99.9% uptime guarantee
                  </div>
                </div>
                <div className='text-center'>
                  <div className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-3 rounded-full w-12 h-12'>
                    <Star className='w-6 h-6 text-white' />
                  </div>
                  <div className='font-semibold text-slate-900 dark:text-white'>
                    Zero Errors
                  </div>
                  <div className='text-slate-600 dark:text-slate-300 text-sm'>
                    Thoroughly tested code
                  </div>
                </div>
                <div className='text-center'>
                  <div className='flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mb-3 rounded-full w-12 h-12'>
                    <Crown className='w-6 h-6 text-white' />
                  </div>
                  <div className='font-semibold text-slate-900 dark:text-white'>
                    Zero Vulnerabilities
                  </div>
                  <div className='text-slate-600 dark:text-slate-300 text-sm'>
                    Security-first development
                  </div>
                </div>
              </div>
              <p className='text-slate-600 dark:text-slate-300'>
                Not sure which package is right for you? Our experts are here to
                help you choose the perfect solution.
              </p>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommercePackages;
