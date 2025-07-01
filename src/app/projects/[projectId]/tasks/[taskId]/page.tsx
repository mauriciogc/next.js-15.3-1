// src/app/projects/[projectId]/task/[taskId]/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function TaksPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <p>
        This is the task detail
        <span className="text-(--color-highlight)"> {taskId} </span> of the
        project <span className="text-(--color-highlight)"> {projectId} </span>.
      </p>
      <Link
        href="/login"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Login <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
