'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  CheckCircle,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
  TrendingUp,
  Award,
  Users,
  Star,
  Database,
  Globe,
  Server,
  Shield,
  FileCheck,
  Eye,
  Timer,
  Zap,
  ArrowUpRight,
  HardDrive,
  Link,
  Mail,
  Settings,
  FileText,
  Search,
  Lock,
  Cloud,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';

// Migration services included
const migrationServices = [
  {
    icon: Globe,
    title: 'Domain Migration',
    description: 'Transfer domain with zero downtime and SEO preservation',
  },
  {
    icon: Server,
    title: 'Hosting Migration',
    description: 'Move to new hosting with optimized server configuration',
  },
  {
    icon: Database,
    title: 'Database Transfer',
    description: 'Secure database migration with integrity checks',
  },
  {
    icon: FileText,
    title: 'Content Migration',
    description: 'Transfer all content, media, and file structures',
  },
  {
    icon: Mail,
    title: 'Email Migration',
    description: 'Migrate email accounts and preserve all messages',
  },
  {
    icon: Settings,
    title: 'Configuration Setup',
    description: 'Replicate all settings and custom configurations',
  },
  {
    icon: Search,
    title: 'SEO Preservation',
    description: 'Maintain search rankings with proper redirects',
  },
  {
    icon: Shield,
    title: 'Security Setup',
    description: 'Implement SSL certificates and security measures',
  },
];

// Migration guarantees
const migrationGuarantees = [
  {
    metric: 'Zero Downtime',
    guarantee: '99.9% uptime',
    icon: Clock,
    color: 'text-green-600',
  },
  {
    metric: 'Data Integrity',
    guarantee: '100% preserved',
    icon: Database,
    color: 'text-blue-600',
  },
  {
    metric: 'SEO Rankings',
    guarantee: 'Fully maintained',
    icon: Search,
    color: 'text-purple-600',
  },
  {
    metric: 'Email Continuity',
    guarantee: 'No lost messages',
    icon: Mail,
    color: 'text-orange-600',
  },
];

// Migration success examples
const migrationExamples = [
  {
    type: 'E-commerce Store',
    from: 'Shared Hosting',
    to: 'Cloud VPS',
    downtime: '0 minutes',
    improvement: 'Performance +240%',
  },
  {
    type: 'Corporate Website',
    from: 'Old Domain',
    to: 'New Brand Domain',
    downtime: '0 minutes',
    improvement: 'SEO Maintained 100%',
  },
  {
    type: 'WordPress Blog',
    from: 'Basic Host',
    to: 'Managed WordPress',
    downtime: '0 minutes',
    improvement: 'Speed +180%',
  },
  {
    type: 'Multi-site Network',
    from: 'Legacy Server',
    to: 'Modern Infrastructure',
    downtime: '0 minutes',
    improvement: 'Reliability +300%',
  },
];

// What we handle during migration
const migrationChecklist = [
  'Complete website files and database backup',
  'DNS configuration and propagation',
  'Email accounts and message history',
  'SSL certificate installation',
  'Domain name server updates',
  'Database optimization and cleanup',
  'Media files and asset migration',
  'Plugin and theme compatibility check',
  'SEO-friendly redirect setup',
  'Performance optimization post-migration',
  'Security hardening and malware scan',
  'Cross-browser and device testing',
  'Search engine re-indexing setup',
  'Analytics and tracking code migration',
  'Contact forms and functionality testing',
];

