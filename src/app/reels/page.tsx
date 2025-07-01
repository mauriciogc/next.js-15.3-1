// src/app/reels/page.tsx
import ReelCard from '@/components/reel-card';
import Stories from '@/components/stories';
import SuggestionsSidebar from '@/components/suggestions-sidebar';
const mockReels = [
  '00a41623-457e-4f9a-9031-679096ae3655',
  'd872c3fa-81d4-46fb-a100-ff4754530e12',
  '9297d606-1695-4d2f-96b9-92010d15a746',
  'd34c57b4-4486-47a9-93b4-f7e1e09c7707',
  '3cc52721-8d65-48a3-9734-48080d189807',
  'bf491444-db28-4cb6-8eda-720f133f9342',
];

export default function ReelsFeed() {
  return (
    <div className="flex justify-center gap-8 px-4 py-6">
      <div className="flex flex-col items-center space-y-6  w-full">
        <Stories />
        {mockReels.map((id) => (
          <ReelCard url={`/p/${id}`} key={id} />
        ))}
      </div>

      <div className="hidden lg:block w-[300px] shrink-0">
        <SuggestionsSidebar />
      </div>
    </div>
  );
}
