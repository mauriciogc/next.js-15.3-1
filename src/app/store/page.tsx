// src/app/store/page.tsx
'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import SkeletonCard from '@/components/skeleton-card';
import { Product, fetchProducts } from '@/services/productsService';
import dynamic from 'next/dynamic';
import SkeletonModal from '@/components/skeleton-modal';

const LazyProductCard = lazy(() => import('@/components/product-card'));

const DynamicProductModal = dynamic(
  () => import('@/components/product-modal'),
  {
    ssr: false,
    loading: () => <SkeletonModal />,
  }
);

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(({ results }) => setProducts(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((p) => (
              <Suspense fallback={<SkeletonCard />} key={p.id}>
                <LazyProductCard
                  onClick={() => setSelected(p)}
                  title={p.title}
                  image={p.image}
                  price={p.price}
                />
              </Suspense>
            ))}
      </section>
      {selected && (
        <DynamicProductModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
