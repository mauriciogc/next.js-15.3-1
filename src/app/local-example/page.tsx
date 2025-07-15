// /src/app/local-example/page.tsx
import Image from 'next/image';

export default function LocalExamplePage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        The Fantastic Four: First Steps (2025)
      </h2>
      <Image
        src={'/movies/theFantastic4.png'}
        alt="The Fantastic Four"
        width={200}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
