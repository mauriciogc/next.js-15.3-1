// app/ssg/dnd/[...slug]/page.tsx

// Solo acepta los pre-renderizados
// de las rutas que se generan estáticamente
export const dynamicParams = false;

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

interface MonsterAPIResponse {
  results: { url: string }[];
}

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos de los monstruos.');
  }

  const data: MonsterAPIResponse = await res.json();

  // Limitar a 20 monstruos para la generación de rutas estáticas
  return data.results.slice(0, 20).map((monster) => {
    // Obtener el nombre del monstruo de la URL
    const urlParam = monster.url.split('/').at(-1);

    return { slug: ['monster', urlParam] };
  });
}

// Función para obtener los datos del monstruo desde la API
async function fetchMonster(slug: string): Promise<Monster> {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;
  try {
    const [, monsterName] = slug;
    // Obtenemos los datos del monstruo
    const monster = await fetchMonster(monsterName);

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
