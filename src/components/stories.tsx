// src/components/stories.tsx

export default function Stories() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-4 py-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-3 w-16 shrink-0"
        >
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-500 to-purple-500 p-[2px]">
            <div className="w-full h-full bg-(--color-background) rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-(--color-muted) rounded-full" />
            </div>
          </div>

          <div className="w-full h-2 bg-(--color-muted) rounded-full" />
        </div>
      ))}
    </div>
  );
}
