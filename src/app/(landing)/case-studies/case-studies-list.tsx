'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Globe,
  Quote,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ComponentWrapper from '@/components/common/component-wrapper';
import Image from 'next/image';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  clientName: string;
  location: string;
  services: string[];
  problem: string;
  solution: string;
  tools: string[];
  timeline: string;
  results: string;
  testimonial?: string;
  ctaText: string;
  ctaUrl: string;
  screenshots: string[];
}

const dummyCaseStudies: CaseStudy[] = [
  {
    id: 1,
    clientName: 'E-commerce Brand in UK',
    location: 'London, UK',
    services: [
      'Custom WordPress Development',
      'On-Page SEO',
      'Malware Cleanup',
    ],
    problem:
      'The client was experiencing frequent site crashes, malware infections, poor SEO performance, and slow loading times, leading to lost revenue and poor user experience.',
    solution:
      'We performed a comprehensive malware scan and cleanup, migrated to a optimized WordPress setup, implemented custom caching mechanisms, and executed a full on-page SEO strategy including content optimization and technical fixes.',
    tools: ['WordPress', 'Cloudflare', 'RankMath', 'Next.js'],
    timeline: '3 weeks',
    results:
      'Site uptime reached 100%, page load speed improved by 300%, organic traffic surged by 150%, and sales increased by 80%. No security incidents since implementation.',
    testimonial:
      '3Zero Digital delivered beyond expectations. Our site is now secure and performing better than ever!',
    ctaText: 'View Full Details',
    ctaUrl: '/case-studies/ecommerce-uk',
    screenshots: [
      '/images/placeholder-screenshot-1.jpg',
      '/images/placeholder-screenshot-1-2.jpg',
    ],
  },
  {
    id: 2,
    clientName: 'FinTech Startup',
    location: 'New York, USA',
    services: ['Web Application Development', 'Performance Optimization'],
    problem:
      'The startup needed a secure, scalable web application but faced issues with slow API responses and vulnerability to cyber threats.',
    solution:
      'Developed a modern web app using Next.js, integrated secure authentication, optimized database queries, and deployed on scalable cloud infrastructure.',
    tools: ['Next.js', 'Firebase', 'Stripe', 'Vercel'],
    timeline: '2 months',
    results:
      'Application handles 10k+ concurrent users, zero downtime, 40% reduction in operational costs, and passed all compliance audits.',
    testimonial:
      'Their zero-compromise approach ensured our platform is robust and user-friendly.',
    ctaText: 'Explore More',
    ctaUrl: '/case-studies/fintech-us',
    screenshots: ['/images/placeholder-screenshot-2-1.jpg'],
  },
  {
    id: 3,
    clientName: 'Healthcare Provider',
    location: 'Global',
    services: ['Website Security Hardening', 'Custom CMS Development'],
    problem:
      'Sensitive patient data was at risk due to outdated security protocols and an inefficient content management system.',
    solution:
      'Implemented multi-layer security including firewalls, encryption, and regular audits. Built a custom CMS with role-based access and automated backups.',
    tools: ['WordPress', 'AWS', 'Sucuri', 'Custom Scripts'],
    timeline: '1 month',
    results:
      'Achieved HIPAA compliance, reduced data breach risks to zero, improved content update speed by 200%, and enhanced overall site performance.',
    testimonial:
      'Professional and thorough - they made our platform secure and efficient.',
    ctaText: 'See Results',
    ctaUrl: '/case-studies/healthcare-global',
    screenshots: [
      '/images/placeholder-screenshot-3-1.jpg',
      '/images/placeholder-screenshot-3-2.jpg',
    ],
  },
  {
    id: 4,
    clientName: 'SaaS Platform in EU',
    location: 'Berlin, Germany',
    services: ['SEO Audit & Implementation', 'UI/UX Redesign'],
    problem:
      'Low search engine visibility and poor user retention due to outdated design and unoptimized content.',
    solution:
      'Conducted in-depth SEO audit, redesigned UI/UX for better navigation, and implemented on-page and technical SEO best practices.',
    tools: ['RankMath', 'Figma', 'Google Analytics', 'Next.js'],
    timeline: '6 weeks',
    results:
      'Organic search traffic grew by 250%, bounce rate decreased by 45%, and user session duration increased by 60%.',
    testimonial:
      'Transformative results with minimal disruption to our operations.',
    ctaText: 'Discover How',
    ctaUrl: '/case-studies/saas-eu',
    screenshots: ['/images/placeholder-screenshot-4-1.jpg'],
  },
];

