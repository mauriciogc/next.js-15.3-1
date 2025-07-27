// app/[lang]/page.tsx
import { getTranslator } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/i18n-config';

export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const t = await getTranslator(lang);

  return (
    <main>
      <div className="container py-20 space-y-10">
        <h1 className="title">{t('home.title')}</h1>
        <p>
          {t('home.description')}
          <span className="highlight"> {lang} </span>
        </p>
        <p className="highlight">{t('home.instructions')}</p>
      </div>
    </main>
  );
}
