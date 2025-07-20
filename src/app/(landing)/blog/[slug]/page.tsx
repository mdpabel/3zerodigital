import ComponentWrapper from '@/components/common/component-wrapper';
import BlogHeader from './blog-header';
import BlogContent from './blog-content';
import BlogSidebar from './blog-sidebar';
import { BlogBreadcrumb, BlogShare } from './blog-breadcrumb';
import { wordpress } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await wordpress.getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | 3Zero Digital',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${post.title} | 3Zero Digital Blog`;
  const description =
    post.excerpt.replace(/<[^>]*>/g, '').slice(0, 160) + '...';
  const url = `https://www.3zerodigital.com/blog/${post.slug}`; // Update with actual domain
  const image = post.featuredImage?.url || '/images/default-blog-og.jpg'; // Fallback image

  return {
    title,
    description,
    keywords: [
      ...post.categories.map((cat) => cat.name),
      ...post.tags.map((tag) => tag.name),
    ].join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: '3Zero Digital',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
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
      canonical: url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await wordpress.getPostBySlug(slug);

  const popularPosts = await wordpress.getPopularPosts();

  if (!post) {
    return notFound();
  }

  return (
    <div className='bg-gradient-to-br from-slate-50 dark:from-slate-950 via-white dark:via-slate-900 to-blue-50/30 dark:to-blue-950/30 min-h-screen'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl container'>
          {/* Breadcrumb */}
          {/* <BlogBreadcrumb category={blogPost.category} title={blogPost.title} /> */}

          {/* Blog Header */}
          <BlogHeader post={post} />

          <div className='gap-12 grid grid-cols-1 lg:grid-cols-4 mt-12'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              <BlogContent post={post} />
              <BlogShare post={post} />
              {/* <BlogComments post={post} /> */}
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <BlogSidebar />
            </div>
          </div>

          {/* Related Posts */}
          {/* <RelatedPosts posts={relatedPosts} />  */}
        </div>
      </ComponentWrapper>
    </div>
  );
}
