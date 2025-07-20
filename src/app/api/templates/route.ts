// app/api/templates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  // Validate parameters
  if (page < 1 || limit < 1 || limit > 50) {
    return NextResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 },
    );
  }

  const skip = (page - 1) * limit;

  try {
    // Build where clause
    const where = {
      deleted: false,
      ...(category && {
        categories: {
          some: {
            category: {
              name: {
                equals: category,
                mode: 'insensitive' as const,
              },
            },
          },
        },
      }),
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    // Fetch templates and total count in parallel
    const [templates, totalCount] = await Promise.all([
      prisma.template.findMany({
        where,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.template.count({ where }),
    ]);

    const hasMore = skip + limit < totalCount;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      templates,
      pagination: {
        currentPage: page,
        totalPages,
        hasMore,
        totalCount,
        limit,
      },
      // For backwards compatibility with your existing code
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch templates',
        templates: [],
        hasMore: false,
      },
      { status: 500 },
    );
  }
}
