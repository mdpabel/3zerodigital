'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  CheckCircle,
  Award,
  Users,
  Clock,
  Target,
  TrendingUp,
  Sparkles,
  Star,
  ArrowRight,
  Code,
  HeadphonesIcon,
  Trophy,
  Globe,
  Lock,
  Gauge,
  Settings,
  Wrench,
  Palette,
  Play,
  Search,
  BarChart3,
  Database,
  Server,
  Bug,
  Brush,
  Video,
  MousePointer,
  Eye,
  Megaphone,
  PieChart,
  Rocket,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ComponentWrapper from '../common/component-wrapper';

// Type definitions
interface ZeroPromise {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}

interface DifferentiatorItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface GuaranteeItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CategoryConfig {
  differentiators: DifferentiatorItem[];
  guarantees: GuaranteeItem[];
}

interface CTAButton {
  text: string;
  href: string;
}

interface CategoryWhyChooseUsProps {
  category?: CategoryType;
  className?: string;
  ctaButton?: CTAButton | null;
}

// Category type definition
type CategoryType =
  | 'development'
  | 'maintenance'
  | 'troubleshooting'
  | 'graphics'
  | 'marketing';

// Core 3Zero promises (same for all categories)
const zeroPromises: ZeroPromise[] = [
  {
    icon: Shield,
    title: '0 Vulnerabilities',
    description:
      'Enterprise-grade security protocols protect your digital assets',
    features: [
      'Security audits',
      'Malware protection',
      'SSL certificates',
      'Regular updates',
    ],
    color: 'from-emerald-600 to-emerald-700',
    bgColor:
      'from-emerald-50/50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/20',
  },
  {
    icon: Zap,
    title: '0 Downtime',
    description: '99.99% uptime guarantee with proactive monitoring',
    features: [
      '24/7 monitoring',
      'Automated backups',
      'Load balancing',
      'Rapid response',
    ],
    color: 'from-blue-600 to-blue-700',
    bgColor:
      'from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20',
  },
  {
    icon: CheckCircle,
    title: '0 Errors',
    description: 'Rigorous testing ensures flawless functionality',
    features: [
      'Code reviews',
      'Automated testing',
      'Quality assurance',
      'Performance optimization',
    ],
    color: 'from-purple-600 to-purple-700',
    bgColor:
      'from-purple-50/50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20',
  },
];

