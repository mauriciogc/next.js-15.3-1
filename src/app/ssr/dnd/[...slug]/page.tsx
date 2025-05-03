// app/ssr/dnd/[...slug]/page.tsx

const API_URL = 'https://www.dnd5eapi.co/api/monsters';
const IMG_URL = 'https://www.dnd5eapi.co';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

interface Monster {
  name: string;
  type: string;
  image: string;
}

// Función para obtener los datos del monstruo desde la API
async function fetchMonster(slug: string[] = []): Promise<Monster> {
  const [, monsterName] = slug;

  const res = await fetch(`${API_URL}/${monsterName}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;
  try {
    // Obtenemos los datos del monstruo
    const monster = await fetchMonster(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{monster.name}</h1>
        <img
          src={`${IMG_URL}${monster.image}`}
          alt={monster.name}
          className="w-48"
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
