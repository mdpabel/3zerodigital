'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  Globe,
  Download,
  Code,
  FileText,
  BookOpen,
  Rocket,
  MessageSquare,
  Phone,
  HelpCircle,
  ChevronDown,
  Server,
  CloudDownload,
  ShoppingCart,
  Search,
} from 'lucide-react';
import { useRef } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';
import ServiceHero from '@/components/common/Hero';
import { Prisma } from '@prisma/client';
import TemplateGrid from '@/components/portfolio/template-grid';
import PortfolioClient from '@/components/portfolio/portfolio-client';
import {
  TemplateCategory,
  TemplateWithNestedCategories,
} from '@/components/portfolio/types';

type Props = {
  initialTemplates: TemplateWithNestedCategories[];
  categories: TemplateCategory[];
  showFilters?: boolean;
  totalCount?: number;
};

export default function CampaignPage({
  initialTemplates,
  categories,
  showFilters,
  totalCount,
}: Props) {
  return (
    <div className='relative overflow-hidden'>
      {/* Hero Section */}
      <ServiceHero
        title='Free Personal Website'
        subtitle='Launch Your Online Presence Today'
        description='Get a completely free, professionally designed personal website with the power of WordPress and Next.js, plus essential resources to secure and promote your site.'
        badge='Limited Time Offer'
        backgroundGradient='from-blue-600/20 via-purple-600/10 to-indigo-600/20 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-indigo-900/30'
        primaryColor='from-blue-600 to-purple-600'
        secondaryColor='from-indigo-500 to-blue-600'
        features={[
          {
            icon: 'Rocket',
            text: 'Headless Next.js + WordPress',
            description: 'Super fast, secure & modern',
            color: 'from-blue-500 to-indigo-600',
          },
          {
            icon: 'Shield',
            text: 'WordPress Security Handbook',
            description: 'Essential security practices',
            color: 'from-emerald-500 to-green-600',
          },
          {
            icon: 'BookOpen',
            text: 'Personal Branding Handbook',
            description: 'Build your online reputation',
            color: 'from-purple-500 to-pink-600',
          },
          {
            icon: 'Globe',
            text: 'Free Hosting Guide',
            description: 'documentation to host your site for free',
            color: 'from-orange-500 to-red-600',
          },
        ]}
        stats={[
          { value: '100%', label: 'Free Forever', icon: 'Check' },
          { value: '2+', label: 'Free Resources', icon: 'FileText' },
          { value: '24/7', label: 'Documentation', icon: 'BookOpen' },
        ]}
        ctaPrimary={{
          text: 'Browse Templates',
          href: '#templates',
        }}
        ctaSecondary={{
          text: 'How It Works',
          href: '#how-it-works',
        }}
      />

      {/* How It Works Section */}
      <div id='how-it-works' className='relative py-20 md:py-32'>
        <ComponentWrapper>
          <div className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-16 md:mb-20 text-center'>
              <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl'>
                How It{' '}
                <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                  Works
                </span>
              </h2>
              <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
                Getting your free website is simple. Follow these three easy
                steps to launch your professional online presence.
              </p>
            </motion.div>

            {/* Steps */}
            <div className='relative gap-8 md:gap-12 grid grid-cols-1 md:grid-cols-4 mb-16 text-left'>
              {/* Connecting lines - Animated */}
              <motion.div
                className='hidden md:block top-1/2 right-0 left-0 z-0 absolute bg-gradient-to-r from-blue-600 to-purple-600 h-1 -translate-y-1/2 transform'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='z-10 relative'>
                <div className='bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl h-full'>
                  <div className='flex justify-center items-center bg-blue-100 dark:bg-blue-900/30 mx-auto mb-4 rounded-full w-12 h-12'>
                    <Search className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl text-center'>
                    Choose a Template
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-center'>
                    Browse our collection of professional templates and select
                    the one that fits your needs.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='z-10 relative'>
                <div className='bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl h-full'>
                  <div className='flex justify-center items-center bg-purple-100 dark:bg-purple-900/30 mx-auto mb-4 rounded-full w-12 h-12'>
                    <ShoppingCart className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl text-center'>
                    Place Your Order
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-center'>
                    Complete the simple order process (don't worry, it's
                    completely free).
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='z-10 relative'>
                <div className='bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl h-full'>
                  <div className='flex justify-center items-center bg-green-100 dark:bg-green-900/30 mx-auto mb-4 rounded-full w-12 h-12'>
                    <CloudDownload className='w-6 h-6 text-green-600 dark:text-green-400' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl text-center'>
                    Download & Customize
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-center'>
                    Access your files, resources, and documentation from your
                    dashboard and make it your own.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='z-10 relative'>
                <div className='bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl h-full'>
                  <div className='flex justify-center items-center bg-teal-100 dark:bg-teal-900/30 mx-auto mb-4 rounded-full w-12 h-12'>
                    <Server className='w-6 h-6 text-teal-600 dark:text-teal-400' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl text-center'>
                    Deploy & Host
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-center'>
                    Follow our free video guides to deploy on Vercel and connect
                    your Namecheap domain - all for free forever.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-16 md:mb-20 text-center'>
              <h2 className='mb-12 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl'>
                What's{' '}
                <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                  Included
                </span>
              </h2>
            </motion.div>

            {/* Included items grid */}
            <div className='gap-8 grid grid-cols-1 md:grid-cols-2 mb-16'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='bg-white dark:bg-slate-800 shadow-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
                <div className='flex flex-col p-6 h-full'>
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl text-white'>
                      <Code className='w-6 h-6' />
                    </div>
                    <div>
                      <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                        Headless NextJS with WordPress
                      </h3>
                      <Badge className='bg-blue-100 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300'>
                        Professional Option
                      </Badge>
                    </div>
                  </div>
                  <p className='mb-6 text-slate-600 dark:text-slate-300'>
                    A cutting-edge website architecture that delivers
                    lightning-fast performance, enhanced security, and a
                    superior user experience.
                  </p>
                  <ul className='space-y-2 mb-6'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Ultra-fast page loading speeds
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Enhanced security with decoupled architecture
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        SEO-optimized for better search rankings
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Smooth, app-like user experience
                      </span>
                    </li>
                  </ul>
                  <div className='mt-auto'>
                    <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 w-full'>
                      <Link
                        href='/templates?type=headless'
                        className='flex justify-center items-center gap-2'>
                        Browse Headless Templates
                        <ArrowRight className='w-4 h-4' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='bg-white dark:bg-slate-800 shadow-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
                <div className='flex flex-col p-6 h-full'>
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl text-white'>
                      <Globe className='w-6 h-6' />
                    </div>
                    <div>
                      <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                        Standard WordPress Website
                      </h3>
                      <Badge className='bg-purple-100 hover:bg-purple-100 dark:bg-purple-900/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300'>
                        Beginner-Friendly
                      </Badge>
                    </div>
                  </div>
                  <p className='mb-6 text-slate-600 dark:text-slate-300'>
                    A traditional WordPress setup that's easy to manage and
                    customize, perfect for beginners and those who prefer a
                    simpler solution.
                  </p>
                  <ul className='space-y-2 mb-6'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        User-friendly admin dashboard
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Easy content management
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Wide range of plugins and themes
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='flex-shrink-0 mt-0.5 w-5 h-5 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Simple setup and maintenance
                      </span>
                    </li>
                  </ul>
                  <div className='mt-auto'>
                    <Button className='bg-gradient-to-r from-purple-600 to-pink-600 w-full'>
                      <Link
                        href='/templates?type=wordpress'
                        className='flex justify-center items-center gap-2'>
                        Browse WordPress Templates
                        <ArrowRight className='w-4 h-4' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Handbooks section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-purple-50 dark:to-purple-950/30 shadow-xl mb-16 p-8 md:p-12 rounded-3xl'>
              <h3 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                Free Resource Handbooks
              </h3>
              <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
                <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl'>
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400'>
                      <Shield className='w-5 h-5' />
                    </div>
                    <div>
                      <h4 className='mb-1 font-semibold text-slate-900 dark:text-white text-lg'>
                        WordPress Security Handbook
                      </h4>
                    </div>
                  </div>
                  <p className='mb-4 text-slate-600 dark:text-slate-300'>
                    Comprehensive guide to securing your WordPress website
                    against common threats and vulnerabilities.
                  </p>
                  <ul className='space-y-1 mb-4 text-sm'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Security best practices
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Plugin security guidelines
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Backup strategies
                      </span>
                    </li>
                  </ul>
                  <Button variant='outline' className='mt-2 w-full'>
                    <Download className='mr-2 w-4 h-4' />
                    Preview Handbook
                  </Button>
                </div>

                <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl'>
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400'>
                      <BookOpen className='w-5 h-5' />
                    </div>
                    <div>
                      <h4 className='mb-1 font-semibold text-slate-900 dark:text-white text-lg'>
                        Personal Branding Handbook
                      </h4>
                    </div>
                  </div>
                  <p className='mb-4 text-slate-600 dark:text-slate-300'>
                    Learn how to build and promote your personal brand online to
                    attract opportunities and grow your audience.
                  </p>
                  <ul className='space-y-1 mb-4 text-sm'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Brand development strategies
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Content creation tips
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='text-slate-700 dark:text-slate-300'>
                        Social media optimization
                      </span>
                    </li>
                  </ul>
                  <Button variant='outline' className='mt-2 w-full'>
                    <Download className='mr-2 w-4 h-4' />
                    Preview Handbook
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='group inline-block relative'>
                <Button
                  asChild
                  size='lg'
                  className='relative bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl md:shadow-2xl md:group-hover:shadow-blue-500/25 group-hover:shadow-xl px-8 md:px-10 py-6 md:py-7 overflow-hidden font-semibold text-base md:text-lg transition-all duration-300'>
                  <Link
                    href='/templates'
                    className='flex justify-center items-center gap-3'>
                    Browse Free Website Templates
                    <ArrowRight className='w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1' />
                  </Link>
                </Button>
                <div className='-z-10 absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 md:group-hover:opacity-30 group-hover:opacity-20 blur-xl rounded-lg transition-opacity duration-300' />
              </motion.div>
            </motion.div>
          </div>
        </ComponentWrapper>
      </div>

      {/* Featured Templates Section */}
      <div className='relative bg-slate-50 dark:bg-slate-900/50 py-20 md:py-32'>
        <ComponentWrapper>
          <div className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-16 md:mb-20 text-center'>
              <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl'>
                Featured{' '}
                <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                  Templates
                </span>
              </h2>
              <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
                Browse our selection of professionally designed templates to
                kickstart your online presence
              </p>
            </motion.div>

            {/* Template grid */}
            <div id='templates'>
              <PortfolioClient
                initialTemplates={initialTemplates}
                categories={categories}
                showFilters={showFilters}
                totalCount={totalCount}
              />
            </div>
          </div>
        </ComponentWrapper>
      </div>

      {/* FAQ Section */}
      <div className='relative py-20 md:py-32'>
        <ComponentWrapper>
          <div className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-16 text-center'>
              <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
                <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
                Frequently Asked Questions
              </Badge>

              <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl'>
                <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                  Common Questions
                </span>
              </h2>

              <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
                Find answers to common questions about our free website campaign
              </p>
            </motion.div>

            {/* FAQ Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='space-y-4'>
              {/* FAQ Item 1 */}
              <FAQItem
                question='Is this website really free?'
                answer="Yes! We're offering these templates and resources completely free with no hidden costs. This campaign is part of our commitment to helping individuals and small businesses establish their online presence."
              />

              {/* FAQ Item 2 */}
              <FAQItem
                question="What's the difference between the two template options?"
                answer="The Headless Next.js with WordPress option offers superior performance and security but requires slightly more technical knowledge to set up. The standard WordPress option is easier to use for beginners but doesn't have the same performance benefits."
              />

              {/* FAQ Item 3 */}
              <FAQItem
                question='Do I need to pay for hosting?'
                answer="Yes, while the templates and resources are free, you'll need to arrange your own hosting. We provide recommendations for affordable hosting options in our documentation."
              />

              {/* FAQ Item 4 */}
              <FAQItem
                question='Can I modify the templates?'
                answer='Absolutely! You have complete freedom to customize the templates to fit your needs. The code is well-documented to make modifications easier.'
              />

              {/* FAQ Item 5 */}
              <FAQItem
                question='What technical skills do I need?'
                answer='For standard WordPress templates, basic computer skills are sufficient. For headless templates, some familiarity with the command line and basic web development concepts is helpful, though our documentation guides you through the process step by step.'
              />

              {/* FAQ Item 6 */}
              <FAQItem
                question='How do I get support if I need help?'
                answer='Our free templates come with comprehensive documentation. For more personalized assistance, we offer paid support packages or you can post questions in our community forum.'
              />
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mt-16 text-center'>
              <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                Ready to launch your website?
              </h3>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='group inline-block relative'>
                <Button
                  asChild
                  size='lg'
                  className='relative bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl md:shadow-2xl md:group-hover:shadow-blue-500/25 group-hover:shadow-xl px-8 md:px-10 py-6 md:py-7 overflow-hidden font-semibold text-base md:text-lg transition-all duration-300'>
                  <Link
                    href='/templates'
                    className='flex justify-center items-center gap-3'>
                    Get Started Now
                    <Download className='w-4 md:w-5 h-4 md:h-5' />
                  </Link>
                </Button>
                <div className='-z-10 absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 md:group-hover:opacity-30 group-hover:opacity-20 blur-xl rounded-lg transition-opacity duration-300' />
              </motion.div>
            </motion.div>
          </div>
        </ComponentWrapper>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='hover:bg-white/50 dark:hover:bg-slate-800/50 p-6 w-full text-left transition-colors duration-200'>
        <div className='flex justify-between items-center gap-4'>
          <h3 className='font-bold text-slate-900 dark:text-white text-lg'>
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className='flex-shrink-0'>
            <ChevronDown className='w-6 h-6 text-slate-500' />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'>
            <div className='px-6 pb-6 border-slate-200/30 dark:border-slate-700/30 border-t'>
              <p className='pt-4 text-slate-600 dark:text-slate-300 leading-relaxed'>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
