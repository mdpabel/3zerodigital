'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
  TrendingUp,
  Award,
  Users,
  Star,
  Shield,
  FileCheck,
  Eye,
  Timer,
  Zap,
  Search,
  Mail,
  Server,
  Lock,
  Database,
  Globe,
  RotateCcw,
  AlertCircle,
  WifiOff,
  MonitorX,
  Link,
  Bug,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';

// Service configuration mapping
const serviceConfig = {
  'http-404-error': {
    icon: Search,
    title: 'HTTP 404 Not Found Error Fix',
    subtitle: 'Restore missing pages and fix broken links',
    description:
      'Professional 404 error diagnosis and repair service. We identify broken links, restore missing pages, and implement proper redirects for seamless user experience.',
    gradient: 'from-red-600 to-orange-600',
    badgeColor: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300',
    borderColor: 'border-red-200/50 dark:border-red-800/50',
    features: [
      'Complete 404 error audit and identification',
      'Missing page restoration or recreation',
      'Broken link detection and repair',
      'SEO-friendly redirect implementation',
      'Custom 404 page creation',
      'Internal link structure optimization',
      'External broken link analysis',
      'Search engine re-indexing setup',
      'User experience improvement plan',
      'Post-fix monitoring and alerts',
    ],
    guarantees: [
      {
        metric: 'Error Resolution',
        value: '100% fixed',
        icon: CheckCircle,
        color: 'text-green-600',
      },
      {
        metric: 'SEO Impact',
        value: 'Zero loss',
        icon: TrendingUp,
        color: 'text-blue-600',
      },
      {
        metric: 'User Experience',
        value: 'Fully restored',
        icon: Users,
        color: 'text-purple-600',
      },
    ],
    timeline: '2-4 hours',
    successRate: '100%',
    clientCount: '3,200+',
  },

  'email-deliverability': {
    icon: Mail,
    title: 'Email Deliverability Issues Fix',
    subtitle: 'Improve inbox placement and avoid spam filters',
    description:
      'Expert email deliverability optimization service. We resolve spam filter issues, improve sender reputation, and ensure your emails reach the inbox consistently.',
    gradient: 'from-blue-600 to-cyan-600',
    badgeColor:
      'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
    borderColor: 'border-blue-200/50 dark:border-blue-800/50',
    features: [
      'Email deliverability audit and analysis',
      'Spam filter diagnosis and resolution',
      'Sender reputation improvement',
      'SPF, DKIM, and DMARC configuration',
      'Blacklist removal and prevention',
      'Email content optimization',
      'Inbox placement testing',
      'Delivery rate monitoring setup',
      'Email authentication implementation',
      'Ongoing deliverability support',
    ],
    guarantees: [
      {
        metric: 'Delivery Rate',
        value: '95%+ inbox',
        icon: Mail,
        color: 'text-green-600',
      },
      {
        metric: 'Spam Score',
        value: 'Optimized',
        icon: Shield,
        color: 'text-blue-600',
      },
      {
        metric: 'Authentication',
        value: 'Fully configured',
        icon: Lock,
        color: 'text-purple-600',
      },
    ],
    timeline: '4-8 hours',
    successRate: '98%',
    clientCount: '1,800+',
  },

  'http-500-error': {
    icon: Server,
    title: 'HTTP 500 Internal Server Error Fix',
    subtitle: 'Diagnose and resolve critical server errors',
    description:
      'Emergency 500 error resolution service. We quickly diagnose server issues, fix internal errors, and restore your website accessibility with minimal downtime.',
    gradient: 'from-red-600 to-pink-600',
    badgeColor: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300',
    borderColor: 'border-red-200/50 dark:border-red-800/50',
    features: [
      'Emergency server error diagnosis',
      'Error log analysis and interpretation',
      'Server configuration troubleshooting',
      'Database connection issue resolution',
      'Plugin/theme conflict identification',
      'Memory limit and resource optimization',
      'Server permission fixes',
      'Code debugging and error correction',
      'Performance bottleneck resolution',
      'Preventive monitoring setup',
    ],
    guarantees: [
      {
        metric: 'Response Time',
        value: '< 30 minutes',
        icon: Timer,
        color: 'text-green-600',
      },
      {
        metric: 'Resolution',
        value: '100% fixed',
        icon: CheckCircle,
        color: 'text-blue-600',
      },
      {
        metric: 'Uptime',
        value: 'Fully restored',
        icon: Server,
        color: 'text-purple-600',
      },
    ],
    timeline: '1-3 hours',
    successRate: '99%',
    clientCount: '2,900+',
  },

  'http-403-error': {
    icon: Shield,
    title: 'HTTP 403 Forbidden Error Fix',
    subtitle: 'Restore proper access to website resources',
    description:
      'Professional 403 Forbidden error resolution service. We identify permission issues, fix access restrictions, and ensure proper resource accessibility.',
    gradient: 'from-orange-600 to-red-600',
    badgeColor:
      'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300',
    borderColor: 'border-orange-200/50 dark:border-orange-800/50',
    features: [
      'Permission and access audit',
      'File and directory permission fixes',
      'Server configuration correction',
      '.htaccess file troubleshooting',
      'User role and capability restoration',
      'Security plugin conflict resolution',
      'Authentication issue diagnosis',
      'URL structure verification',
      'Redirect loop identification',
      'Access control optimization',
    ],
    guarantees: [
      {
        metric: 'Access Restoration',
        value: '100% fixed',
        icon: CheckCircle,
        color: 'text-green-600',
      },
      {
        metric: 'Security',
        value: 'Maintained',
        icon: Shield,
        color: 'text-blue-600',
      },
      {
        metric: 'User Experience',
        value: 'Fully restored',
        icon: Users,
        color: 'text-purple-600',
      },
    ],
    timeline: '1-2 hours',
    successRate: '100%',
    clientCount: '2,100+',
  },

  'ssl-mixed-content': {
    icon: Lock,
    title: 'SSL Mixed Content Error Fix',
    subtitle: 'Secure all resources with HTTPS implementation',
    description:
      'Complete SSL mixed content resolution service. We identify and fix all insecure resources, ensuring your entire website loads securely over HTTPS.',
    gradient: 'from-green-600 to-emerald-600',
    badgeColor:
      'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
    borderColor: 'border-green-200/50 dark:border-green-800/50',
    features: [
      'Mixed content detection and analysis',
      'HTTP to HTTPS resource conversion',
      'SSL certificate verification',
      'Security header implementation',
      'Image and asset URL updating',
      'Third-party resource optimization',
      'Content Security Policy setup',
      'Browser security warning elimination',
      'HTTPS redirect configuration',
      'SSL monitoring and alerts',
    ],
    guarantees: [
      {
        metric: 'SSL Security',
        value: '100% secure',
        icon: Lock,
        color: 'text-green-600',
      },
      {
        metric: 'Mixed Content',
        value: 'Fully resolved',
        icon: CheckCircle,
        color: 'text-blue-600',
      },
      {
        metric: 'Browser Warnings',
        value: 'Eliminated',
        icon: Shield,
        color: 'text-purple-600',
      },
    ],
    timeline: '2-4 hours',
    successRate: '100%',
    clientCount: '3,500+',
  },

  'white-screen-death': {
    icon: MonitorX,
    title: 'White Screen of Death Fix',
    subtitle: 'Restore complete website functionality',
    description:
      'Emergency White Screen of Death (WSOD) resolution service. We quickly diagnose and fix the underlying issues causing the blank screen error.',
    gradient: 'from-slate-600 to-gray-600',
    badgeColor:
      'bg-slate-100 dark:bg-slate-900/20 text-slate-800 dark:text-slate-300',
    borderColor: 'border-slate-200/50 dark:border-slate-800/50',
    features: [
      'Emergency WSOD diagnosis',
      'Error log investigation',
      'Memory limit issue resolution',
      'Plugin conflict identification',
      'Theme compatibility fixes',
      'PHP error debugging',
      'Database corruption repair',
      'Server resource optimization',
      'Code syntax error correction',
      'Site functionality restoration',
    ],
    guarantees: [
      {
        metric: 'Response Time',
        value: '< 15 minutes',
        icon: Timer,
        color: 'text-green-600',
      },
      {
        metric: 'Site Recovery',
        value: '100% restored',
        icon: RotateCcw,
        color: 'text-blue-600',
      },
      {
        metric: 'Data Safety',
        value: 'Fully protected',
        icon: Shield,
        color: 'text-purple-600',
      },
    ],
    timeline: '30 minutes - 2 hours',
    successRate: '99%',
    clientCount: '4,200+',
  },

  'database-connection-error': {
    icon: Database,
    title: 'Database Connection Error Fix',
    subtitle: 'Restore WordPress database connectivity',
    description:
      'Expert database connection error resolution service. We diagnose and fix database connectivity issues to restore your WordPress site with zero downtime.',
    gradient: 'from-purple-600 to-violet-600',
    badgeColor:
      'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300',
    borderColor: 'border-purple-200/50 dark:border-purple-800/50',
    features: [
      'Database connection diagnosis',
      'Database credential verification',
      'Server connectivity testing',
      'Database repair and optimization',
      'Configuration file restoration',
      'Hosting environment troubleshooting',
      'Database backup and recovery',
      'Connection pooling optimization',
      'Security enhancement',
      'Monitoring setup for prevention',
    ],
    guarantees: [
      {
        metric: 'Connection Restore',
        value: '100% fixed',
        icon: Database,
        color: 'text-green-600',
      },
      {
        metric: 'Data Integrity',
        value: 'Fully preserved',
        icon: Shield,
        color: 'text-blue-600',
      },
      {
        metric: 'Downtime',
        value: 'Minimized',
        icon: Clock,
        color: 'text-purple-600',
      },
    ],
    timeline: '1-3 hours',
    successRate: '100%',
    clientCount: '3,800+',
  },

  'dns-issue': {
    icon: Globe,
    title: 'DNS Issue Resolution',
    subtitle: 'Fix domain connectivity and propagation issues',
    description:
      'Professional DNS troubleshooting service. We resolve domain-related problems, fix DNS configuration, and ensure seamless website connectivity.',
    gradient: 'from-cyan-600 to-blue-600',
    badgeColor:
      'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300',
    borderColor: 'border-cyan-200/50 dark:border-cyan-800/50',
    features: [
      'DNS configuration audit',
      'Domain propagation troubleshooting',
      'Nameserver configuration fixes',
      'DNS record optimization',
      'Subdomain connectivity issues',
      'Email DNS record setup',
      'CDN DNS integration',
      'DNS security enhancement',
      'Performance optimization',
      'Monitoring and alerting setup',
    ],
    guarantees: [
      {
        metric: 'DNS Resolution',
        value: '100% fixed',
        icon: Globe,
        color: 'text-green-600',
      },
      {
        metric: 'Propagation',
        value: 'Optimized',
        icon: TrendingUp,
        color: 'text-blue-600',
      },
      {
        metric: 'Connectivity',
        value: 'Fully restored',
        icon: WifiOff,
        color: 'text-purple-600',
      },
    ],
    timeline: '2-6 hours',
    successRate: '99%',
    clientCount: '2,600+',
  },

  'wordpress-rescue-repair': {
    icon: Wrench,
    title: 'WordPress Rescue & Repair',
    subtitle: 'Complete WordPress site recovery service',
    description:
      'Comprehensive WordPress rescue service for broken or crashed sites. We fix theme conflicts, plugin errors, white screen issues, database problems, and more.',
    gradient: 'from-indigo-600 to-purple-600',
    badgeColor:
      'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300',
    borderColor: 'border-indigo-200/50 dark:border-indigo-800/50',
    features: [
      'Complete WordPress site diagnosis',
      'Theme and plugin conflict resolution',
      'White screen of death fixes',
      'Database corruption repair',
      'Malware removal and security cleanup',
      'Performance optimization',
      'Broken functionality restoration',
      'Content recovery and restoration',
      'Security hardening implementation',
      'Ongoing maintenance recommendations',
    ],
    guarantees: [
      {
        metric: 'Site Recovery',
        value: '100% restored',
        icon: RotateCcw,
        color: 'text-green-600',
      },
      {
        metric: 'Data Recovery',
        value: 'Maximum preserved',
        icon: Database,
        color: 'text-blue-600',
      },
      {
        metric: 'Functionality',
        value: 'Fully operational',
        icon: CheckCircle,
        color: 'text-purple-600',
      },
    ],
    timeline: '4-8 hours',
    successRate: '98%',
    clientCount: '5,100+',
  },
};