const WebsiteMigrationPricing = () => {
  const [showAllChecklist, setShowAllChecklist] = useState(false);

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
              <RefreshCw className='mr-2 w-4 h-4' />
              Professional Website Migration
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Seamless Website Migration Service
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Professional migration service with{' '}
              <strong>zero downtime guarantee</strong> and complete SEO
              preservation. Move domains, hosting, or entire platforms safely.
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Clock className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  Zero Downtime Migration
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Shield className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  100% Data Protection
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Search className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  SEO Rankings Preserved
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
              {/* Migration Guarantees */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Migration Guarantees
                </h2>

                <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
                  {migrationGuarantees.map((guarantee, idx) => (
                    <div
                      key={idx}
                      className='bg-white/50 dark:bg-slate-800/50 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl'>
                      <div className='flex items-center gap-3 mb-2'>
                        <guarantee.icon
                          className={cn('w-5 h-5', guarantee.color)}
                        />
                        <h3 className='font-semibold text-slate-900 dark:text-white text-sm'>
                          {guarantee.metric}
                        </h3>
                      </div>
                      <p className='font-bold text-blue-600 text-lg'>
                        {guarantee.guarantee}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Migration Services */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Complete Migration Package
                </h2>

                <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  {migrationServices.map((service, idx) => (
                    <div
                      key={idx}
                      className='flex items-start gap-3 bg-white/50 dark:bg-slate-800/50 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                      <service.icon className='flex-shrink-0 mt-0.5 w-5 h-5 text-blue-600' />
                      <div>
                        <h3 className='mb-1 font-semibold text-slate-900 dark:text-white text-sm'>
                          {service.title}
                        </h3>
                        <p className='text-slate-600 dark:text-slate-300 text-xs'>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Migration Examples */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Successful Migration Examples
                </h2>

                <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  {migrationExamples.map((example, idx) => (
                    <div
                      key={idx}
                      className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-green-50 dark:to-green-950/20 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                      <h3 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                        {example.type}
                      </h3>
                      <div className='space-y-2 mb-3'>
                        <div className='flex justify-between items-center'>
                          <span className='text-slate-600 dark:text-slate-300 text-xs'>
                            From: {example.from}
                          </span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span className='text-slate-600 dark:text-slate-300 text-xs'>
                            To: {example.to}
                          </span>
                          <ArrowUpRight className='w-3 h-3 text-blue-600' />
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <Badge className='bg-green-100 text-green-800 text-xs'>
                          {example.downtime}
                        </Badge>
                        <Badge className='bg-blue-100 text-blue-800 text-xs'>
                          {example.improvement}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Migration Checklist */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Complete Migration Checklist
                </h2>

                <div className='gap-3 grid grid-cols-1 md:grid-cols-2'>
                  {(showAllChecklist
                    ? migrationChecklist
                    : migrationChecklist.slice(0, 10)
                  ).map((item, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <CheckCircle className='flex-shrink-0 w-4 h-4 text-blue-600' />
                      <span className='text-slate-600 dark:text-slate-300 text-sm'>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {!showAllChecklist && (
                  <div className='mt-4 text-center'>
                    <Button
                      variant='outline'
                      onClick={() => setShowAllChecklist(true)}
                      className='bg-white/50 dark:bg-slate-800/50'>
                      <Eye className='mr-2 w-4 h-4' />
                      Show All Items ({migrationChecklist.length - 10} more)
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
                  <div className='inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-cyan-600 mb-4 rounded-2xl w-16 h-16'>
                    <RefreshCw className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                    Professional Migration
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    Complete website migration service
                  </p>
                </div>

                {/* Pricing */}
                <div className='mb-6 text-center'>
                  <div className='mb-2'>
                    <span className='font-bold text-4xl'>
                      <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent'>
                        $699
                      </span>
                    </span>
                  </div>
                  <p className='text-slate-500 dark:text-slate-400 text-sm'>
                    One-time service fee
                  </p>
                </div>

                {/* Key Benefits */}
                <div className='mb-6'>
                  <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                    What's Included
                  </h4>
                  <div className='space-y-2'>
                    {[
                      'Complete pre-migration audit',
                      'Zero-downtime migration process',
                      'Full database & files transfer',
                      'Email accounts migration',
                      'DNS & domain configuration',
                      'SSL certificate setup',
                      'SEO-friendly redirects',
                      'Performance optimization',
                      'Security hardening',
                      'Post-migration testing',
                      '7-day monitoring support',
                      'Migration completion report',
                    ].map((benefit, idx) => (
                      <div key={idx} className='flex items-start gap-2'>
                        <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-blue-600' />
                        <span className='text-slate-600 dark:text-slate-300 text-xs'>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className='bg-blue-50/50 dark:bg-blue-950/20 mb-6 p-4 border border-blue-200/30 dark:border-blue-800/30 rounded-lg'>
                  <h4 className='mb-2 font-semibold text-blue-800 dark:text-blue-300 text-sm'>
                    Migration Timeline
                  </h4>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        2-4 business days completion
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FileCheck className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        Daily progress updates
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Shield className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        7-day post-migration support
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className='bg-green-50/50 dark:bg-green-950/20 mb-6 p-4 border border-green-200/30 dark:border-green-800/30 rounded-lg'>
                  <h4 className='mb-2 font-semibold text-green-800 dark:text-green-300 text-sm'>
                    Migration Guarantee
                  </h4>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Database className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        100% data integrity or money back
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        Zero downtime guarantee
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Search className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        SEO rankings fully preserved
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <Button
                  className='bg-gradient-to-r from-blue-600 to-cyan-600 mb-4 py-6 border-0 w-full text-white'
                  size='lg'>
                  <RefreshCw className='mr-2 w-5 h-5' />
                  Start Migration Process
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
                      1,800+ successful migrations
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
              <Clock className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                99.9% Zero Downtime Record
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                1,800+ Sites Migrated
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-purple-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                100% Success Rate
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Award className='w-5 h-5 text-orange-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                Migration Specialists
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default WebsiteMigrationPricing;
