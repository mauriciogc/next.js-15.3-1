// app/ssr/pokemon/[slug]/page.tsx
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

interface PokemonPageProps {
  params: Promise<{ slug: string }>;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

// Función para obtener los datos del Pokémon desde la API
async function fetchPokemon(slug: string): Promise<Pokemon> {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PokemonPageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;

  try {
    // Obtenemos los datos del Pokémon
    const pokemon = await fetchPokemon(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
