import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // use next.js middleware to intercept requests
}

export const config = {
  matcher: []
};
