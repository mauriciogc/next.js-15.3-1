// src/components/SkeletonList.tsx

interface SkeletonProps {
  repeat?: number;
}
export default function SkeletonList({ repeat = 1 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className="p-2 rounded animate-pulse space-y-2 min-h-50"
        >
          <div className="h-2/3 bg-gray-300 rounded w-full " />
          <div className="h-1/14 bg-gray-200 rounded w-3/4" />
          <div className="h-1/16 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}
