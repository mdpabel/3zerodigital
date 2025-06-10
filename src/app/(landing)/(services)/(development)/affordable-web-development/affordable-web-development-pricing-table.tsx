'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Mail,
  Server,
  Smartphone,
  Search,
  Facebook,
  MapPin,
  Star,
  Clock,
  Award,
  Users,
  TrendingUp,
  Palette,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';
import Link from 'next/link';

// Website development packages
const websitePackages = [
  {
    id: 'wordpress',
    name: 'WordPress Solution',
    icon: Code,
    price: 79,
    popular: true,
    description: 'Perfect for blogs, business sites, and content management',
    hosting: 'cPanel Hosting Included',
    domain: '.com Domain Free',
    features: [
      'Custom WordPress design',
      'Mobile responsive layout',
      'cPanel hosting setup',
      'Professional email setup',
      'Free SSL certificate',
      'SMTP configuration',
      'Contact form integration',
      'Basic SEO optimization',
      '95%+ PageSpeed score',
      'Honeypot form protection',
      'Admin training included',
      '30-day support included',
    ],
    techSpecs: [
      'WordPress CMS',
      'cPanel hosting',
      'Professional email',
      'SSL encryption',
      'SMTP delivery',
      'Form protection',
    ],
    color: 'from-blue-600 to-blue-700',
    bgGradient: 'from-blue-500/10 via-blue-600/5 to-purple-500/10',
  },
  {
    id: 'nextjs',
    name: 'NextJS Modern',
    icon: Zap,
    price: 79,
    popular: false,
    description: 'Lightning-fast modern websites with cutting-edge technology',
    hosting: 'Vercel Hosting (Free Tier)',
    domain: '.com Domain Free',
    features: [
      'Custom NextJS development',
      'Ultra-fast performance',
      'Vercel hosting setup',
      'Domain connection',
      'Free SSL certificate',
      'Professional email setup',
      'Contact form integration',
      'SEO optimization built-in',
      '98%+ PageSpeed score',
      'Cloudflare Turnstile protection',
      'Modern design patterns',
      '30-day support included',
    ],
    techSpecs: [
      'NextJS 14',
      'Vercel hosting',
      'Email forwarding',
      'SSL encryption',
      'Edge computing',
      'Cloudflare protection',
    ],
    color: 'from-emerald-600 to-emerald-700',
    bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-green-500/10',
  },
  {
    id: 'shopify',
    name: 'Shopify Store',
    icon: ShoppingCart,
    price: 79,
    popular: false,
    description: 'Complete e-commerce solution for online businesses',
    hosting: 'Shopify Hosting Included',
    domain: '.com Domain Free',
    features: [
      'Custom Shopify theme',
      'Mobile-optimized design',
      'Shopify hosting included',
      'Domain connection setup',
      'SSL certificate (Shopify)',
      'Payment gateway setup',
      'Product catalog setup',
      'Inventory management',
      'Order management system',
      'reCAPTCHA protection',
      'Shopify admin training',
      '30-day support included',
    ],
    techSpecs: [
      'Shopify platform',
      'Shopify hosting',
      'Payment processing',
      'SSL encryption',
      'CDN delivery',
      'Spam protection',
    ],
    color: 'from-purple-600 to-purple-700',
    bgGradient: 'from-purple-500/10 via-purple-600/5 to-pink-500/10',
  },
];

// Extension services
const extensionServices = [
  {
    id: 'gmb-setup',
    name: 'Google My Business Setup',
    price: 49,
    icon: MapPin,
    description: 'Complete GMB profile optimization',
    popular: true,
  },
  {
    id: 'facebook-page',
    name: 'Facebook Business Page',
    price: 39,
    icon: Facebook,
    description: 'Professional Facebook business page',
  },
  {
    id: 'seo-setup',
    name: 'Basic SEO Setup',
    price: 69,
    icon: Search,
    description: 'On-page SEO optimization',
  },
  {
    id: 'logo-design',
    name: 'Logo Design',
    price: 99,
    icon: Palette,
    description: 'Professional logo design',
  },
];

