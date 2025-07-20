// app/api/posts/route.ts
import { PostsQueryOptions, wordpress } from '@/lib/wordpress';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const per_page = parseInt(searchParams.get('per_page') || '12');
  const categoryName = searchParams.get('category') || '';
  const tagName = searchParams.get('tag') || '';
  const search = searchParams.get('search') || '';

  if (page < 1 || per_page < 1 || per_page > 100) {
    return NextResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 },
    );
  }

  try {
    const options: PostsQueryOptions = {
      page,
      perPage: per_page,
      search,
    };

    if (categoryName && categoryName !== 'All') {
      const allCategories = await wordpress.getCategories();
      const cat = allCategories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase(),
      );
      if (cat) {
        options.categories = [cat.slug];
      } else {
        // Optional: handle no category found
      }
    }

    if (tagName) {
      const allTags = await wordpress.getTags();
      const tag = allTags.find(
        (t) => t.name.toLowerCase() === tagName.toLowerCase(),
      );
      if (tag) {
        options.tags = [tag.slug];
      } else {
        // Optional: handle no tag found
      }
    }

    const response = await wordpress.getPosts(options);

    // Map to match the expected structure (excluding content, etc.)
    const mappedPosts = response.posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      featuredImage: post.featuredImage
        ? { url: post.featuredImage.url }
        : null,
      author: { name: post.author.name },
      categories: post.categories.map((c) => ({ id: c.id, name: c.name })),
      tags: post.tags.map((t) => ({ id: t.id, name: t.name })),
    }));

    return NextResponse.json({
      posts: mappedPosts,
      hasMore: response.hasMore,
      total: response.total,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch posts',
        posts: [],
        hasMore: false,
        total: 0,
      },
      { status: 500 },
    );
  }
}
