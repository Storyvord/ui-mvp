// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ['/', '/auth/sign-in', '/auth/sign-up'];

  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get('accessToken');

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
  return
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/project-details/:path*'],
};
