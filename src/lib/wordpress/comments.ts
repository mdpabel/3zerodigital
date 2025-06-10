import { WP_REST_API_Comments } from 'wp-types';

export const fetchComments = async (postId: number) => {
  const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!;
  try {
    const response = await fetch(
      `${API_URL}/wp-json/wp/v2/comments?post=${postId}`,
      {
        cache: 'force-cache',
        next: {
          tags: ['comments', 'post'],
        },
      },
    );
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return (await response.json()) as WP_REST_API_Comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
