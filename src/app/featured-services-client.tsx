'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Shield,
  Settings,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  DollarSign,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { use, useState } from 'react';
import ComponentWrapper from '../components/common/component-wrapper';
import { getCategoriesWithServices } from '@/actions/service-actions';

// 3Zero Digital services data
// 3Zero Digital services data
const services = [
  {
    id: 1,
    name: 'Web Development',
    shortDesc: 'Custom websites & applications',
    fullDesc:
      'Transform your business with cutting-edge web development. We build scalable, performant websites and web applications using modern technologies like Next.js, React, and TypeScript.',
    icon: Code,
    zeroDesc:
      'Our comprehensive development approach ensures zero vulnerabilities, zero downtime, and zero errors through rigorous testing, security protocols, and performance optimization.',
    price: 'From $2,999',
    timeline: '2-4 weeks',
    features: [
      'Custom responsive design',
      'Modern tech stack (Next.js, React)',
      'SEO optimization',
      'Performance optimization',
      'Cross-browser compatibility',
      'Mobile-first approach',
    ],
    stats: { projects: '150+', satisfaction: '99%', avgSpeed: '0.8s' },
    color: 'from-blue-600 to-blue-700',
    bgGradient: 'from-blue-500/10 via-blue-600/5 to-purple-500/10',
    slug: 'web-development',
  },
  {
    id: 2,
    name: 'Website Security',
    shortDesc: 'Comprehensive security solutions',
    fullDesc:
      'Protect your digital assets with enterprise-grade security. We conduct thorough security audits, implement robust protection measures, and provide ongoing monitoring.',
    icon: Shield,
    zeroDesc:
      'Advanced security protocols and continuous monitoring guarantee your website remains protected from all threats while maintaining optimal performance and reliability.',
    price: 'From $599',
    timeline: '1-2 weeks',
    features: [
      'Security audit & assessment',
      'Malware scanning & removal',
      'SSL certificate setup',
      'Firewall configuration',
      '24/7 security monitoring',
      'Regular security updates',
    ],
    stats: { threats: '99.9%', uptime: '99.99%', response: '< 5min' },
    color: 'from-emerald-600 to-emerald-700',
    bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-green-500/10',
    slug: 'website-security',
  },
  {
    id: 3,
    name: 'Website Maintenance',
    shortDesc: 'Ongoing support & optimization',
    fullDesc:
      'Keep your website running smoothly with our comprehensive maintenance services. Regular updates, performance optimization, and proactive monitoring ensure peak performance.',
    icon: Settings,
    zeroDesc:
      'Proactive maintenance and 24/7 monitoring ensure maximum uptime, enhanced security, and flawless functionality for your website at all times.',
    price: 'From $299/mo',
    timeline: 'Ongoing',
    features: [
      'Regular content updates',
      'Performance optimization',
      'Backup management',
      'Plugin & theme updates',
      'Priority technical support',
      'Monthly performance reports',
    ],
    stats: { uptime: '99.99%', sites: '200+', response: '< 1hr' },
    color: 'from-purple-600 to-purple-700',
    bgGradient: 'from-purple-500/10 via-purple-600/5 to-pink-500/10',
    slug: 'website-maintenance',
  },
  {
    id: 4,
    name: 'Digital Marketing',
    shortDesc: 'SEO & growth strategies',
    fullDesc:
      'Accelerate your business growth with data-driven digital marketing. Our strategies focus on SEO, content marketing, and conversion optimization to maximize your ROI.',
    icon: TrendingUp,
    zeroDesc:
      'Ethical, results-driven marketing strategies that build sustainable growth while maintaining security standards, reliable performance, and error-free execution.',
    price: 'From $899/mo',
    timeline: '3-6 months',
    features: [
      'SEO optimization',
      'Content strategy',
      'Analytics & reporting',
      'Conversion optimization',
      'Local SEO',
      'Competitor analysis',
    ],
    stats: { avgGrowth: '150%', clients: '50+', roi: '300%' },
    color: 'from-orange-600 to-orange-700',
    bgGradient: 'from-orange-500/10 via-orange-600/5 to-red-500/10',
    slug: 'digital-marketing',
  },
];

