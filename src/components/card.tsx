'use client';

import { useTranslation } from '@/context/translation-context';

export default function Card({ index }: { index: number }) {
  const { t } = useTranslation();
  return (
    <div className="card space-y-2">
      <div className="subtitle highlight">
        {String(index + 1).padStart(2, '0')}.
      </div>
      <h3 className="font-bold text-lg">
        {t(`about.card-${index + 1}.title`)}
      </h3>
      <p className="paragraph text-(--color-foreground)">
        {t(`about.card-${index + 1}.description`)}
      </p>
    </div>
  );
}
