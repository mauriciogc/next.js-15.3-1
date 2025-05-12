// src/components/Navbar.tsx
'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white px-6 py-4">
      <ul className="flex space-x-8 items-center">
        <li>
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
