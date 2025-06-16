// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Redirigir si el usuario no está logueado
  if (pathname.startsWith('/dashboard') && !request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Agregar un header a la respuesta de /about
  if (request.nextUrl.pathname === '/about') {
    response.headers.set('x-custom-analytics', 'about-visited');
  }

  // validar que la ruta dinámica de /blog no sea maliciosa
  if (pathname.startsWith('/blog')) {
    const forbiddenSlugs = ['admin', 'delete', 'root'];
    const match = pathname.match(/^\/blog\/([^\/]+)/);
    console.log(match);
    const slug = match?.[1];

    if (slug && forbiddenSlugs.includes(slug)) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/about', '/blog/:slug*'],
};
