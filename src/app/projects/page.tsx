// src/app/projects/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <h1 className="title">Projects</h1>
      <div className="w-full grid grid-cols-1 gap-6 p-6">
        <div className="bg-(--color-background) text-(--color-foreground) rounded-xl p-6 border border-(--color-border) flex flex-wrap justify-between items-center gap-3 transition-colors duration-300 ease-in-out">
          <div className="flex items-center gap-2 w-1/2">
            <div className="w-full h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
          </div>

          <Link
            href="/projects/abc123"
            className="pill-button pill-button-default pill-button-active p-2"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
