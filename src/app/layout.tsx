//src/app/layout.tsx

import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <nav className="bg-gray-700 text-white p-4">
            <ul className="flex space-x-4">
              <li>Dashboard</li>
              <li>Movies</li>
              <li>TV Shows</li>
            </ul>
          </nav>
          <main className="flex-grow p-4 bg-white text-gray-800">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            &copy; 2025
          </footer>
        </div>
      </body>
    </html>
  );
}
