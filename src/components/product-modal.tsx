// src/components/product-modal.tsx
'use client';

import { X, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Product } from '@/services/productsService';

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('noscroll');
    return () => document.body.classList.remove('noscroll');
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50"
        aria-label="Cerrar"
      >
        <X size={28} />
      </button>

      <div className="bg-(--color-background) text-(--color-foreground) rounded-xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] space-y-4">
        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover p-1"
          />
        </div>

        <div className="flex items-center gap-2 justify-center text-sm text-(--color-muted)foreground]">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{product.rating.rate}</span>
          <span className="text-xs opacity-80">
            {product.rating.count} reviews
          </span>
        </div>

        <h2 className="text-xl font-semibold text-center text-(--color-primary)">
          {product.title}
        </h2>
        <p className="text-(--color-foreground) text-sm text-center">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-(--color-border)">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button className="px-4 py-2 bg-(--color-foreground) text-(--color-background) rounded-md font-semibold hover:opacity-90 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
