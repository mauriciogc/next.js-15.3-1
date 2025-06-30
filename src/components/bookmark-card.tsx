//src/components/bookmark-card.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookmarkCard({ url }: { url: string }) {
  return (
    <div className="bg-(--color-background) border border-(--color-border) rounded-xl p-4 flex flex-col gap-4 transition-colors duration-300 ease-in-out">
      <div className="h-4 w-3/4 bg-(--color-border) rounded" />
      <div className="h-3 w-1/2 bg-(--color-border) rounded" />

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-(--color-border)" />
        <div className="h-3 w-24 bg-(--color-border) rounded" />
      </div>

      <div className="w-full h-2 bg-(--color-border) rounded-full" />

      <div className="relative flex gap-2 mt-2 justify-end">
        <div className="w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) text-xs text-center text-(--color-foreground) flex items-center justify-center">
          +2
        </div>
        <Link
          href={url}
          scroll={false}
          className="pill-button pill-button-default pill-button-active p-2"
        >
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
