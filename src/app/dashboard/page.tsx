// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-stone-100 p-6 flex">
      <aside className="w-20 flex flex-col gap-4 items-center py-6 bg-white rounded-2xl shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200 mt-auto mb-4" />
      </aside>

      <section className="flex-1 px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="w-40 h-6 rounded-md bg-gray-200" />
          <div className="w-32 h-6 rounded-full bg-gray-200" />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-200 shadow-sm" />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-56 rounded-xl bg-gray-200 shadow-sm" />
          <div className="h-56 rounded-xl bg-gray-200 shadow-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 rounded-xl bg-gray-200 shadow-sm" />
          <div className="h-40 rounded-xl bg-gray-200 shadow-sm" />
        </div>
      </section>
    </main>
  );
}
