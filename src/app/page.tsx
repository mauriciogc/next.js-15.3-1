import Image from 'next/image';

export const revalidate = 60; // 1 minuto de caché

export default function Home() {
  const now = new Date().toISOString();
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Generada en: {now}</p>
      <Image
        src="7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg"
        alt="Avatar de usuario"
        width={400}
        height={225}
      />
    </main>
  );
}
