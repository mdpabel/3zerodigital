'use client';

import { motion } from 'framer-motion';
import {
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
  Search,
  Shield,
  Smartphone,
  Globe,
  Users,
  Zap,
  Settings,
  HeartHandshake,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: ShoppingCart,
    title: 'Complete Store Management',
    description:
      'Full product catalog management with categories, variants, and inventory tracking',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-500/10 to-blue-600/5',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment Processing',
    description:
      'Multiple payment gateways including Stripe, PayPal, and local payment methods',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-500/10 to-emerald-600/5',
  },
  {
    icon: Truck,
    title: 'Smart Shipping & Tax',
    description:
      'Automated shipping calculations, tax management, and real-time tracking',
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-500/10 to-red-600/5',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description:
      'Comprehensive sales analytics, customer insights, and performance tracking',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-500/10 to-pink-600/5',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description:
      'Built-in SEO tools, schema markup, and search engine optimization',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'from-indigo-500/10 to-blue-600/5',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'SSL certificates, PCI compliance, and advanced security monitoring',
    color: 'from-red-500 to-orange-600',
    bgColor: 'from-red-500/10 to-orange-600/5',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description:
      'Responsive design optimized for mobile shopping and PWA capabilities',
    color: 'from-teal-500 to-green-600',
    bgColor: 'from-teal-500/10 to-green-600/5',
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description:
      'Support for multiple languages and currencies for global reach',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-500/10 to-blue-600/5',
  },
  {
    icon: Users,
    title: 'Customer Management',
    description:
      'Customer accounts, order history, wishlists, and loyalty programs',
    color: 'from-pink-500 to-purple-600',
    bgColor: 'from-pink-500/10 to-purple-600/5',
  },
];

const EcommerceFeatures = () => {
  return (
    <section className='bg-gradient-to-br from-slate-50 dark:from-slate-900 to-blue-50/30 dark:to-blue-950/30 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 text-gray-300'>
              <Zap className='mr-2 w-4 h-4' />
              Core Features
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Everything Your Store Needs
              </span>
            </h2>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              From product management to customer analytics, we include all
              essential ecommerce features
            </p>
          </motion.div>

          <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className='group relative bg-white/70 dark:bg-slate-800/70 hover:shadow-xl backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 h-full overflow-hidden transition-all duration-300'>
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20',
                      feature.bgColor,
                    )}
                  />

                  <CardContent className='relative p-6'>
                    <div
                      className={cn(
                        'w-12 h-12 mb-4 rounded-xl bg-gradient-to-r flex items-center justify-center shadow-lg',
                        feature.color,
                      )}>
                      <feature.icon className='w-6 h-6 text-white' />
                    </div>

                    <h3 className='mb-3 font-bold text-slate-900 dark:text-white text-xl'>
                      {feature.title}
                    </h3>

                    <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                      {feature.description}
                    </p>
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

export default EcommerceFeatures;
