// src/app/posts/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';

export default function PostPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Post ID: {params.id}</h1>
    </div>
  );
}
