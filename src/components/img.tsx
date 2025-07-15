// src/app/components/img.tsx
'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';

type ImageStatus = 'idle' | 'loaded' | 'error';
type ImgProps = { url: string };

function ImgComponent({ url }: ImgProps) {
  const [status, setStatus] = useState<ImageStatus>('idle');
  const onSuccess = useCallback(() => setStatus('loaded'), []);
  const onError = useCallback(() => setStatus('error'), []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-(--color-border) bg-(--color-muted) hover:shadow-lg transition-shadow">
      {status === 'error' && <div>placeholder</div>}
      <Image
        alt={url}
        src={url}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        onLoad={onSuccess}
        onError={onError}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-(--color-background)/50 text-(--color-foreground) text-sm font-medium px-3 py-2 backdrop-blur-sm">
        <span
          className={`font-semibold ${
            status === 'error'
              ? 'text-red-600'
              : status === 'loaded'
              ? 'text-green-600'
              : 'text-yellow-600'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export const Img = memo(ImgComponent);
