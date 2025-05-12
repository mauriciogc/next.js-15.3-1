// src/components/CardSkeleton.tsx

interface CardSkeletonProps {
  repeat?: number;
}
export default function CardSkeleton({ repeat = 1 }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className="bg-orange-50 p-4 rounded shadow animate-pulse space-y-2 mb-4"
        >
          <div className="h-6 bg-orange-200 rounded w-3/4" />
          <div className="h-4 bg-orange-100 rounded w-full" />
        </div>
      ))}
    </>
  );
}
