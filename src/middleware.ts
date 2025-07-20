import { betterFetch } from '@better-fetch/fetch';
import type { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
      },
    },
  );

  const url = request.nextUrl;

  // If the user is logged in, prevent access to login and registration pages
  if (session && ['/login', '/signup'].includes(url.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not logged in, prevent access to protected routes
  if (!session && ['/dashboard'].includes(url.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/login', '/signup'], // Apply middleware to specific routes
};
