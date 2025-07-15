// src/app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | MyApp',
  description: 'Welcome to the site where we explain nextjs metadata',
};

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <h2 className="subTitle">Lorem ipsum dolor sit amet consectetur.</h2>
      <p>
        Maiores pariatur iste reprehenderit iure. Modi vero, rem animi aliquam,
        distinctio tempora autem quae recusandae beatae debitis blanditiis
        quasi, esse quia totam.
      </p>
      <p>
        Lorem ipsum dolor sit amet
        <span className="text-(--color-highlight)"> consectetur</span>,
        adipisicing elit.
      </p>
    </main>
  );
}
