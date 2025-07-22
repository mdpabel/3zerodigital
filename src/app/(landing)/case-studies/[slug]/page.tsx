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
import { wordpress } from '@/lib/wordpress';
import { cn } from '@/lib/utils';

function parseHtmlList(html: string): string[] {
  const items: string[] = [];
  let start = 0;
  while (true) {
    const liStart = html.indexOf('<li>', start);
    if (liStart === -1) break;
    const liEnd = html.indexOf('</li>', liStart);
    if (liEnd === -1) break;
    const contentStart = html.indexOf('>', liStart + 3) + 1;
    let text = html.substring(contentStart, liEnd).trim();
    text = text.replace(/<[^>]*>/g, '');
    items.push(text);
    start = liEnd + 5;
  }
  return items;
}

export async function generateStaticParams() {
  const { posts } = await wordpress.getPosts({ postType: 'case-study' });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await wordpress.getPostBySlug(slug, 'case-study');

  if (!post) {
    return {
      title: 'Case Study Not Found | 3Zero Digital',
    };
  }

  const keywords = [
    post.acf.services_provided,
    ...parseHtmlList(post.acf['tools_&_tech_stack']),
    post.acf.client_name__industry,
    'case study',
    'success story',
  ].join(', ');

  return {
    title: `${post.acf.client_name__industry} Case Study | 3Zero Digital`,
    description: `Discover how 3Zero Digital helped ${post.acf.client_name__industry} achieve outstanding results.`,
    keywords,
    openGraph: {
      title: `${post.acf.client_name__industry} Case Study | 3Zero Digital`,
      description: `Discover how 3Zero Digital helped ${post.acf.client_name__industry} achieve outstanding results.`,
      url: `https://www.3zerodigital.com/case-studies/${post.slug}`,
      siteName: '3Zero Digital',
      images: [
        {
          url:
            post.acf.screenshot[0]?.full_image_url ||
            '/images/case-studies-og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${post.acf.client_name__industry} Case Study`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.acf.client_name__industry} Case Study | 3Zero Digital`,
      description: `Discover how 3Zero Digital helped ${post.acf.client_name__industry} achieve outstanding results.`,
      images: [
        post.acf.screenshot[0]?.full_image_url ||
          '/images/case-studies-twitter-image.jpg',
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
      canonical: `https://www.3zerodigital.com/case-studies/${post.slug}`,
    },
  };
}

const CaseStudyDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await wordpress.getPostBySlug(slug, 'case-study');

  if (!post) {
    notFound();
  }

  const services =
    typeof post.acf.services_provided === 'string'
      ? [post.acf.services_provided]
      : post.acf.services_provided;
  const tools = post.acf['tools_&_tech_stack'];
  const screenshots = post.acf.screenshot.map((s: any) => s.full_image_url);

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
                {post.acf.client_name__industry}
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              How we delivered zero-compromise solutions for{' '}
              {post.acf.client_name__industry}
            </p>
          </div>

          {/* Hero Image */}
          <div className='mb-12'>
            <img
              src={screenshots[0] || '/images/not_found_image.jpg'}
              alt={`${post.acf.client_name__industry} featured screenshot`}
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
                  {post.acf.location}
                </div>
              </div>
              <div>
                <h2 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                  Timeline
                </h2>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Clock className='w-5 h-5' />
                  {post.acf.timeline}
                </div>
              </div>
              <div>
                <h2 className='mb-4 font-semibold text-slate-900 dark:text-white'>
                  Services Provided
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {services.map((service, idx) => (
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
            <div
              dangerouslySetInnerHTML={{ __html: post.acf.problem__goal }}
              className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'
            />
          </div>

          {/* Solution */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <Settings className='w-6 h-6 text-blue-600' />
              Solution / What We Did
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: post.acf.solution__what_we_did,
              }}
              className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'
            />
          </div>

          {/* Tools */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <PenTool className='w-6 h-6 text-blue-600' />
              Tools & Tech Stack
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: tools,
              }}
              className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'
            />
          </div>

          {/* Results */}
          <div className='mb-12'>
            <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              <TrendingUp className='w-6 h-6 text-blue-600' />
              Results / Outcome
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: post.acf.results__outcome }}
              className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed'
            />
          </div>

          {/* Testimonial */}
          {post.acf.client_testimonial && (
            <div className='bg-blue-50 dark:bg-blue-900/10 mb-12 p-8 rounded-2xl'>
              <h2 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
                <Quote className='w-6 h-6 text-blue-600' />
                Client Testimonial
              </h2>
              <blockquote
                dangerouslySetInnerHTML={{
                  __html: post.acf.client_testimonial,
                }}
                className='text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed'
              />
            </div>
          )}

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <div className='mb-12'>
              <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
                Screenshots
              </h2>
              <div
                className={cn(
                  'gap-4 grid grid-cols-1',
                  post.acf.screenshot?.length === 1 && 'hidden',
                  post.acf.screenshot?.length > 1
                    ? 'md:grid-cols-2 lg:grid-cols-3'
                    : 'md:grid-cols-1',
                )}>
                {screenshots.map((url: any, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    className='shadow-md rounded-lg w-full h-auto'
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
            <div
              dangerouslySetInnerHTML={{ __html: post.acf.call_to_action }}
              className='mb-6 text-slate-600 dark:text-slate-300 text-lg'
            />
            <div className='flex sm:flex-row flex-col justify-center gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 px-8 py-6 text-white'>
                <Link href='/contact'>
                  Contact Us
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
