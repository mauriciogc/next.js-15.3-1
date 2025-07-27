// src/components/locale-switcher.tsx
'use client';

import { TranslateIcon } from '@phosphor-icons/react/ssr';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { i18n, type Locale } from '@/i18n/i18n-config';
import { useTranslation } from '@/context/translation-context';
import { setUserLocale } from '@/app/lib/i18n-cookie';

export default function LocaleSwitcher() {
  const { t, lang } = useTranslation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="icon-button button-ghost"
      >
        <TranslateIcon />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 card z-50 p-2">
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              className={`w-full button button-ghost justify-start ${
                lang === locale && 'font-bold text-(--color-primary)'
              }`}
              onClick={async () => {
                await setUserLocale(locale);
                router.push(redirectedPathname(locale));
              }}
            >
              {t(`locale-switcher.${locale}`)} ({locale})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
