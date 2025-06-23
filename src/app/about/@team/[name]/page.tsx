// src/app/about/@team/[name]/page.tsx
export default async function TeamPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return (
    <div className="w-full flex-1 border border-purple-600 rounded-md p-4 bg-purple-900/30">
      <div className="rounded-xl flex items-start space-y-2 space-x-2">
        <div className="w-1/2 h-36 bg-gray-700 rounded-xl" />
        <div className="w-full flex flex-col space-y-2 ">
          <div className="w-3/4 h-7 bg-gray-600 rounded" />
          <div className="w-1/2 h-4 bg-gray-500 rounded" />
          <div className="w-full h-3 bg-gray-400 rounded" />
          <div className="w-full h-3 bg-gray-400 rounded" />
          <div className="w-1/2 h-3 bg-gray-400 rounded" />
          <div className="text-xs">Param: {name}</div>
        </div>
      </div>
    </div>
  );
}
