import { cache } from 'react';
import { WP_REST_API_Categories } from 'wp-types';

const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;

export const fetchCategories = cache(
  async (categoryIds: number[] = []): Promise<WP_REST_API_Categories> => {
    try {
      // Prepare the URL with optional category IDs
      const url = categoryIds.length
        ? `${API_URL}/wp-json/wp/v2/categories?include=${categoryIds.join(',')}`
        : `${API_URL}/wp-json/wp/v2/categories`;

      const response = await fetch(url, {
        cache: 'force-cache',
        next: {
          tags: ['categories', 'post'],
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const categories: WP_REST_API_Categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
);

// Caching category fetch
export const getCategoryBySlug = cache(
  async (slug: string): Promise<number | null> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;
      const response = await fetch(
        `${API_URL}/wp-json/wp/v2/categories?slug=${slug}`,
        {
          cache: 'force-cache',
          next: {
            tags: ['categories', 'post'],
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const categories: WP_REST_API_Categories = await response.json();
      if (categories.length === 0) {
        return null; // No category found
      }

      return categories[0].id; // Return the first match
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);
