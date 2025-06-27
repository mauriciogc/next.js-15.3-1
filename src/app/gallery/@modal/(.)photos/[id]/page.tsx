// src/app/gallery/@modal/(.)photos/[id]/page.tsx
import Modal from '@/components/modal';
import DetailPhoto from '@/components/detail-photo';

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Modal>
      <DetailPhoto id={id} />
    </Modal>
  );
}
