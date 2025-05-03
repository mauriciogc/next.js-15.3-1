// app/csr/dnd/[...slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = 'https://www.dnd5eapi.co/api/monsters';

// Interfaz para los datos del país
interface Monster {
  name: string;
  type: string;
  image: string;
}

export default function Page() {
  // Obtenemos el slug de la URL
  const { slug } = useParams<{ slug: string[] }>();
  // Definimos el estado para almacenar el monstruo
  const [monster, setMonster] = useState<Monster | null>(null);
  // Definimos el estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener el monstruo de la API cuando el slug cambia
  // y almacenarlo en el estado
  useEffect(() => {
    // Si no hay slug, no hacemos nada
    if (slug && slug.length > 1) {
      const [, monsterName] = slug;
      fetch(`${API_URL}/${monsterName}`)
        .then((res) => res.json())
        .then((data: Monster) => setMonster(data))
        .catch(setError);
    } else {
      setError('No se ha encontrado el monstruo');
    }
  }, [slug]);

  if (error)
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;

  if (!monster) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{monster.name}</h1>
      <img
        src={`https://www.dnd5eapi.co${monster.image}`}
        alt={monster.name}
        className="w-48"
      />
    </div>
  );
}
