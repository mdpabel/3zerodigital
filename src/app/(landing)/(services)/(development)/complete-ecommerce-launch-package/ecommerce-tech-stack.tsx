'use client';

import { motion } from 'framer-motion';
import {
  Code,
  ShoppingBag,
  Database,
  CheckCircle,
  Star,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaWordpress } from 'react-icons/fa';

export const techStacks = [
  {
    id: 'wordpress',
    name: 'WordPress + WooCommerce',
    description: 'Perfect for content-rich stores with blog integration',
    icon: FaWordpress,
    color: 'from-blue-600 to-blue-700',
    bgGradient: 'from-blue-500/10 via-blue-600/5 to-indigo-500/10',
    features: [
      'Easy content management',
      'Thousands of plugins',
      'SEO-friendly',
      'Cost-effective hosting',
      'Extensive customization',
      'Large community support',
    ],
    bestFor: 'Blogs, magazines, content-heavy stores',
    pricing: 'From $399',
    timeline: '10-14 days',
    pros: ['User-friendly', 'SEO optimized', 'Plugin ecosystem'],
    cons: ['Regular updates needed', 'Security considerations'],
    marketShare: '43%',
    performance: '85%',
    maintenance: 'Medium',
  },
  {
    id: 'nextjs',
    name: 'Next.js + Stripe',
    description: 'Modern, fast, and SEO-optimized for high performance',
    icon: Code,
    color: 'from-gray-700 to-gray-900',
    bgGradient: 'from-gray-500/10 via-gray-600/5 to-slate-500/10',
    features: [
      'Lightning-fast performance',
      'Server-side rendering',
      'Excellent SEO',
      'Modern development',
      'Scalable architecture',
      'Custom functionality',
    ],
    bestFor: 'High-traffic stores, custom requirements',
    pricing: 'From $499',
    timeline: '14-21 days',
    pros: ['Best performance', 'Custom features', 'Modern tech'],
    cons: ['Higher development cost', 'Technical maintenance'],
    marketShare: '15%',
    performance: '98%',
    maintenance: 'Low',
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    description: 'Full JavaScript solution for complex applications',
    icon: Database,
    color: 'from-green-600 to-green-700',
    bgGradient: 'from-green-500/10 via-green-600/5 to-emerald-500/10',
    features: [
      'Full JavaScript ecosystem',
      'Real-time capabilities',
      'Highly customizable',
      'Scalable database',
      'Modern UI/UX',
      'API-first approach',
    ],
    bestFor: 'Complex stores, multi-vendor platforms',
    pricing: 'From $599',
    timeline: '21-28 days',
    pros: ['Highly customizable', 'Real-time features', 'Full control'],
    cons: ['Longer development time', 'Higher complexity'],
    marketShare: '8%',
    performance: '95%',
    maintenance: 'Medium',
  },
  {
    id: 'shopify',
    name: 'Shopify Plus',
    description: 'Enterprise-ready with built-in hosting and security',
    icon: ShoppingBag,
    color: 'from-emerald-600 to-emerald-700',
    bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-green-500/10',
    features: [
      'Hosted solution',
      'Built-in payments',
      'Automatic updates',
      'Mobile-optimized',
      'App ecosystem',
      '24/7 support included',
    ],
    bestFor: 'Quick launch, non-technical users',
    pricing: 'From $399',
    timeline: '7-10 days',
    pros: ['Quick setup', 'Hosted solution', 'Built-in features'],
    cons: ['Monthly fees', 'Limited customization'],
    marketShare: '24%',
    performance: '90%',
    maintenance: 'Low',
  },
];

