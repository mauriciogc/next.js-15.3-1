import DetailTask from '@/components/detail-task';
import Modal from '@/components/modal';

export default async function TaskModal({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return (
    <Modal>
      <DetailTask id={taskId} />
    </Modal>
  );
}
