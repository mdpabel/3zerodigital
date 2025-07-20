// lib/wordpress-api.ts
// Enhanced types for enriched data
interface WordPressImage {
  id: number;
  url: string;
  alt: string;
  caption: string;
  title: string;
  sizes: {
    thumbnail?: string;
    medium?: string;
    large?: string;
    full: string;
  };
  width: number;
  height: number;
}

interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  description: string;
  url: string;
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface WordPressPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  status: string;
  link: string;
  featuredImage?: WordPressImage;
  author: WordPressAuthor;
  categories: WordPressCategory[];
  tags: WordPressTag[];
  commentStatus: string;
  format: string;
  sticky: boolean;
  acf: any; // ACF fields, typed as any for flexibility; can be refined based on specific fields
}

interface PostsQueryOptions {
  postType?: string;
  page?: number;
  perPage?: number;
  search?: string;
  author?: number;
  categories?: string[]; // slugs
  tags?: string[]; // slugs
  orderBy?: 'date' | 'title' | 'slug' | 'modified' | 'menu_order';
  order?: 'asc' | 'desc';
  status?: 'publish' | 'draft' | 'private';
  sticky?: boolean;
  excludeSticky?: boolean;
}

interface PostsResponse {
  posts: WordPressPost[];
  total: number;
  totalPages: number;
  hasMore: boolean;
}

class WordPressAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BLOG_API_URL!;
    if (!this.baseUrl) {
      throw new Error('NEXT_PUBLIC_BLOG_API_URL is not defined');
    }
  }

  // Process image
  private processImage(media: any): WordPressImage | undefined {
    if (!media || !media.source_url) return undefined;

    return {
      id: media.id,
      url: media.source_url,
      alt: media.alt_text || '',
      caption: media.caption?.rendered || '',
      title: media.title?.rendered || '',
      sizes: {
        thumbnail: media.media_details?.sizes?.thumbnail?.source_url,
        medium: media.media_details?.sizes?.medium?.source_url,
        large: media.media_details?.sizes?.large?.source_url,
        full: media.source_url,
      },
      width: media.media_details?.width || 0,
      height: media.media_details?.height || 0,
    };
  }

  // Process author
  private processAuthor(author: any): WordPressAuthor {
    return {
      id: author.id,
      name: author.name || '',
      slug: author.slug || '',
      avatar: author.avatar_urls?.['96'] || '',
      description: author.description || '',
      url: author.url || '',
    };
  }

  // Process category
  private processCategory(category: any): WordPressCategory {
    return {
      id: category.id,
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      count: category.count || 0,
    };
  }

  // Process tag
  private processTag(tag: any): WordPressTag {
    return {
      id: tag.id,
      name: tag.name || '',
      slug: tag.slug || '',
      description: tag.description || '',
      count: tag.count || 0,
    };
  }

  // Process post
  private processPost(post: any): WordPressPost {
    return {
      id: post.id,
      title: post.title?.rendered || '',
      content: post.content?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      slug: post.slug || '',
      date: post.date || '',
      modified: post.modified || '',
      status: post.status || 'publish',
      link: post.link || '',
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]
        ? this.processImage(post._embedded['wp:featuredmedia'][0])
        : undefined,
      author: post._embedded?.['author']?.[0]
        ? this.processAuthor(post._embedded['author'][0])
        : { id: 0, name: '', slug: '', avatar: '', description: '', url: '' },
      categories:
        post._embedded?.['wp:term']?.[0]?.map((cat: any) =>
          this.processCategory(cat),
        ) || [],
      tags:
        post._embedded?.['wp:term']?.[1]?.map((tag: any) =>
          this.processTag(tag),
        ) || [],
      commentStatus: post.comment_status || 'closed',
      format: post.format || 'standard',
      sticky: post.sticky || false,
      acf: post.acf || {}, // ACF fields
    };
  }

  // Get posts with all related data
  async getPosts(options: PostsQueryOptions = {}): Promise<PostsResponse> {
    try {
      const postType = options.postType || 'posts';
      const params = new URLSearchParams();

      // Add _embed to get related data in one request
      params.append('_embed', 'true');

      if (options.page) params.append('page', options.page.toString());
      if (options.perPage)
        params.append('per_page', options.perPage.toString());
      if (options.search) params.append('search', options.search);
      if (options.author) params.append('author', options.author.toString());
      if (options.orderBy) params.append('orderby', options.orderBy);
      if (options.order) params.append('order', options.order);
      if (options.status) params.append('status', options.status);

      // Handle categories by slug
      if (options.categories && options.categories.length > 0) {
        const categoryIds = await this.getCategoryIdsBySlug(options.categories);
        if (categoryIds.length > 0) {
          params.append('categories', categoryIds.join(','));
        }
      }

      // Handle tags by slug
      if (options.tags && options.tags.length > 0) {
        const tagIds = await this.getTagIdsBySlug(options.tags);
        if (tagIds.length > 0) {
          params.append('tags', tagIds.join(','));
        }
      }

      // Handle sticky posts
      if (options.sticky !== undefined) {
        params.append('sticky', options.sticky.toString());
      }

      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/${postType}?${params.toString()}`,
        {
          next: {
            tags: ['wordpress', postType],
            revalidate: 3600, // 1 hour
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${postType}: ${response.status}`);
      }

      const posts = await response.json();
      const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);
      const totalPages = parseInt(
        response.headers.get('X-WP-TotalPages') || '0',
        10,
      );
      const currentPage = options.page || 1;

      return {
        posts: posts.map((post: any) => this.processPost(post)),
        total,
        totalPages,
        hasMore: currentPage < totalPages,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { posts: [], total: 0, totalPages: 0, hasMore: false };
    }
  }

  // Get single post by slug
  async getPostBySlug(
    slug: string,
    postType: string = 'posts',
  ): Promise<WordPressPost | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/${postType}?slug=${slug}&_embed=true`,
        {
          next: {
            tags: ['wordpress', postType],
            revalidate: 3600,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`);
      }

      const posts = await response.json();
      return posts.length > 0 ? this.processPost(posts[0]) : null;
    } catch (error) {
      console.error(`Error fetching post by slug ${slug}:`, error);
      return null;
    }
  }

  // Get single post by ID
  async getPostById(
    id: number,
    postType: string = 'posts',
  ): Promise<WordPressPost | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/${postType}/${id}?_embed=true`,
        {
          next: {
            tags: ['wordpress', postType],
            revalidate: 3600,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch post: ${response.status}`);
      }

      const post = await response.json();
      return this.processPost(post);
    } catch (error) {
      console.error(`Error fetching post by ID ${id}:`, error);
      return null;
    }
  }

  // Get all categories
  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/categories?per_page=100`,
        {
          next: {
            tags: ['wordpress', 'categories'],
            revalidate: 3600,
          },
        },
      );

      if (!response.ok) return [];

      const categories = await response.json();
      return categories.map((category: any) => this.processCategory(category));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Get all tags
  async getTags(): Promise<WordPressTag[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/tags?per_page=100`,
        {
          next: {
            tags: ['wordpress', 'tags'],
            revalidate: 3600,
          },
        },
      );

      if (!response.ok) return [];

      const tags = await response.json();
      return tags.map((tag: any) => this.processTag(tag));
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  // Helper method to get category IDs by slugs
  async getCategoryIdsBySlug(slugs: string[]): Promise<number[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/categories?slug=${slugs.join(
          ',',
        )}&per_page=100`,
        {
          next: {
            tags: ['wordpress', 'categories'],
            revalidate: 3600,
          },
        },
      );

      if (!response.ok) return [];

      const categories = await response.json();
      return categories.map((cat: any) => cat.id);
    } catch (error) {
      console.error('Error fetching category IDs:', error);
      return [];
    }
  }

  // Helper method to get tag IDs by slugs
  async getTagIdsBySlug(slugs: string[]): Promise<number[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/tags?slug=${slugs.join(
          ',',
        )}&per_page=100`,
        {
          next: {
            tags: ['wordpress', 'tags'],
            revalidate: 3600,
          },
        },
      );

      if (!response.ok) return [];

      const tags = await response.json();
      return tags.map((tag: any) => tag.id);
    } catch (error) {
      console.error('Error fetching tag IDs:', error);
      return [];
    }
  }

  // Get related posts
  async getRelatedPosts(
    postId: number,
    limit: number = 5,
    postType: string = 'posts',
  ): Promise<WordPressPost[]> {
    try {
      const post = await this.getPostById(postId, postType);
      if (!post || post.categories.length === 0) return [];

      const categoryIds = post.categories.map((cat) => cat.id);
      const response = await fetch(
        `${
          this.baseUrl
        }/wp-json/wp/v2/${postType}?categories=${categoryIds.join(
          ',',
        )}&exclude=${postId}&per_page=${limit}&_embed=true`,
        {
          next: { tags: ['wordpress', postType] },
        },
      );

      if (!response.ok) return [];

      const posts = await response.json();
      return posts.map((post: any) => this.processPost(post));
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  }

  // Search posts
  async searchPosts(
    query: string,
    options: Omit<PostsQueryOptions, 'search'> = {},
  ): Promise<PostsResponse> {
    return this.getPosts({ ...options, search: query });
  }

  // Get posts by category
  async getPostsByCategory(
    categorySlug: string,
    options: Omit<PostsQueryOptions, 'categories'> = {},
  ): Promise<PostsResponse> {
    return this.getPosts({ ...options, categories: [categorySlug] });
  }

  // Get posts by tag
  async getPostsByTag(
    tagSlug: string,
    options: Omit<PostsQueryOptions, 'tags'> = {},
  ): Promise<PostsResponse> {
    return this.getPosts({ ...options, tags: [tagSlug] });
  }

  // Get posts by author
  async getPostsByAuthor(
    authorId: number,
    options: Omit<PostsQueryOptions, 'author'> = {},
  ): Promise<PostsResponse> {
    return this.getPosts({ ...options, author: authorId });
  }

  // Get recent posts
  async getRecentPosts(
    limit: number = 5,
    postType: string = 'posts',
  ): Promise<WordPressPost[]> {
    const { posts } = await this.getPosts({
      postType,
      perPage: limit,
      orderBy: 'date',
      order: 'desc',
    });
    return posts;
  }

  // Get popular posts (by comment count)
  async getPopularPosts(
    limit: number = 5,
    postType: string = 'posts',
  ): Promise<WordPressPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/${postType}?per_page=${limit}&orderby=comment_count&order=desc&_embed=true`,
        {
          next: { tags: ['wordpress', postType] },
        },
      );

      if (!response.ok) return [];

      const posts = await response.json();
      return posts.map((post: any) => this.processPost(post));
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      return [];
    }
  }
}

// Export singleton instance
export const wordpress = new WordPressAPI();

// Export types
export type {
  WordPressPost,
  WordPressImage,
  WordPressAuthor,
  WordPressCategory,
  WordPressTag,
  PostsQueryOptions,
  PostsResponse,
};
