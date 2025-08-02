import { wordpress } from '@/lib/wordpress';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const type = searchParams.get('type');

  if (!query) {
    return NextResponse.json({ posts: [], total: 0 });
  }

  try {
    let postType: string | undefined = undefined; // Default for blogs (no postType)

    switch (type) {
      case 'case-study':
        postType = 'case-study';
        break;
      case 'blog':
        postType = undefined; // No postType for blogs
        break;
      default:
        postType = 'post'; // Default to 'post' for other types
        break;
    }

    // Build the options object dynamically
    const options: any = {
      status: 'publish',
      search: query,
      perPage: 5,
    };

    if (postType) {
      options.postType = postType; // Only include postType if it's defined
    }

    const { posts, total } = await wordpress.getPosts(options);

    return NextResponse.json({ posts, total });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ posts: [], total: 0 }, { status: 500 });
  }
}
