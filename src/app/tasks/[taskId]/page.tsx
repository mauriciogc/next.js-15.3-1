// src/app/tasks/[taskId]/page.tsx
import DetailTask from '@/components/detail-task';

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return (
    <div className="mb-16">
      <h2 className="subTitle">Detail Task</h2>
      <DetailTask id={taskId} />
    </div>
  );
}
