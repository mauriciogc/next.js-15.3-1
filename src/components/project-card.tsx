//src/components/project-card.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ url }: { id: string; url: string }) {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) rounded-xl p-6 border border-(--color-border) flex flex-wrap justify-between items-center gap-3 transition-colors duration-300 ease-in-out">
      <div className="flex flex-col gap-3">
        <div className="h-6 w-30  bg-(--color-border) rounded-md" />
        <div className="h-4 w-3/4 bg-(--color-border) rounded" />
        <div className="h-3 w-1/2 bg-(--color-border) rounded-full" />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted) text-xs text-center text-(--color-foreground) flex items-center justify-center">
          +2
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-center gap-2">
        <div className="w-20 h-12 bg-(--color-border) rounded" />
        <div className="h-3 w-16 bg-(--color-border) rounded" />
      </div>

      <div className="hidden md:flex flex-col items-start gap-2">
        <div className="h-3 w-16 bg-(--color-border) rounded" />
        <div className="h-4 w-20 bg-(--color-border) rounded" />
        <div className="flex items-center gap-1">
          <div className="w-6 h-1 rounded-full bg-(--color-border)" />
          <div className="w-6 h-1 rounded-full bg-(--color-border)" />
          <div className="w-6 h-1 rounded-full bg-(--color-border)" />
        </div>
      </div>
      <Link
        href={url}
        className="pill-button pill-button-default pill-button-active p-2"
      >
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
