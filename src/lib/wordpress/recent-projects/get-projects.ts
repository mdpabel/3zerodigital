import { WP_REST_API_Posts } from 'wp-types';

export async function fetchRecentProjects() {
  const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL! + '/graphql';

  const response = await fetch(
    `https://blog.3zerodigital.com/wp-json/wp/v2/recent-posts/`,
    {
      cache: 'force-cache',
      next: {
        tags: ['posts', 'post'],
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const projects: WP_REST_API_Posts = await response.json();

  return projects;
}
