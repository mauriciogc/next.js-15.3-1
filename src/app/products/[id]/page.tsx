// app/photo/[id]/page.tsx
import { getPhoto } from '@/services/products';
import Image from 'next/image';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return {
    title: photo.title,
    description: photo.description,
    openGraph: {
      title: photo.title,
      description: photo.description,
      type: 'article',
      url: photo.image,
      images: [
        {
          url: photo.image,
          width: 600,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: photo.title,
      description: 'Check out this awesome product...',
      images: [photo.image],
    },
  };
}

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <div>
      <h1>{photo.title}</h1>
      <Image src={photo.image} width={200} height={100} alt={photo.title} />
    </div>
  );
}
