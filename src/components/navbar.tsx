// src/components/navbar.tsx
'use client';

import Link from 'next/link';
import LocaleSwitcher from './locale-switcher';
import { useTranslation } from '@/context/translation-context';

export default function Navbar() {
  const { t, lang } = useTranslation();
  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 min-w-md">
      <nav className="navbar">
        <Link href={`/${lang}`} className="button button-ghost px-4">
          {t('navbar.home')}
        </Link>
        <Link href={`/${lang}/about`} className="button button-ghost px-4">
          {t('navbar.about')}
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
