import { cache } from 'react';
import {
  WP_REST_API_Post,
  WP_REST_API_Posts,
  WP_REST_API_Tags,
} from 'wp-types';
import { getCategoryBySlug } from './fetch-category';
import { fetchTags } from './fetch-tags';

interface GetPostsOptions {
  categories?: number[]; // IDs
  categorySlug?: string; // Slug for lookup
  tagSlug?: string; // Single tag slug
  search?: string;
  page?: number;
  perPage?: number;
  slug?: string; // Slug of a specific post
  authorId?: number;
}

export const getPosts = cache(
  async (
    options: GetPostsOptions = {},
  ): Promise<{
    posts: WP_REST_API_Posts | WP_REST_API_Post | null;
    total: number;
  }> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;
      const params = new URLSearchParams();

      // If the slug is provided, fetch the specific post
      if (options.slug) {
        params.append('slug', options.slug);
      } else {
        // Resolve category slug to ID
        if (options.categorySlug) {
          const categoryId = await getCategoryBySlug(options.categorySlug);
          if (categoryId) {
            params.append('categories', categoryId.toString());
          }
        }

        // Add categories if provided
        if (options.categories) {
          params.append('categories', options.categories.join(','));
        }

        // Resolve single tag slug to ID
        if (options.tagSlug) {
          const tags = await fetchTags();
          const tag = tags.find((t) => t.slug === options.tagSlug);
          if (tag) {
            params.append('tags', tag.id.toString());
          }
        }

        // Add search query
        if (options.search) {
          params.append('search', options.search);
        }

        // Add pagination
        if (options.page) {
          params.append('page', options.page.toString());
        }
        if (options.perPage) {
          params.append('per_page', options.perPage.toString());
        }

        // Add author filter
        if (options.authorId) {
          params.append('author', options.authorId.toString());
        }
      }

      // Fetch posts
      const response = await fetch(
        `${API_URL}/wp-json/wp/v2/posts?${params.toString()}`,
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

      const totalPosts = parseInt(
        response.headers.get('X-WP-Total') || '0',
        10,
      );
      const posts: WP_REST_API_Posts = await response.json();

      return {
        posts: options.slug ? posts[0] || null : posts,
        total: totalPosts,
      };
    } catch (error) {
      console.error(error);
      return {
        posts: options.slug ? null : [],
        total: 0,
      };
    }
  },
);

export const getPostsWithTagNames = cache(
  async (
    options: GetPostsOptions = {},
  ): Promise<{
    posts: WP_REST_API_Posts | WP_REST_API_Post | null;
    total: number;
  }> => {
    try {
      const { posts, total } = await getPosts(options);

      if (!posts || (Array.isArray(posts) && posts.length === 0)) {
        return { posts: Array.isArray(posts) ? posts : null, total };
      }

      const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;
      const tagsResponse = await fetch(`${API_URL}/wp-json/wp/v2/tags`, {
        cache: 'force-cache',
        next: {
          tags: ['posts', 'post'],
        },
      });

      if (!tagsResponse.ok) {
        throw new Error('Failed to fetch tags');
      }

      const tags: WP_REST_API_Tags = await tagsResponse.json();

      // Create a Map with tag id as key and { name, slug } as value
      const tagMap = new Map(
        tags.map((tag) => [tag.id, { name: tag.name, slug: tag.slug }]),
      );

      // Helper to enrich posts with valid tagDetails
      const enrichPostWithTags = (post: WP_REST_API_Post) => ({
        ...post,
        tagDetails: (post.tags || [])
          .map((tagId) => tagMap.get(tagId))
          .filter((tag) => tag !== undefined), // Filter out undefined tags
      });

      if (Array.isArray(posts)) {
        const enrichedPosts = posts.map(enrichPostWithTags);
        return { posts: enrichedPosts, total };
      } else {
        const enrichedPost = enrichPostWithTags(posts);
        return { posts: enrichedPost, total };
      }
    } catch (error) {
      console.error(error);
      return { posts: null, total: 0 };
    }
  },
);
