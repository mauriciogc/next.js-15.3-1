// sec/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { i18n, type Locale } from '@/i18n/i18n-config';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const locales = i18n.locales;
  const defaultLocale = i18n.defaultLocale as Locale;
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_FILE.test(pathname) ||
    locales.some((loc) => pathname.startsWith(`/${loc}`))
  ) {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  const acceptLang = req.headers.get('accept-language') || '';
  const preferred = acceptLang.split(',')[0].split('-')[0];

  const lang = cookieLocale || preferred;
  const locale = locales.includes(lang as Locale) ? lang : defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
