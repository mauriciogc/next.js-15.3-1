'use client';

import ReelCard from '@/components/reel-card';
import Stories from '@/components/stories';
import SuggestionsSidebar from '@/components/suggestions-sidebar';

export default function ReelsFeed() {
  const mockReels = Array.from({ length: 6 }, () => crypto.randomUUID());

  return (
    <>
      <div className="flex justify-center gap-8 px-4 py-6">
        {/* Feed principal */}
        <div className="flex flex-col items-center space-y-6  w-full">
          <Stories />
          {mockReels.map((i) => (
            <ReelCard key={i} url={`/p/${i}`} />
          ))}
        </div>

        {/* Sidebar derecho (oculto en mobile) */}
        <div className="hidden lg:block w-[300px] shrink-0">
          <SuggestionsSidebar />
        </div>
      </div>
    </>
  );
}