// Category-specific configurations
const categoryConfigurations: Record<CategoryType, CategoryConfig> = {
  // 1. Development Services
  development: {
    differentiators: [
      {
        icon: Code,
        title: 'Modern Tech Stack',
        description:
          'Next.js, React, MERN, Shopify - latest technologies for scalable solutions',
      },
      {
        icon: Database,
        title: 'Full-Stack Expertise',
        description:
          'From frontend React to backend Node.js and database optimization',
      },
      {
        icon: Rocket,
        title: 'Performance Focused',
        description:
          'Optimized code, fast loading times, and seamless user experiences',
      },
      {
        icon: Globe,
        title: 'Scalable Architecture',
        description:
          'Built to handle growth - from startup to enterprise level traffic',
      },
    ],
    guarantees: [
      {
        icon: Award,
        title: 'Certified Developers',
        description: 'WordPress, React, and Node.js certified development team',
      },
      {
        icon: Code,
        title: 'Clean Code Guarantee',
        description:
          'Well-documented, maintainable code following best practices',
      },
      {
        icon: Gauge,
        title: 'Performance Promise',
        description:
          'Sub-3 second load times or continued optimization at no cost',
      },
      {
        icon: HeadphonesIcon,
        title: 'Lifetime Support',
        description:
          'Ongoing technical support and maintenance for all projects',
      },
    ],
  },

  // 2. Maintenance Services
  maintenance: {
    differentiators: [
      {
        icon: Settings,
        title: 'Proactive Monitoring',
        description:
          '24/7 site monitoring with instant alerts and rapid response',
      },
      {
        icon: Shield,
        title: 'Security First',
        description:
          'Regular security scans, malware removal, and protection updates',
      },
      {
        icon: Zap,
        title: 'Speed Optimization',
        description: 'Continuous performance tuning for optimal site speed',
      },
      {
        icon: Server,
        title: 'Reliable Backups',
        description:
          'Automated daily backups with easy restoration capabilities',
      },
    ],
    guarantees: [
      {
        icon: Clock,
        title: '24/7 Monitoring',
        description:
          'Round-the-clock site monitoring with instant issue detection',
      },
      {
        icon: Bug,
        title: 'Malware-Free Promise',
        description: 'Complete malware removal and prevention systems in place',
      },
      {
        icon: Gauge,
        title: 'Uptime Guarantee',
        description: '99.9% uptime SLA with compensation for any downtime',
      },
      {
        icon: Lock,
        title: 'Security Assured',
        description:
          'SSL certificates, security hardening, and regular updates',
      },
    ],
  },

  // 3. Troubleshooting Services
  troubleshooting: {
    differentiators: [
      {
        icon: Wrench,
        title: 'Expert Diagnosis',
        description:
          'Rapid identification and resolution of complex website issues',
      },
      {
        icon: Clock,
        title: 'Fast Response',
        description: 'Emergency support with 1-hour response time guarantee',
      },
      {
        icon: Bug,
        title: 'Error Elimination',
        description:
          'Fix 404s, 500s, database errors, and all technical issues',
      },
      {
        icon: Database,
        title: 'Data Recovery',
        description: 'Expert data recovery and site restoration capabilities',
      },
    ],
    guarantees: [
      {
        icon: Target,
        title: 'Issue Resolution',
        description: 'We fix it or provide a full refund - no exceptions',
      },
      {
        icon: Clock,
        title: 'Quick Turnaround',
        description: 'Most issues resolved within 24-48 hours',
      },
      {
        icon: Database,
        title: 'Data Protection',
        description: 'Zero data loss guarantee during all troubleshooting work',
      },
      {
        icon: HeadphonesIcon,
        title: 'Emergency Support',
        description: '24/7 emergency support for critical website issues',
      },
    ],
  },

  // 4. Graphics & Video Services
  graphics: {
    differentiators: [
      {
        icon: Palette,
        title: 'Creative Excellence',
        description:
          'Award-winning designers creating memorable brand experiences',
      },
      {
        icon: Video,
        title: 'Video Expertise',
        description: 'Engaging video ads and reels that drive conversions',
      },
      {
        icon: Brush,
        title: 'Brand Identity',
        description:
          'Complete brand packages from logos to marketing materials',
      },
      {
        icon: Eye,
        title: 'Visual Impact',
        description:
          'Designs that capture attention and communicate your message',
      },
    ],
    guarantees: [
      {
        icon: Award,
        title: 'Design Excellence',
        description:
          'Professional designers with 8+ years of creative experience',
      },
      {
        icon: Target,
        title: 'Satisfaction Promise',
        description: 'Unlimited revisions until you love the final design',
      },
      {
        icon: Palette,
        title: 'Brand Consistency',
        description: 'Cohesive visual identity across all marketing materials',
      },
      {
        icon: Video,
        title: 'High-Quality Output',
        description:
          'HD video content optimized for all social media platforms',
      },
    ],
  },

  // 5. Digital Marketing Services
  marketing: {
    differentiators: [
      {
        icon: Search,
        title: 'SEO Mastery',
        description:
          'Advanced SEO strategies that drive organic traffic and rankings',
      },
      {
        icon: MousePointer,
        title: 'PPC Excellence',
        description: 'Expert Google, Meta, TikTok, and LinkedIn Ads management',
      },
      {
        icon: BarChart3,
        title: 'Data-Driven',
        description: 'Analytics-based strategies with measurable ROI tracking',
      },
      {
        icon: Target,
        title: 'Multi-Platform',
        description:
          'Comprehensive campaigns across all major advertising platforms',
      },
    ],
    guarantees: [
      {
        icon: Award,
        title: 'Certified Marketers',
        description:
          'Google Ads, Facebook Blueprint, and LinkedIn certified experts',
      },
      {
        icon: TrendingUp,
        title: 'Growth Promise',
        description:
          'Measurable improvement in traffic and conversions within 90 days',
      },
      {
        icon: PieChart,
        title: 'ROI Focused',
        description:
          'Positive return on investment or campaign optimization at no cost',
      },
      {
        icon: Megaphone,
        title: 'Full Transparency',
        description:
          'Detailed reporting and complete campaign performance visibility',
      },
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1],
    },
  },
};

