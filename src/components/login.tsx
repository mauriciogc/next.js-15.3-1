//src/components/login.tsx
export default function Login() {
  return (
    <div className="w-full max-w-sm mx-auto p-6 space-y-6 border border-(--color-border) rounded-lg bg-(--color-background)">
      <div className="w-20 h-20 rounded-full bg-(--color-muted) mx-auto" />

      <div className="text-center space-y-2">
        <div className="w-3/4 h-4 bg-(--color-muted) rounded mx-auto" />
        <div className="w-1/2 h-3 bg-(--color-muted) rounded mx-auto" />
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <div className="w-28 h-3 bg-(--color-muted) rounded" />
          <div className="w-full h-10 bg-(--color-muted) rounded" />
        </div>

        <div className="space-y-1">
          <div className="w-24 h-3 bg-(--color-muted) rounded" />
          <div className="w-full h-10 bg-(--color-muted) rounded" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-(--color-muted) rounded" />
            <div className="w-24 h-3 bg-(--color-muted) rounded" />
          </div>
          <div className="w-20 h-3 bg-(--color-muted) rounded" />
        </div>

        <div className="w-full h-11 rounded-full bg-(--color-muted)" />
      </div>
    </div>
  );
}
