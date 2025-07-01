// src/app/reels/@modal/(..)p/[reelId]/page.tsx
import Modal from '@/components/modal';
import ReelDetail from '@/components/reel-detail';

export default async function ReelModal({
  params,
}: {
  params: Promise<{ reelId: string }>;
}) {
  const { reelId } = await params;
  return (
    <Modal>
      <ReelDetail id={reelId} />
    </Modal>
  );
}
