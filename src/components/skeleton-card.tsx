// src/components/skeleton-card-tsx
export default function SkeletonCard() {
  return (
    <div className="border border-(--color-border) rounded-lg p-4 bg-(--color-muted) animate-pulse space-y-4">
      <div className="w-full h-48 bg-(--color-border) rounded" />
      <div className="h-4 w-3/4 bg-(--color-border) rounded" />
      <div className="h-3 w-1/2 bg-(--color-border) rounded" />
    </div>
  );
}