const EcommerceTechStack = () => {
  return (
    <section className='bg-gradient-to-br from-slate-50 dark:from-slate-900 to-blue-50/30 dark:to-blue-950/30 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 text-gray-300'>
              <Zap className='mr-2 w-4 h-4' />
              Technology Options
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Choose Your Perfect Stack
              </span>
            </h2>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              We offer multiple technology options to match your specific needs,
              budget, and timeline
            </p>
          </motion.div>

          {/* Tech Stack Grid */}
          <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
            {techStacks.map((stack, index) => (
              <motion.div
                key={stack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className='group relative bg-white/70 dark:bg-slate-800/70 hover:shadow-xl backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 h-full overflow-hidden transition-all duration-300'>
                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20',
                      stack.bgGradient,
                    )}
                  />

                  <CardHeader className='relative'>
                    <div className='flex justify-between items-center mb-4'>
                      <div
                        className={cn(
                          'p-3 rounded-xl bg-gradient-to-r shadow-lg',
                          stack.color,
                        )}>
                        <stack.icon className='w-8 h-8 text-white' />
                      </div>

                      <div className='flex gap-2'>
                        <Badge
                          className={cn(
                            'bg-gradient-to-r text-white border-0',
                            stack.color,
                          )}>
                          {stack.marketShare} Market
                        </Badge>
                        {stack.performance === '98%' && (
                          <Badge className='bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white'>
                            <Star className='mr-1 w-3 h-3' />
                            Fastest
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardTitle className='mb-2 text-slate-900 dark:text-white text-xl md:text-2xl'>
                      {stack.name}
                    </CardTitle>

                    <p className='text-slate-600 dark:text-slate-300'>
                      {stack.description}
                    </p>
                  </CardHeader>

                  <CardContent className='relative space-y-6'>
                    {/* Features */}
                    <div>
                      <h4 className='mb-3 font-semibold text-slate-900 dark:text-white'>
                        Key Features
                      </h4>
                      <div className='gap-2 grid grid-cols-1'>
                        {stack.features.map((feature, idx) => (
                          <div key={idx} className='flex items-center gap-2'>
                            <CheckCircle className='flex-shrink-0 w-4 h-4 text-green-600 dark:text-green-400' />
                            <span className='text-slate-600 dark:text-slate-300 text-sm'>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className='gap-4 grid grid-cols-3 bg-slate-50/50 dark:bg-slate-900/50 py-4 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                      <div className='text-center'>
                        <div className='font-bold text-slate-900 dark:text-white'>
                          {stack.performance}
                        </div>
                        <div className='text-slate-500 text-xs'>
                          Performance
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='font-bold text-slate-900 dark:text-white'>
                          {stack.timeline}
                        </div>
                        <div className='text-slate-500 text-xs'>Timeline</div>
                      </div>
                      <div className='text-center'>
                        <div className='font-bold text-slate-900 dark:text-white'>
                          {stack.maintenance}
                        </div>
                        <div className='text-slate-500 text-xs'>
                          Maintenance
                        </div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className='bg-blue-50/50 dark:bg-blue-950/30 p-3 border border-blue-200/30 dark:border-blue-800/30 rounded-lg'>
                      <div className='flex items-center gap-2 mb-1'>
                        <Shield className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                        <span className='font-medium text-blue-900 dark:text-blue-100 text-sm'>
                          Best For
                        </span>
                      </div>
                      <p className='text-blue-800 dark:text-blue-200 text-sm'>
                        {stack.bestFor}
                      </p>
                    </div>

                    {/* Pricing & CTA */}
                    <div className='flex justify-between items-center pt-4 border-slate-200/30 dark:border-slate-700/30 border-t'>
                      <div>
                        <div className='text-slate-500 dark:text-slate-400 text-sm'>
                          Starting at
                        </div>
                        <div className='font-bold text-slate-900 dark:text-white text-xl'>
                          {stack.pricing}
                        </div>
                      </div>

                      <Button
                        asChild
                        className={cn(
                          'bg-gradient-to-r text-white border-0',
                          stack.color,
                        )}>
                        <Link
                          href={`/contact?service=ecommerce&stack=${stack.id}`}>
                          Choose {stack.name.split(' ')[0]}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-12 text-center'>
            <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
              <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-xl'>
                Not sure which technology is right for you?
              </h3>
              <p className='mb-6 text-slate-600 dark:text-slate-300'>
                Our experts will help you choose the perfect stack based on your
                specific requirements
              </p>
              <div className='flex sm:flex-row flex-col justify-center gap-4'>
                <Button
                  asChild
                  size='lg'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
                  <Link href='/contact?service=ecommerce-consultation'>
                    Get Free Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='bg-white/80 dark:bg-slate-800/80'>
                  <Link href='/resources/ecommerce-comparison'>
                    Compare All Options
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommerceTechStack;
