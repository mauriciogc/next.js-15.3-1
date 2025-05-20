// src/app/blog/[id]/not-found.tsx

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 px-6">
        {/* Texto */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Uh ohhhh!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Sorry, the page could couldn’t be found
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-white transition"
          >
            BACK TO DASHBOARD
          </Link>
        </div>

        <div className="flex items-center justify-center w-44 h-44 rounded-ss-4xl shadow-lg  bg-amber-500 text-5xl text-white">
          404
        </div>
      </div>
    </div>
  );
}
