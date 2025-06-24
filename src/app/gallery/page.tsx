import Link from 'next/link';

export default function Page() {
  let photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {photos.map((id) => (
        <div
          key={id}
          className="
            group
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
            p-6
            transition-all
            duration-200
            hover:shadow-md
            hover:border-gray-300
            cursor-pointer
          "
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Card #{id + 1}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm">
            Esta es una tarjeta de ejemplo al estilo Tailwindland. ¡Puedes
            personalizarla!
          </p>
          <Link
            className="card"
            href={`/gallery/photos/${id}`}
            passHref
            scroll={false}
          >
            {id}
          </Link>
        </div>
      ))}
    </section>
  );
}