const CaseStudiesList = () => {
  const caseStudies = dummyCaseStudies;

  const featuredCase = caseStudies[0];
  const otherCases = caseStudies.slice(1);

  return (
    <section className='relative py-16 md:py-24 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <Badge className='bg-blue-100 dark:bg-blue-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <Briefcase className='mr-2 w-4 h-4' />
              Success Stories
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Case Studies & Client Wins
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Discover how we deliver zero-compromise digital solutions that
              drive real business results
            </p>
          </motion.div>

          {/* Featured Case Study */}
          {featuredCase && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='mb-16'>
              <h2 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl'>
                Featured Case Study
              </h2>

              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
                <div className='gap-8 grid grid-cols-1 lg:grid-cols-2'>
                  <div className='relative lg:order-2'>
                    <Image
                      src={
                        featuredCase.screenshots[0] ||
                        '/images/not_found_image.jpg'
                      }
                      alt={featuredCase.clientName}
                      width={600}
                      height={400}
                      className='w-full h-64 lg:h-full object-cover'
                    />
                    <div className='top-4 right-4 absolute'>
                      <Badge className='bg-blue-600 text-white'>
                        <TrendingUp className='mr-1 w-3 h-3' />
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <div className='lg:order-1 p-8'>
                    <div className='mb-4'>
                      <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                        <Link
                          href={featuredCase.ctaUrl}
                          className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                          {featuredCase.clientName}
                        </Link>
                      </h3>
                      <p className='mb-6 text-slate-600 dark:text-slate-300 text-lg line-clamp-3'>
                        {featuredCase.problem}
                      </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-4 mb-6 text-slate-500 dark:text-slate-400 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Globe className='w-4 h-4' />
                        <span>{featuredCase.location}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4' />
                        <span>{featuredCase.timeline}</span>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2 mb-6'>
                      {featuredCase.services.map((service, idx) => (
                        <Badge
                          key={idx}
                          variant='secondary'
                          className='text-xs'>
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className='mb-6'>
                      <div className='flex items-center gap-2 mb-2 font-semibold text-slate-800 dark:text-slate-100'>
                        <TrendingUp className='w-4 h-4 text-blue-500' />
                        Key Results
                      </div>
                      <p className='text-slate-600 dark:text-slate-300 text-sm line-clamp-3'>
                        {featuredCase.results}
                      </p>
                    </div>

                    {featuredCase.testimonial && (
                      <blockquote className='mb-6 pl-4 border-blue-500 border-l-4 text-slate-600 dark:text-slate-300 text-sm italic line-clamp-2'>
                        {featuredCase.testimonial}
                      </blockquote>
                    )}

                    <Button
                      asChild
                      className='bg-blue-600 hover:bg-blue-700 text-white'>
                      <Link href={featuredCase.ctaUrl}>
                        {featuredCase.ctaText}
                        <ArrowRight className='ml-2 w-4 h-4' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Case Studies Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-16'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='font-bold text-slate-900 dark:text-white text-2xl'>
                More Case Studies
              </h2>
              <Badge variant='outline'>
                {otherCases.length} case stud
                {otherCases.length !== 1 ? 'ies' : 'y'}
              </Badge>
            </div>

            {otherCases.length > 0 ? (
              <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {otherCases.map((caseStudy, index) => (
                  <motion.article
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className='group bg-white/70 dark:bg-slate-800/70 hover:shadow-lg backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300'>
                    <div className='relative'>
                      <Image
                        src={
                          caseStudy.screenshots[0] ||
                          '/images/not_found_image.jpg'
                        }
                        alt={caseStudy.clientName}
                        width={400}
                        height={250}
                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='top-4 left-4 absolute'>
                        <Badge variant='secondary'>
                          {caseStudy.services[0]}
                        </Badge>
                      </div>
                    </div>

                    <div className='p-6'>
                      <h3 className='mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-lg transition-colors'>
                        <Link href={caseStudy.ctaUrl}>
                          {caseStudy.clientName}
                        </Link>
                      </h3>

                      <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm line-clamp-3'>
                        {caseStudy.problem}
                      </p>

                      <div className='flex flex-wrap items-center gap-3 mb-4 text-slate-500 dark:text-slate-400 text-xs'>
                        <div className='flex items-center gap-1'>
                          <Globe className='w-3 h-3' />
                          <span>{caseStudy.location}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3' />
                          <span>{caseStudy.timeline}</span>
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-1 mb-4'>
                        {caseStudy.services.slice(0, 2).map((service, idx) => (
                          <Badge
                            key={idx}
                            variant='outline'
                            className='text-xs'>
                            {service}
                          </Badge>
                        ))}
                        {caseStudy.services.length > 2 && (
                          <Badge variant='outline' className='text-xs'>
                            +{caseStudy.services.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className='flex justify-between items-center'>
                        <Button variant='outline' size='sm' asChild>
                          <Link href={caseStudy.ctaUrl}>
                            {caseStudy.ctaText}
                            <ArrowRight className='ml-1 w-3 h-3' />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-12 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-center'>
                <Briefcase className='mx-auto mb-4 w-12 h-12 text-slate-400' />
                <h3 className='mb-2 font-semibold text-slate-900 dark:text-white text-lg'>
                  No case studies found
                </h3>
                <p className='text-slate-600 dark:text-slate-300'>
                  Check back soon for more success stories
                </p>
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl text-center'>
            <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              Ready to Start Your Success Story?
            </h3>
            <p className='mb-6 text-slate-600 dark:text-slate-300'>
              Contact us today to discuss how we can deliver zero-compromise
              solutions for your business
            </p>
            <div className='flex sm:flex-row flex-col justify-center gap-4 mx-auto max-w-md'>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                Get Started
                <ArrowRight className='ml-2 w-4 h-4' />
              </Button>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default CaseStudiesList;
