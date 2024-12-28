// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/user/feeds', '/user/profile', '/user/settings'];

export function middleware(req: NextRequest) {
  // Retrieve authentication state from cookies (or session, if stored there)
  const isAuthenticated = req.cookies.get('auth_token');

  // Check if the user is trying to access a protected route without being authenticated
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !isAuthenticated) {
    // Redirect unauthenticated users to the landing page
    return NextResponse.redirect(new URL('  /landingPage', req.url));
  }

  // Continue to the requested page if authenticated
  return NextResponse.next();
}

// Specify the routes on which to apply the middleware
export const config = {
  matcher: ['/user/feeds', '/user/profile', '/settings','/'],
};
