// src/app/pokemon/[slug]/page.tsx

interface PageParams {
  slug: string;
}

interface PokemonPageProps {
  params: Promise<PageParams>;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export async function generateStaticParams() {
  console.log('Generando static params...');
  return [{ slug: 'bulbasaur' }, { slug: 'ivysaur' }, { slug: 'venusaur' }];
}

async function fetchPokemon(slug: string): Promise<Pokemon> {
  console.log('Fetching Pokémon data...', slug);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos del Pokémon');
  }
  return res.json();
}

export default async function Page({ params }: PokemonPageProps) {
  const { slug } = await params;
  const pokemon = await fetchPokemon(slug);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
