import { Modal } from './modal';

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Modal>{id}---</Modal>;
}
