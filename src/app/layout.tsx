//src/app/layout.tsx

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          <main className="flex-grow  bg-white text-gray-800">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