const FeaturedServicesClient = () => {
  const [activeService, setActiveService] = useState(0);
  const currentService = services[activeService];

  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='mr-2 w-4 h-4' />
              Our Expertise
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                3Zero Digital Services
              </span>
            </h2>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Professional web development services built on our foundation of
              zero vulnerabilities, zero downtime, and zero errors
            </p>
          </motion.div>

          {/* Main Content */}
          <div className='gap-8 md:gap-12 grid grid-cols-1 lg:grid-cols-12'>
            {/* Service Navigation - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='space-y-4 lg:col-span-4'>
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    'w-full text-left p-4 md:p-6 rounded-2xl border transition-all duration-300 group',
                    activeService === index
                      ? 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800 shadow-lg'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80',
                  )}>
                  <div className='flex items-center gap-3'>
                    <div
                      className={cn(
                        'p-3 rounded-xl bg-gradient-to-r',
                        service.color,
                        activeService === index ? 'shadow-lg' : 'opacity-70',
                      )}>
                      <service.icon className='w-6 h-6 text-white' />
                    </div>

                    <div className='flex-1'>
                      <h4
                        className={cn(
                          'font-bold text-lg mb-1',
                          activeService === index
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300',
                        )}>
                        {service.name}
                      </h4>
                      <p
                        className={cn(
                          'text-sm',
                          activeService === index
                            ? 'text-slate-600 dark:text-slate-400'
                            : 'text-slate-500 dark:text-slate-500',
                        )}>
                        {service.shortDesc}
                      </p>
                    </div>

                    <Badge variant='outline' className='text-xs'>
                      0 Compromised
                    </Badge>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Service Details - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='flex justify-center items-center lg:col-span-8'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl relative overflow-hidden',
                  )}>
                  {/* Background gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20',
                      currentService.bgGradient,
                    )}
                  />

                  <div className='relative'>
                    {/* Service Header */}
                    <div className='flex justify-between items-start mb-6'>
                      <div>
                        <div className='flex items-center gap-3 mb-3'>
                          <div
                            className={cn(
                              'p-3 rounded-xl bg-gradient-to-r shadow-lg',
                              currentService.color,
                            )}>
                            <currentService.icon className='w-8 h-8 text-white' />
                          </div>
                          <div>
                            <h3 className='font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                              {currentService.name}
                            </h3>
                            <div className='flex items-center gap-2 mt-1'>
                              <Badge
                                className={cn(
                                  'mt-1 bg-gradient-to-r text-white border-0',
                                  currentService.color,
                                )}>
                                0 Errors
                              </Badge>
                              <Badge
                                className={cn(
                                  'mt-1 bg-gradient-to-r text-white border-0',
                                  currentService.color,
                                )}>
                                0 Vulnerabilities
                              </Badge>
                              <Badge
                                className={cn(
                                  'mt-1 bg-gradient-to-r text-white border-0',
                                  currentService.color,
                                )}>
                                0 Downtime
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'>
                          {currentService.fullDesc}
                        </p>
                      </div>
                    </div>

                    {/* Zero Promise */}
                    <div className='bg-slate-50/50 dark:bg-slate-900/50 mb-6 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl'>
                      <div className='flex items-center gap-2 mb-2'>
                        <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                        <span className='font-semibold text-slate-900 dark:text-white'>
                          0 Compromised Guarantee
                        </span>
                      </div>
                      <p className='text-slate-600 dark:text-slate-300 text-sm'>
                        {currentService.zeroDesc}
                      </p>
                    </div>

                    {/* Features & Stats Grid */}
                    <div className='gap-6 grid grid-cols-1 md:grid-cols-2 mb-8'>
                      {/* Features */}
                      <div>
                        <h4 className='mb-4 font-bold text-slate-900 dark:text-white'>
                          What's Included
                        </h4>
                        <div className='space-y-2'>
                          {currentService.features.map((feature, idx) => (
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
                      <div>
                        <h4 className='mb-4 font-bold text-slate-900 dark:text-white'>
                          Our Track Record
                        </h4>
                        <div className='space-y-3'>
                          {Object.entries(currentService.stats).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className='flex justify-between items-center'>
                                <span className='text-slate-600 dark:text-slate-400 text-sm capitalize'>
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className='font-bold text-slate-900 dark:text-white'>
                                  {value}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className='flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 pt-6 border-slate-200/30 dark:border-slate-700/30 border-t'>
                      <div className='flex items-center gap-6'>
                        <div className='flex items-center gap-2'>
                          <DollarSign className='w-5 h-5 text-slate-500' />
                          <div>
                            <span className='block text-slate-500 dark:text-slate-400 text-xs'>
                              Starting at
                            </span>
                            <span className='font-bold text-slate-900 dark:text-white text-xl'>
                              {currentService.price}
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='w-5 h-5 text-slate-500' />
                          <div>
                            <span className='block text-slate-500 dark:text-slate-400 text-xs'>
                              Timeline
                            </span>
                            <span className='font-semibold text-slate-700 dark:text-slate-200'>
                              {currentService.timeline}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='flex gap-3 w-full sm:w-auto'>
                        <Button
                          asChild
                          variant='outline'
                          className='flex-1 sm:flex-none bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700'>
                          <Link href={`/services/${currentService.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className={cn(
                            'flex-1 sm:flex-none bg-gradient-to-r text-white border-0',
                            currentService.color,
                          )}>
                          <Link
                            href='/contact'
                            className='flex items-center gap-2'>
                            Get Started
                            <ArrowRight className='w-4 h-4' />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default FeaturedServicesClient;
