// src/app/csr/pokemon/[slug]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

// Definimos la interfaz para el objeto Pokemon
interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function PokemonPage() {
  // Obtenemos el slug de la URL
  const { slug } = useParams();
  // Definimos el estado para almacenar el Pokemon
  const [pokemon, setPokemon] = useState<Pokemon>();
  // Definimos el estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener el Pokemon de la API cuando el slug cambia
  // y almacenarlo en el estado
  useEffect(() => {
    if (slug) {
      setError(null);
      fetch(`${API_URL}/${slug}`)
        .then((res) => res.json())
        .then((data: Pokemon) => setPokemon(data))
        .catch(setError);
    }
  }, [slug]);

  if (error)
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
