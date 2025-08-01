import RSS from 'rss';
import { NextResponse } from 'next/server';
import { wordpress } from '@/lib/wordpress';
import he from 'he'; // Import he for decoding

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = 'https://www.3zerodigital.com';

  // Set perPage to the maximum allowed to minimize the number of requests
  const perPage = 100;

  // Fetch the first page to get totalPages
  const initial = await wordpress.getPosts({
    status: 'publish',
    page: 1,
    perPage,
  });

  let allPosts = initial.posts;

  const totalPages = initial.totalPages;

  // If there are more pages, fetch them in parallel
  if (totalPages > 1) {
    const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    const promises = pageNumbers.map((page) =>
      wordpress.getPosts({
        status: 'publish',
        page,
        perPage,
      }),
    );
    const results = await Promise.all(promises);
    results.forEach((res) => {
      allPosts = allPosts.concat(res.posts);
    });
  }

  const total = allPosts.length;
  console.log(`Total published posts: ${total}`);

  if (!allPosts || allPosts.length === 0) {
    return new Response('No posts found', { status: 404 });
  }

  // Create RSS feed for blog
  const feed = new RSS({
    title: '3 Zero Digital Blog Posts',
    description:
      'General blog posts on WordPress issues, performance, and more.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss/blog.xml`,
    language: 'en-US',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, 3 Zero Digital`,
  });

  // Add each blog post to the feed
  allPosts.forEach((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    feed.item({
      title: he.decode(post.title),
      url: postUrl,
      guid: postUrl,
      description: post.excerpt,
      // custom_elements: [{ 'content:encoded': post.content }],
      date: post.date,
      author: post.author?.name || 'MD Pabel Team',
      categories: post.categories?.map((cat) => cat.name) || [],
      enclosure: post.featuredImage?.url
        ? { url: post.featuredImage.url }
        : undefined,
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
