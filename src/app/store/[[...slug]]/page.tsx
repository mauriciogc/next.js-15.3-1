// src/app/store/[[...slug]]/page.tsx

interface PageParams {
  slug?: string[];
}

// La propiedad params es asincrónica, por lo que se debe tratar como promesa
interface StorePageProps {
  params: Promise<PageParams>;
}

export default async function StorePage({ params }: StorePageProps) {
  // Desestructuramos el `slug` de params, ya que es una promesa
  const { slug } = await params;

  // Validamos si `slug` está definido, de lo contrario mostramos un mensaje predeterminado
  const fullPath = slug ? slug.join('/') : 'Inicio';

  if (!slug) {
    return (
      <p className="text-lg">Estás en la página principal de la tienda.</p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tienda: {fullPath}</h1>
      <p className="text-lg">Ruta completa: /store/{fullPath}</p>
    </div>
  );
}
