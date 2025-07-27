//src/app/layout.tsx
import '../globals.css';

import { TranslationProvider } from '@/context/translation-context';
import { i18n, type Locale } from '@/i18n/i18n-config';
import { getDictionary, getTranslator } from '@/i18n/get-dictionary';
import Navbar from '@/components/navbar';

import { DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslator(lang);
  const title = t('metadata.title');
  const description = t('metadata.description');

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: i18n.locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}`,
        }),
        {}
      ),
    },
    openGraph: {
      title,
      description,
      locale: lang,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={dmSans.className}>
      <body className="antialiased">
        <TranslationProvider dictionary={dictionary} lang={lang}>
          <Navbar />
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
