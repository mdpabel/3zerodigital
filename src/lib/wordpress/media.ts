import { cache } from 'react';
import { WP_REST_API_Attachment } from 'wp-types';

export const getMediaById = cache(async (id: number) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;
    const response = await fetch(`${API_URL}/wp-json/wp/v2/media/${id}`, {
      next: {
        tags: ['media', 'post'],
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
    }

    const media: WP_REST_API_Attachment = await response.json();
    return media;
  } catch (error) {
    console.error(`Error fetching media by ID ${id}:`, error);
    return null;
  }
});
