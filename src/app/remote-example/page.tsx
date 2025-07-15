// /src/app/remote-example/page.tsx
import Image from 'next/image';

export default function RemoteExamplePage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Superman (2025)</h2>
      <Image
        src={'https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg'}
        alt="Superman"
        width={200}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
