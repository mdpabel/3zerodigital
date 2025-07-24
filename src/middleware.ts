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
  const pathname = url.pathname;

  // If the user is logged in, prevent access to login and registration pages
  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not logged in, prevent access to protected routes (including sub-pages)
  if (
    !session &&
    (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/admin/:path*'], // Apply middleware to specific routes and their sub-pages
};
