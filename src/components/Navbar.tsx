// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { NAVIGATION } from '@/constants/navigation';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white px-6 py-4">
      <ul className="flex space-x-8 items-center">
        {Object.entries(NAVIGATION).map(([key, { label, path, children }]) => (
          <li key={key} className={children ? 'relative group' : ''}>
            <Link href={path} className="hover:underline">
              {label}
            </Link>
            {children && (
              <ul className="absolute top-full left-0 mt-1 bg-white text-black shadow-md rounded-md py-2 w-48 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                {Object.entries(children).map(
                  ([key, { label, path: cpath }]) => (
                    <li key={key}>
                      <Link
                        href={`${path}${cpath}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
