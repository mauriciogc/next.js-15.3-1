//src/app/projects/[projectId]/page.tsx
import BookmarkCard from '@/components/bookmark-card';
import TaskCard from '@/components/task-card';

export default async function ProjectDashboardSkeleton({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const favourites = Array.from({ length: 3 }, (_, i) => crypto.randomUUID());
  const tasks = Array.from({ length: 8 }, (_, i) => crypto.randomUUID());

  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <p>
        These are the tasks of the project:{' '}
        <span className="text-(--color-highlight)">{projectId}</span>
      </p>
      <h2 className="subTitle">Favourites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {favourites.map((id) => (
          <BookmarkCard url={`/tasks/${id}`} key={id} />
        ))}
      </div>

      {/* Todos los proyectos */}
      <h2 className="subTitle">All task</h2>

      <div className="flex flex-col space-y-3">
        {tasks.map((id) => (
          <TaskCard key={id} url={`/tasks/${id}`} />
        ))}
      </div>
    </div>
  );
}
