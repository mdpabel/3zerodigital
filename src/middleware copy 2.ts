import { NextResponse } from 'next/server';
import { auth } from './auth';

const authRoutes = ['/login', '/register'];
const adminRoutes = /^\/admin(\/.*)?$/; // Matches /admin and any sub-paths like /admin/product
const dashboardRoutes = /^\/me(\/.*)?$/; // Matches /dashboard and any sub-paths like /dashboard/order
const DEFAULT_LOGIN_REDIRECT = '/';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role ?? 'CUSTOMER';

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.test(nextUrl.pathname); // Test the path against the admin regex
  const isDashboardRoute = dashboardRoutes.test(nextUrl.pathname); // Test the path against the dashboard regex

  // if (isDashboardRoute && isLoggedIn && role === 'ADMIN') {
  //   return NextResponse.redirect(new URL('/admin', nextUrl));
  // }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  if (!isLoggedIn && (isAdminRoute || isDashboardRoute)) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL(`/dashboard`, nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
