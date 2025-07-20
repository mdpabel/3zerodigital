import React from 'react';
import BlogList from './blog-list';
import { wordpress } from '@/lib/wordpress';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const categories = await wordpress.getCategories();
  const tags = await wordpress.getTags();

  const keywords = [
    ...categories.map((cat) => cat.name),
    ...tags.map((tag) => tag.name),
  ].join(', ');

  return {
    title: 'Blog - Latest Insights & Tutorials | 3Zero Digital',
    description:
      'Stay updated with the latest trends, best practices, and expert insights in web development, SEO, and digital marketing from 3Zero Digital.',
    keywords: keywords,
    openGraph: {
      title: 'Blog - Latest Insights & Tutorials | 3Zero Digital',
      description:
        'Stay updated with the latest trends, best practices, and expert insights in web development, SEO, and digital marketing from 3Zero Digital.',
      url: 'https://www.3zerodigital.com/blog', // Update with actual domain
      siteName: '3Zero Digital',
      images: [
        {
          url: '/images/blog-og-image.jpg', // Update with actual OG image path
          width: 1200,
          height: 630,
          alt: '3Zero Digital Blog',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Latest Insights & Tutorials | 3Zero Digital',
      description:
        'Stay updated with the latest trends, best practices, and expert insights in web development, SEO, and digital marketing from 3Zero Digital.',
      images: ['/images/blog-twitter-image.jpg'], // Update with actual Twitter image path
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
      canonical: 'https://www.3zerodigital.com/blog', // Update with actual domain
    },
  };
}

export async function generateStaticParams() {
  const { posts } = await wordpress.getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPage = async () => {
  const postsRes = await wordpress.getPosts({
    perPage: 10,
  });
  const categories = await wordpress.getCategories();
  const tags = await wordpress.getTags();

  return (
    <BlogList
      categories={categories}
      initialPosts={postsRes.posts}
      tags={tags}
      total={postsRes.total}
    />
  );
};

export default BlogPage;
