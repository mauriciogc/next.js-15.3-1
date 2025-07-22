// src/components/product-card.tsx
'use client';
import Image from 'next/image';

type ProductCardPops = {
  onClick: () => void;
  title: string;
  image: string;
  price: number;
};

export default function ProductCard({
  onClick,
  title,
  image,
  price,
}: ProductCardPops) {
  return (
    <div
      className="border border-(--color-border) rounded-lg p-4 shadow-sm bg-(--color-background) text-(--color-foreground) space-y-3"
      onClick={onClick}
    >
      <div className="relative w-full h-48 bg-(--color-muted) rounded">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="font-semibold text-base">{title}</div>
      <div className="text-sm text-(--color-foreground)">${price}</div>
    </div>
  );
}
