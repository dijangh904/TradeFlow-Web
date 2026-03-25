import { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export function middleware(request: NextRequest) {
  // You can add custom middleware logic here
  // For example, tracking user sessions, adding headers, etc.
  
  return Sentry.continueTrace({
    name: 'middleware',
    op: 'http.server',
  }, () => {
    // Continue with the request
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