const AffordableWebsitePricing = () => {
  const [selectedPackage, setSelectedPackage] = useState('wordpress');
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);

  const currentPackage = websitePackages.find(
    (pkg) => pkg.id === selectedPackage,
  );

  const handleExtensionToggle = (extensionId: string) => {
    setSelectedExtensions((prev) =>
      prev.includes(extensionId)
        ? prev.filter((id) => id !== extensionId)
        : [...prev, extensionId],
    );
  };

  const calculateTotal = () => {
    const basePrice = currentPackage?.price || 79;
    const extensionsPrice = selectedExtensions.reduce((total, extId) => {
      const extension = extensionServices.find((ext) => ext.id === extId);
      return total + (extension?.price || 0);
    }, 0);
    return basePrice + extensionsPrice;
  };

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
            <Badge className='bg-green-100 dark:bg-green-900/20 mb-6 px-4 py-2 border border-green-200/50 dark:border-green-800/50 font-medium text-green-800 dark:text-green-300 text-sm'>
              <Sparkles className='mr-2 w-4 h-4' />
              Affordable Website Development
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-green-900 dark:via-green-100 to-slate-900 dark:to-white text-transparent'>
                Professional Website for Just $79
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Get a complete professional website with hosting, domain, email,
              and SSL. Perfect for small businesses, portfolios, and blogs.
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Award className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  95%+ PageSpeed Score
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Shield className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  Free SSL Certificate
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  7-10 Day Delivery
                </span>
              </div>
            </div>
          </motion.div>

          {/* Package Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-12'>
            <h2 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl text-center'>
              Choose Your Website Solution
            </h2>

            <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
              {websitePackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={cn(
                    'cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative',
                    selectedPackage === pkg.id
                      ? 'bg-white dark:bg-slate-800 border-green-500 shadow-lg'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300',
                  )}>
                  {pkg.popular && (
                    <div className='top-4 right-4 absolute'>
                      <Badge className='bg-green-600 text-white'>
                        <Star className='mr-1 w-3 h-3' />
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div className='mb-4'>
                    <div
                      className={cn(
                        'inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r mb-4',
                        pkg.color,
                      )}>
                      <pkg.icon className='w-6 h-6 text-white' />
                    </div>

                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                      {pkg.name}
                    </h3>
                    <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
                      {pkg.description}
                    </p>

                    <div className='mb-4'>
                      <div className='flex items-baseline gap-1'>
                        <span className='font-bold text-slate-900 dark:text-white text-3xl'>
                          ${pkg.price}
                        </span>
                        <span className='text-slate-500 text-sm'>one-time</span>
                      </div>
                      <p className='font-medium text-green-600 dark:text-green-400 text-sm'>
                        {pkg.hosting}
                      </p>
                      <p className='font-medium text-blue-600 dark:text-blue-400 text-sm'>
                        {pkg.domain}
                      </p>
                    </div>
                  </div>

                  {selectedPackage === pkg.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='mb-4'>
                      <Badge className='justify-center bg-green-100 dark:bg-green-900/20 w-full text-green-800 dark:text-green-300'>
                        <CheckCircle className='mr-1 w-4 h-4' />
                        Selected
                      </Badge>
                    </motion.div>
                  )}

                  <div className='space-y-2'>
                    <h4 className='font-semibold text-slate-900 dark:text-white text-sm'>
                      Key Features:
                    </h4>
                    {pkg.techSpecs.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className='flex items-center gap-2'>
                        <CheckCircle className='flex-shrink-0 w-3 h-3 text-green-600' />
                        <span className='text-slate-600 dark:text-slate-300 text-xs'>
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Selected Package Details */}
          <AnimatePresence mode='wait'>
            {currentPackage && (
              <motion.div
                key={selectedPackage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 mb-12 relative overflow-hidden',
                )}>
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20',
                    currentPackage.bgGradient,
                  )}
                />

                <div className='relative'>
                  <div className='mb-8 text-center'>
                    <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
                      {currentPackage.name} - Complete Package
                    </h3>
                    <p className='text-slate-600 dark:text-slate-300'>
                      Everything you need to get your business online
                    </p>
                  </div>

                  <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
                    <div>
                      <h4 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                        What's Included
                      </h4>
                      <div className='space-y-2'>
                        {currentPackage.features.map((feature, idx) => (
                          <div key={idx} className='flex items-start gap-2'>
                            <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-600 dark:text-green-400' />
                            <span className='text-slate-600 dark:text-slate-300 text-sm'>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                        Technical Specifications
                      </h4>
                      <div className='space-y-3'>
                        {currentPackage.techSpecs.map((spec, idx) => (
                          <div
                            key={idx}
                            className='bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-lg'>
                            <span className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className='bg-green-50/50 dark:bg-green-950/20 mt-6 p-4 border border-green-200/30 dark:border-green-800/30 rounded-lg'>
                        <h5 className='mb-2 font-semibold text-green-800 dark:text-green-300 text-sm'>
                          Performance Guarantee
                        </h5>
                        <div className='space-y-1'>
                          <div className='flex items-center gap-2'>
                            <TrendingUp className='w-3 h-3 text-green-600' />
                            <span className='text-green-700 dark:text-green-300 text-xs'>
                              95%+ Google PageSpeed Score
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Shield className='w-3 h-3 text-green-600' />
                            <span className='text-green-700 dark:text-green-300 text-xs'>
                              Enterprise-grade security
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Smartphone className='w-3 h-3 text-green-600' />
                            <span className='text-green-700 dark:text-green-300 text-xs'>
                              Mobile-first responsive design
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extension Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-12'>
            <h3 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl text-center'>
              Boost Your Online Presence
            </h3>
            <p className='mb-8 text-slate-600 dark:text-slate-300 text-center'>
              Add these services to get more visibility and grow your business
              faster
            </p>

            <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {extensionServices.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExtensionToggle(service.id)}
                  className={cn(
                    'cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 relative',
                    selectedExtensions.includes(service.id)
                      ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-500'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300',
                  )}>
                  {service.popular && (
                    <div className='top-2 right-2 absolute'>
                      <Badge className='bg-orange-100 text-orange-800 text-xs'>
                        <Star className='mr-1 w-3 h-3' />
                        Recommended
                      </Badge>
                    </div>
                  )}

                  <div className='mb-4 text-center'>
                    <service.icon
                      className={cn(
                        'w-8 h-8 mx-auto mb-3',
                        selectedExtensions.includes(service.id)
                          ? 'text-blue-600'
                          : 'text-slate-500',
                      )}
                    />

                    {selectedExtensions.includes(service.id) && (
                      <CheckCircle className='top-4 right-4 absolute w-5 h-5 text-blue-600' />
                    )}
                  </div>

                  <h4 className='mb-2 font-semibold text-slate-900 dark:text-white text-sm text-center'>
                    {service.name}
                  </h4>
                  <p className='mb-3 text-slate-600 dark:text-slate-300 text-xs text-center'>
                    {service.description}
                  </p>
                  <p className='font-bold text-blue-600 text-center'>
                    +${service.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-gradient-to-r from-green-50 dark:from-green-950/20 to-blue-50 dark:to-blue-950/20 p-8 border border-green-200/50 dark:border-green-800/50 rounded-2xl'>
            <div className='flex md:flex-row flex-col justify-between items-center gap-6'>
              <div>
                <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                  Your Website Package
                </h3>
                <div className='space-y-1 text-sm'>
                  <div className='text-slate-600 dark:text-slate-300'>
                    {currentPackage?.name} Website
                  </div>
                  {selectedExtensions.length > 0 && (
                    <div className='text-slate-600 dark:text-slate-300'>
                      + {selectedExtensions.length} Extension
                      {selectedExtensions.length > 1 ? 's' : ''}
                    </div>
                  )}
                  <div className='font-medium text-green-600 dark:text-green-400'>
                    Free domain, hosting, SSL & email included
                  </div>
                </div>
              </div>

              <div className='text-center md:text-right'>
                <div className='font-bold text-3xl md:text-4xl'>
                  <span className='bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 text-transparent'>
                    ${calculateTotal()}
                  </span>
                </div>
                <div className='text-slate-500 text-sm'>One-time payment</div>
              </div>
            </div>

            <div className='flex sm:flex-row flex-col gap-4 mt-8'>
              <Button
                size='lg'
                className='flex-1 bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6 border-0 text-white'>
                <Globe className='mr-2 w-5 h-5' />
                Get Your Website Now
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>

              <Button
                variant='outline'
                size='lg'
                asChild
                className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                <Link href='/affordable-web-development/#contact-us'>
                  <Users className='mr-2 w-5 h-5' />
                  Talk to Expert
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex flex-wrap justify-center items-center gap-8 mt-16 text-center'>
            <div className='flex items-center gap-2'>
              <Award className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                95%+ Performance Score
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                Enterprise Security
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-purple-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                500+ Happy Clients
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-orange-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                7-10 Day Delivery
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default AffordableWebsitePricing;
