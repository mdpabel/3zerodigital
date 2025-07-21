import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ComponentWrapper from '@/components/common/component-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  Globe,
  Goal,
  Quote,
  Settings,
  PenTool,
  TrendingUp,
} from 'lucide-react';

interface CaseStudy {
  slug: string;
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
    slug: 'ecommerce-uk',
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
      'We performed a comprehensive malware scan and cleanup, migrated to an optimized WordPress setup, implemented custom caching mechanisms, and executed a full on-page SEO strategy including content optimization and technical fixes.',
    tools: ['WordPress', 'Cloudflare', 'RankMath', 'Next.js'],
    timeline: '3 weeks',
    results:
      'Site uptime reached 100%, page load speed improved by 300%, organic traffic surged by 150%, and sales increased by 80%. No security incidents since implementation.',
    testimonial:
      '3Zero Digital delivered beyond expectations. Our site is now secure and performing better than ever!',
    ctaText: 'Contact Us',
    ctaUrl: '/contact',
    screenshots: [
      '/images/placeholder-screenshot-1.jpg',
      '/images/placeholder-screenshot-1-2.jpg',
    ],
  },
  {
    slug: 'fintech-us',
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
    ctaText: 'Contact Us',
    ctaUrl: '/contact',
    screenshots: ['/images/placeholder-screenshot-2-1.jpg'],
  },
  {
    slug: 'healthcare-global',
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
    ctaText: 'Contact Us',
    ctaUrl: '/contact',
    screenshots: [
      '/images/placeholder-screenshot-3-1.jpg',
      '/images/placeholder-screenshot-3-2.jpg',
    ],
  },
  {
    slug: 'saas-eu',
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
    ctaText: 'Contact Us',
    ctaUrl: '/contact',
    screenshots: ['/images/placeholder-screenshot-4-1.jpg'],
  },
];

export async function generateStaticParams() {
  return dummyCaseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const caseStudy = dummyCaseStudies.find(
    async (cs) => cs.slug === (await params).slug,
  );

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | 3Zero Digital',
    };
  }

  const keywords = [
    ...caseStudy.services,
    ...caseStudy.tools,
    caseStudy.clientName,
    'case study',
    'success story',
  ].join(', ');

  return {
    title: `${caseStudy.clientName} Case Study | 3Zero Digital`,
    description: `Discover how 3Zero Digital helped ${caseStudy.clientName} achieve ${caseStudy.results.split('.')[0].toLowerCase()}.`,
    keywords,
    openGraph: {
      title: `${caseStudy.clientName} Case Study | 3Zero Digital`,
      description: `Discover how 3Zero Digital helped ${caseStudy.clientName} achieve ${caseStudy.results.split('.')[0].toLowerCase()}.`,
      url: `https://www.3zerodigital.com/case-studies/${caseStudy.slug}`,
      siteName: '3Zero Digital',
      images: [
        {
          url: caseStudy.screenshots[0] || '/images/case-studies-og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${caseStudy.clientName} Case Study`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.clientName} Case Study | 3Zero Digital`,
      description: `Discover how 3Zero Digital helped ${caseStudy.clientName} achieve ${caseStudy.results.split('.')[0].toLowerCase()}.`,
      images: [
        caseStudy.screenshots[0] || '/images/case-studies-twitter-image.jpg',
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://www.3zerodigital.com/case-studies/${caseStudy.slug}`,
    },
  };
}

const CaseStudyDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const caseStudy = dummyCaseStudies.find(
    async (cs) => cs.slug === (await params).slug,
  );

  if (!caseStudy) {
    notFound();
  }

  return (
    <section className='relative py-16 md:py-24 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Header */}
          <div className='mb-12 text-center'>
            <Badge className='bg-blue-100 dark:bg-blue-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <Briefcase className='mr-2 w-4 h-4' />
              Case Study
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                {caseStudy.clientName}
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              How we delivered zero-compromise solutions for{' '}
              {caseStudy.clientName}
            </p>
          </div>

          {/* Hero Image */}
          <div className='mb-12'>
            <Image
              src={caseStudy.screenshots[0] || '/images/not_found_image.jpg'}
              alt={`${caseStudy.clientName} featured screenshot`}
              width={1200}
              height={600}
              className='shadow-xl rounded-2xl w-full h-auto object-cover'
            />
          </div>

          {/* Overview */}
          <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mb-12 p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
            <div className='gap-8 grid grid-cols-1 md:grid-cols-3'>
              <div>
                <h2 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                  Location
                </h2>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Globe className='w-5 h-5' />
                  {caseStudy.location}
                </div>
              </div>
              <div>
                <h2 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                  Timeline
                </h2>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Clock className='w-5 h-5' />
                  {caseStudy.timeline}
                </div>
              </div>
              <div>
                <h2 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                  Services Provided
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {caseStudy.services.map((service, idx) => (
                    <Badge key={idx} variant='secondary'>
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Problem */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <Goal className='w-6 h-6 text-blue-600' />
              Problem / Goal
            </h2>
            <p className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'>
              {caseStudy.problem}
            </p>
          </div>

          {/* Solution */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <Settings className='w-6 h-6 text-blue-600' />
              Solution / What We Did
            </h2>
            <p className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'>
              {caseStudy.solution}
            </p>
          </div>

          {/* Tools */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <PenTool className='w-6 h-6 text-blue-600' />
              Tools & Tech Stack
            </h2>
            <div className='flex flex-wrap gap-2'>
              {caseStudy.tools.map((tool, idx) => (
                <Badge
                  key={idx}
                  variant='outline'
                  className='px-4 py-2 text-base'>
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <TrendingUp className='w-6 h-6 text-blue-600' />
              Results / Outcome
            </h2>
            <p className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'>
              {caseStudy.results}
            </p>
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className='bg-blue-50 dark:bg-blue-900/10 mb-12 p-8 rounded-2xl'>
              <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
                <Quote className='w-6 h-6 text-blue-600' />
                Client Testimonial
              </h2>
              <blockquote className='text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed'>
                {caseStudy.testimonial}
              </blockquote>
            </div>
          )}

          {/* Screenshots */}
          {caseStudy.screenshots.length > 0 && (
            <div className='mb-12'>
              <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
                Screenshots
              </h2>
              <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
                {caseStudy.screenshots.map((url, idx) => (
                  <Image
                    key={idx}
                    src={url}
                    alt={`Screenshot ${idx + 1} for ${caseStudy.clientName}`}
                    width={600}
                    height={400}
                    className='shadow-md rounded-2xl w-full h-auto object-cover'
                  />
                ))}
              </div>
            </div>
          )}

          {/* Enhanced CTA */}
          <div className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl text-center'>
            <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
              Ready to Achieve Similar Results?
            </h3>
            <p className='mb-6 text-slate-600 dark:text-slate-300 text-lg'>
              Discover how our zero-compromise solutions can transform your
              business. Get in touch to discuss your project or explore our
              services.
            </p>
            <div className='flex sm:flex-row flex-col justify-center gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 px-8 py-6 text-white'>
                <Link href={caseStudy.ctaUrl}>
                  {caseStudy.ctaText}
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='hover:bg-blue-50 dark:hover:bg-blue-950/20 px-8 py-6 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'>
                <Link href='/services'>
                  Explore Services
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default CaseStudyDetailsPage;
