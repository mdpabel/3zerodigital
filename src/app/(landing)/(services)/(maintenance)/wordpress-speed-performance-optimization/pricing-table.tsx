'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  CheckCircle,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
  TrendingUp,
  Award,
  Users,
  Star,
  Gauge,
  Rocket,
  Target,
  BarChart3,
  Image,
  Database,
  Code,
  Settings,
  Monitor,
  Smartphone,
  Globe,
  Shield,
  FileCheck,
  Eye,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';

// Speed optimization features included
const includedFeatures = [
  {
    icon: Image,
    title: 'Image Optimization',
    description: 'Compress and convert images to WebP/AVIF formats',
  },
  {
    icon: Code,
    title: 'Code Minification',
    description: 'Minify CSS, JavaScript, and HTML files',
  },
  {
    icon: Database,
    title: 'Database Optimization',
    description: 'Clean and optimize database queries and structure',
  },
  {
    icon: Rocket,
    title: 'Caching Implementation',
    description: 'Set up browser, server, and CDN caching',
  },
  {
    icon: Globe,
    title: 'CDN Configuration',
    description: 'Global content delivery network setup',
  },
  {
    icon: Settings,
    title: 'Server Optimization',
    description: 'Optimize server configuration and resources',
  },
  {
    icon: Monitor,
    title: 'Core Web Vitals Fix',
    description: 'Improve LCP, FID, and CLS scores',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimization',
    description: 'Optimize for mobile performance and experience',
  },
];

// Performance improvements guaranteed
const performanceMetrics = [
  {
    metric: 'Page Load Speed',
    improvement: '3-5x faster',
    icon: Timer,
    color: 'text-green-600',
  },
  {
    metric: 'Google PageSpeed Score',
    improvement: '90+ score',
    icon: Target,
    color: 'text-blue-600',
  },
  {
    metric: 'Core Web Vitals',
    improvement: 'All green',
    icon: CheckCircle,
    color: 'text-emerald-600',
  },
  {
    metric: 'Mobile Performance',
    improvement: '85+ score',
    icon: Smartphone,
    color: 'text-purple-600',
  },
];

// Before/After examples
const performanceExamples = [
  {
    site: 'E-commerce Store',
    before: '8.2s',
    after: '1.8s',
    improvement: '78%',
  },
  {
    site: 'Business Website',
    before: '6.5s',
    after: '1.2s',
    improvement: '82%',
  },
  {
    site: 'Blog/News Site',
    before: '5.8s',
    after: '1.5s',
    improvement: '74%',
  },
  {
    site: 'Portfolio Site',
    before: '4.2s',
    after: '0.9s',
    improvement: '79%',
  },
];

// What we analyze and fix
const optimizationAreas = [
  'Image compression and format conversion',
  'CSS and JavaScript minification',
  'Database query optimization',
  'Caching strategy implementation',
  'CDN setup and configuration',
  'Server response time optimization',
  'Third-party script optimization',
  'Font loading optimization',
  'Lazy loading implementation',
  'Critical CSS extraction',
  'Resource prioritization',
  'Mobile performance tuning',
];

