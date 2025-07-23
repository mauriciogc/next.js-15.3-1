// app/[lang]/page.tsx
import { getDictionary } from '../i18n/get-dictionary';
import { Locale } from '../i18n/i18n-config';

export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);

  return (
    <main>
      <div className="container py-20 space-y-10">
        <h1 className="title">{t('title')}</h1>
        <p>Current locale: {lang}</p>
        <p>
          This text is rendered on the server: {t('server-component.welcome')}
        </p>
      </div>
    </main>
  );
}
