'use client';

import Link from 'next/link';

const mockReels = [
  { id: '1', user: 'mauri_dev', desc: 'Mi reel en JS' },
  { id: '2', user: 'frontqueen', desc: 'CSS animation 🔥' },
];

export default function ReelsFeed() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {mockReels.map((reel) => (
        <div
          key={reel.id}
          className="h-screen snap-start flex flex-col justify-center items-center border-b border-gray-800"
        >
          <Link href={`/reel/${reel.id}`} className="text-xl font-bold">
            ▶ {reel.user}
          </Link>
          <p className="text-sm text-gray-300">{reel.desc}</p>
        </div>
      ))}
    </div>
  );
}