const SpeedOptimizationPricing = () => {
  const [showAllAreas, setShowAllAreas] = useState(false);

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
              <Zap className='mr-2 w-4 h-4' />
              Professional Speed Optimization
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-green-900 dark:via-green-100 to-slate-900 dark:to-white text-transparent'>
                Make Your Website Lightning Fast
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Comprehensive speed optimization service that delivers{' '}
              <strong>3-5x faster loading times</strong> and improves your
              Google PageSpeed score to 90+.
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Rocket className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  3-5x Speed Improvement
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Target className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  90+ PageSpeed Score
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  30-Day Performance Guarantee
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Service Details - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='space-y-8 lg:col-span-2'>
              {/* Performance Metrics */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Guaranteed Performance Improvements
                </h2>

                <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
                  {performanceMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className='bg-white/50 dark:bg-slate-800/50 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl'>
                      <div className='flex items-center gap-3 mb-2'>
                        <metric.icon className={cn('w-5 h-5', metric.color)} />
                        <h3 className='font-semibold text-slate-900 dark:text-white text-sm'>
                          {metric.metric}
                        </h3>
                      </div>
                      <p className='font-bold text-green-600 text-lg'>
                        {metric.improvement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Complete Optimization Package
                </h2>

                <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  {includedFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className='flex items-start gap-3 bg-white/50 dark:bg-slate-800/50 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                      <feature.icon className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-600' />
                      <div>
                        <h3 className='mb-1 font-semibold text-slate-900 dark:text-white text-sm'>
                          {feature.title}
                        </h3>
                        <p className='text-slate-600 dark:text-slate-300 text-xs'>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Examples */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Real Performance Results
                </h2>

                <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  {performanceExamples.map((example, idx) => (
                    <div
                      key={idx}
                      className='bg-gradient-to-r from-red-50 dark:from-red-950/20 to-green-50 dark:to-green-950/20 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                      <h3 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                        {example.site}
                      </h3>
                      <div className='flex justify-between items-center mb-2'>
                        <div className='text-center'>
                          <p className='text-red-600 text-xs'>Before</p>
                          <p className='font-bold text-red-700 text-lg'>
                            {example.before}
                          </p>
                        </div>
                        <ArrowRight className='w-4 h-4 text-slate-400' />
                        <div className='text-center'>
                          <p className='text-green-600 text-xs'>After</p>
                          <p className='font-bold text-green-700 text-lg'>
                            {example.after}
                          </p>
                        </div>
                      </div>
                      <div className='text-center'>
                        <Badge className='bg-green-100 text-green-800 text-xs'>
                          {example.improvement} faster
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Areas */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  What We Analyze & Optimize
                </h2>

                <div className='gap-3 grid grid-cols-1 md:grid-cols-2'>
                  {(showAllAreas
                    ? optimizationAreas
                    : optimizationAreas.slice(0, 8)
                  ).map((area, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <CheckCircle className='flex-shrink-0 w-4 h-4 text-green-600' />
                      <span className='text-slate-600 dark:text-slate-300 text-sm'>
                        {area}
                      </span>
                    </div>
                  ))}
                </div>

                {!showAllAreas && (
                  <div className='mt-4 text-center'>
                    <Button
                      variant='outline'
                      onClick={() => setShowAllAreas(true)}
                      className='bg-white/50 dark:bg-slate-800/50'>
                      <Eye className='mr-2 w-4 h-4' />
                      Show All Areas ({optimizationAreas.length - 8} more)
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Pricing Card - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='lg:col-span-1'>
              <div className='top-8 sticky bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-6 text-center'>
                  <div className='inline-flex justify-center items-center bg-gradient-to-r from-green-600 to-emerald-600 mb-4 rounded-2xl w-16 h-16'>
                    <Zap className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                    Complete Speed Optimization
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    Professional optimization service
                  </p>
                </div>

                {/* Pricing */}
                <div className='mb-6 text-center'>
                  <div className='mb-2'>
                    <span className='font-bold text-4xl'>
                      <span className='bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 text-transparent'>
                        $899
                      </span>
                    </span>
                  </div>
                  <p className='text-slate-500 dark:text-slate-400 text-sm'>
                    One-time investment
                  </p>
                </div>

                {/* Key Benefits */}
                <div className='mb-6'>
                  <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                    What You Get
                  </h4>
                  <div className='space-y-2'>
                    {[
                      'Complete website speed audit',
                      '8 core optimization techniques',
                      '3-5x faster loading times',
                      '90+ Google PageSpeed score',
                      'Mobile performance optimization',
                      'Before/after performance report',
                      '30-day performance monitoring',
                      'Free performance consultation',
                    ].map((benefit, idx) => (
                      <div key={idx} className='flex items-start gap-2'>
                        <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-600' />
                        <span className='text-slate-600 dark:text-slate-300 text-xs'>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className='bg-green-50/50 dark:bg-green-950/20 mb-6 p-4 border border-green-200/30 dark:border-green-800/30 rounded-lg'>
                  <h4 className='mb-2 font-semibold text-green-800 dark:text-green-300 text-sm'>
                    Delivery Timeline
                  </h4>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        5-7 business days completion
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FileCheck className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        Daily progress updates
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BarChart3 className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        Detailed performance report
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className='bg-blue-50/50 dark:bg-blue-950/20 mb-6 p-4 border border-blue-200/30 dark:border-blue-800/30 rounded-lg'>
                  <h4 className='mb-2 font-semibold text-blue-800 dark:text-blue-300 text-sm'>
                    Performance Guarantee
                  </h4>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Target className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        90+ PageSpeed score or money back
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Rocket className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        3x speed improvement minimum
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Shield className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        30-day performance monitoring
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <Button
                  className='bg-gradient-to-r from-green-600 to-emerald-600 mb-4 py-6 border-0 w-full text-white'
                  size='lg'>
                  <Zap className='mr-2 w-5 h-5' />
                  Optimize My Website
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <div className='flex gap-2'>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Phone className='mr-1 w-4 h-4' />
                    Call
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <MessageSquare className='mr-1 w-4 h-4' />
                    Chat
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className='mt-6 pt-6 border-slate-200/50 dark:border-slate-700/50 border-t'>
                  <div className='space-y-2 text-center'>
                    <div className='flex justify-center items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='fill-current w-4 h-4 text-yellow-400'
                        />
                      ))}
                    </div>
                    <p className='text-slate-600 dark:text-slate-300 text-xs'>
                      Trusted by 2,500+ websites
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex flex-wrap justify-center items-center gap-8 mt-16 text-center'>
            <div className='flex items-center gap-2'>
              <Gauge className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                Average 4.2x Speed Increase
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                2,500+ Websites Optimized
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-purple-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                98% Client Satisfaction
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Award className='w-5 h-5 text-orange-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                Google Certified Experts
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default SpeedOptimizationPricing;
