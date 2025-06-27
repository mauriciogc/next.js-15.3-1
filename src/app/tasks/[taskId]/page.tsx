import DetailTask from '@/components/detail-task';

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return (
    <div>
      <h2 className="subTitle">Detail Task</h2>
      <DetailTask id={taskId} />
    </div>
  );
}