interface TroubleshootingPricingProps {
  name: keyof typeof serviceConfig;
  price: string;
  productId: string;
}

const TroubleshootingPricing: React.FC<TroubleshootingPricingProps> = ({
  name,
  price,
  productId,
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const service = serviceConfig[name];

  if (!service) {
    return (
      <div className='py-16 text-center'>
        <p className='text-red-600'>Service configuration not found</p>
      </div>
    );
  }

  const IconComponent = service.icon;

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
            <Badge
              className={cn(
                'mb-6 px-4 py-2 border font-medium text-sm',
                service.badgeColor,
                service.borderColor,
              )}>
              <AlertTriangle className='mr-2 w-4 h-4' />
              Emergency Troubleshooting Service
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-slate-700 dark:via-slate-200 to-slate-900 dark:to-white text-transparent'>
                {service.title}
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              {service.description}
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Timer className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  {service.timeline} Resolution
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  {service.successRate} Success Rate
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  {service.clientCount} Clients Helped
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
              {/* Service Guarantees */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Service Guarantees
                </h2>

                <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
                  {service.guarantees.map((guarantee, idx) => (
                    <div
                      key={idx}
                      className='bg-white/50 dark:bg-slate-800/50 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl text-center'>
                      <div className='flex justify-center mb-3'>
                        <guarantee.icon
                          className={cn('w-8 h-8', guarantee.color)}
                        />
                      </div>
                      <h3 className='mb-1 font-semibold text-slate-900 dark:text-white text-sm'>
                        {guarantee.metric}
                      </h3>
                      <p className='font-bold text-lg'>{guarantee.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  Complete Service Package
                </h2>

                <div className='gap-3 grid grid-cols-1 md:grid-cols-2'>
                  {(showAllFeatures
                    ? service.features
                    : service.features.slice(0, 8)
                  ).map((feature, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <CheckCircle className='flex-shrink-0 w-4 h-4 text-green-600' />
                      <span className='text-slate-600 dark:text-slate-300 text-sm'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {!showAllFeatures && service.features.length > 8 && (
                  <div className='mt-4 text-center'>
                    <Button
                      variant='outline'
                      onClick={() => setShowAllFeatures(true)}
                      className='bg-white/50 dark:bg-slate-800/50'>
                      <Eye className='mr-2 w-4 h-4' />
                      Show All Features ({service.features.length - 8} more)
                    </Button>
                  </div>
                )}
              </div>

              {/* How It Works */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                  How We Fix Your Issue
                </h2>

                <div className='gap-6 grid grid-cols-1 md:grid-cols-4'>
                  {[
                    {
                      step: '1',
                      title: 'Immediate Response',
                      description: 'Emergency assessment within minutes',
                      icon: Timer,
                    },
                    {
                      step: '2',
                      title: 'Diagnosis',
                      description:
                        'Complete error analysis and root cause identification',
                      icon: Search,
                    },
                    {
                      step: '3',
                      title: 'Resolution',
                      description:
                        'Expert fix implementation with real-time updates',
                      icon: Wrench,
                    },
                    {
                      step: '4',
                      title: 'Verification',
                      description: 'Complete testing and monitoring setup',
                      icon: CheckCircle,
                    },
                  ].map((step, idx) => (
                    <div key={idx} className='text-center'>
                      <div className='inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-full w-12 h-12'>
                        <step.icon className='w-6 h-6 text-white' />
                      </div>
                      <div className='bg-blue-600 mx-auto mb-2 rounded-full w-8 h-8 font-bold text-white text-sm text-center leading-8'>
                        {step.step}
                      </div>
                      <h3 className='mb-2 font-semibold text-slate-900 dark:text-white text-sm'>
                        {step.title}
                      </h3>
                      <p className='text-slate-600 dark:text-slate-300 text-xs'>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
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
                  <div
                    className={cn(
                      'inline-flex justify-center items-center bg-gradient-to-r mb-4 rounded-2xl w-16 h-16',
                      service.gradient,
                    )}>
                    <IconComponent className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                    Emergency Fix Service
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    {service.subtitle}
                  </p>
                </div>

                {/* Pricing */}
                <div className='mb-6 text-center'>
                  <div className='mb-2'>
                    <span className='font-bold text-4xl'>
                      <span
                        className={cn(
                          'bg-clip-text bg-gradient-to-r text-transparent',
                          service.gradient,
                        )}>
                        {price}
                      </span>
                    </span>
                  </div>
                  <p className='text-slate-500 dark:text-slate-400 text-sm'>
                    One-time fix fee
                  </p>
                </div>

                {/* Emergency Features */}
                <div className='mb-6'>
                  <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                    Emergency Service Includes
                  </h4>
                  <div className='space-y-2'>
                    {[
                      'Immediate emergency response',
                      'Expert diagnosis and analysis',
                      'Complete issue resolution',
                      'Real-time progress updates',
                      'Post-fix verification testing',
                      'Prevention recommendations',
                      '48-hour post-fix monitoring',
                      'Detailed resolution report',
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
                    Resolution Timeline
                  </h4>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Timer className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        Resolution: {service.timeline}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Zap className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        Emergency response in minutes
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FileCheck className='w-3 h-3 text-green-600' />
                      <span className='text-green-700 dark:text-green-300 text-xs'>
                        Real-time progress updates
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className='bg-blue-50/50 dark:bg-blue-950/20 mb-6 p-4 border border-blue-200/30 dark:border-blue-800/30 rounded-lg'>
                  <h4 className='mb-2 font-semibold text-blue-800 dark:text-blue-300 text-sm'>
                    Fix Guarantee
                  </h4>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        100% issue resolution or money back
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Shield className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        48-hour monitoring included
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-3 h-3 text-blue-600' />
                      <span className='text-blue-700 dark:text-blue-300 text-xs'>
                        {service.successRate} historical success rate
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <Button
                  className={cn(
                    'bg-gradient-to-r mb-4 py-6 border-0 w-full text-white',
                    service.gradient,
                  )}
                  size='lg'>
                  <AlertTriangle className='mr-2 w-5 h-5' />
                  Fix My Issue Now
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <div className='flex gap-2'>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Phone className='mr-1 w-4 h-4' />
                    Emergency Call
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <MessageSquare className='mr-1 w-4 h-4' />
                    Live Chat
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
                      {service.clientCount} issues resolved
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
              <Timer className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                Average {service.timeline} Resolution
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                15,000+ Issues Resolved
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-purple-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                {service.successRate} Success Rate
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Award className='w-5 h-5 text-orange-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                24/7 Emergency Support
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default TroubleshootingPricing;
