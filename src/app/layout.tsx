//src/app/layout.tsx

import Navbar from '@/components/Navbar';
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
          <Navbar />
          <main className="flex-grow bg-white text-gray-800">{children}</main>
        </div>
      </body>
    </html>
  );
}
