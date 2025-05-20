import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 px-6">
        {/* Texto */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            WHOOPS!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            We couldn’t find the page you are looking for
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            GO BACK
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="flex items-center justify-center w-44 h-44 rounded-full shadow-lg  bg-red-500 text-5xl text-white">
          404
        </div>
      </div>
    </div>
  );
}
