// src/app/projects/[projectId]/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <p>
        These are the tasks of the project:{' '}
        <span className="text-(--color-highlight)">{projectId}</span>
      </p>
      <h2 className="subTitle">All task</h2>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center bg-(--color-background) border border-(--color-border) rounded-lg p-4 transition-colors duration-300 ease-in-out">
          <div className="flex items-center gap-2 w-1/2">
            <div className="w-full h-4 rounded-full bg-(--color-border) border border-(--color-muted)" />
          </div>
          <Link
            href={`/projects/${projectId}/tasks/taskhyutt67`}
            scroll={false}
            className="pill-button pill-button-default pill-button-active p-2"
          >
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
