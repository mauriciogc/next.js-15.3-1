//src/components/PhotoCard.tsx
import Link from 'next/link';

export default function PhotoCard({ id, url }: { id: string; url: string }) {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) rounded-2xl border border-(--color-border) overflow-hidden flex flex-col transition-colors duration-300 ease-in-out">
      <div className="w-full h-48 bg-(--color-muted) rounded-2xl" />

      <div className="p-4 space-y-3">
        <div className="h-4 w-full bg-(--color-border) rounded-full" />
        <div className="h-3 w-3/4 bg-(--color-muted) rounded-full" />
        <div className="h-3 w-2/3 bg-(--color-muted) rounded-full" />
      </div>

      <div className="border-t border-(--color-border)" />

      <div className="p-4 flex justify-between items-center">
        <Link
          className="pill-button pill-button-primary w-full flex items-center justify-center"
          href={url}
          scroll={false}
        >
          Ver detalle {id}
        </Link>
      </div>
    </div>
  );
}