const CategoryWhyChooseUs: React.FC<CategoryWhyChooseUsProps> = ({
  category = 'development',
  className = '',
  ctaButton = null,
}) => {
  // Get category-specific configuration with proper typing
  const config = categoryConfigurations[category];

  return (
    <section
      className={cn('relative py-16 md:py-24 overflow-hidden', className)}>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='mb-12 md:mb-16 text-center'>
            <motion.div variants={itemVariants} className='mb-6'>
              <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
                <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
                Why Choose Us
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className='mb-4 md:mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                The 3Zero Advantage
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed'>
              We don't just build websites – we deliver complete digital
              solutions with zero compromises on security, performance, or
              quality.
            </motion.p>
          </motion.div>

          {/* 3Zero Promises - Hero Cards (Same for all categories) */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            className='gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-3 mb-16 md:mb-20'>
            {zeroPromises.map((promise: ZeroPromise, index: number) => (
              <motion.div
                key={promise.title}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className='group relative bg-white/70 dark:bg-slate-800/70 shadow-lg hover:shadow-2xl backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl transition-all duration-300'>
                {/* Background gradient */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl md:rounded-3xl transition-opacity duration-300',
                    promise.bgColor,
                  )}
                />

                <div className='relative'>
                  {/* Icon */}
                  <div
                    className={cn(
                      'inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-r shadow-lg group-hover:shadow-xl transition-shadow duration-300',
                      promise.color,
                    )}>
                    <promise.icon className='w-8 h-8 text-white' />
                  </div>

                  {/* Content */}
                  <h3 className='mb-3 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                    {promise.title}
                  </h3>
                  <p className='mb-6 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed'>
                    {promise.description}
                  </p>

                  {/* Features */}
                  <div className='space-y-2'>
                    {promise.features.map((feature: string, idx: number) => (
                      <div key={idx} className='flex items-center gap-2'>
                        <CheckCircle className='flex-shrink-0 w-4 h-4 text-green-600 dark:text-green-400' />
                        <span className='text-slate-600 dark:text-slate-300 text-sm'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Category-Specific Differentiators & Guarantees Grid */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='gap-8 md:gap-12 grid grid-cols-1 lg:grid-cols-2 mb-16 md:mb-20'>
            {/* Category-Specific Differentiators */}
            <motion.div variants={itemVariants}>
              <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                What Sets Us Apart
              </h3>
              <div className='space-y-4'>
                {config.differentiators.map(
                  (item: DifferentiatorItem, index: number) => (
                    <motion.div
                      key={item.title}
                      whileHover={{ x: 4 }}
                      className='flex items-start gap-4 bg-white/50 hover:bg-white/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl transition-all duration-300'>
                      <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
                        <item.icon className='w-5 h-5 text-white' />
                      </div>
                      <div>
                        <h4 className='mb-1 font-bold text-slate-900 dark:text-white'>
                          {item.title}
                        </h4>
                        <p className='text-slate-600 dark:text-slate-300 text-sm'>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>

            {/* Category-Specific Guarantees */}
            <motion.div variants={itemVariants}>
              <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                Our Guarantees
              </h3>
              <div className='space-y-4'>
                {config.guarantees.map((item: GuaranteeItem, index: number) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 4 }}
                    className='flex items-start gap-4 bg-white/50 hover:bg-white/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-xl transition-all duration-300'>
                    <div className='flex-shrink-0 bg-gradient-to-r from-emerald-600 to-green-600 p-2 rounded-lg'>
                      <item.icon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <h4 className='mb-1 font-bold text-slate-900 dark:text-white'>
                        {item.title}
                      </h4>
                      <p className='text-slate-600 dark:text-slate-300 text-sm'>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Optional CTA Button */}
          {ctaButton && (
            <motion.div variants={itemVariants} className='text-center'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                <Link href={ctaButton.href} className='flex items-center gap-2'>
                  {ctaButton.text}
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default CategoryWhyChooseUs;
