// src/app/[lang]/about/page.tsx
import Card from '@/components/card';
import { getTranslator } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/i18n-config';

export default async function AboutPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const t = await getTranslator(lang);

  return (
    <main>
      <div className="container py-20 space-y-10">
        <h1 className="title">{t('about.title')}</h1>
        <h2 className="subtitle">{t('about.description')}</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i} index={i} />
          ))}
        </section>
      </div>
    </main>
  );
}
