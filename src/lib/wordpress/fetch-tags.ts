import { cache } from 'react';
import { WP_REST_API_Tags } from 'wp-types';

const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;

export const fetchTags = cache(async (): Promise<WP_REST_API_Tags> => {
  try {
    const response = await fetch(`${API_URL}/wp-json/wp/v2/tags`, {
      cache: 'force-cache',
      next: {
        tags: ['tags', 'post'],
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    const tags: WP_REST_API_Tags = await response.json();
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
});
