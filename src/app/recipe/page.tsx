// src/aoo/recipe/page.tsx

import { Suspense } from 'react';

import CardSkeleton from '@/components/CardSkeleton';
import RecipeCard from '@/components/RecipeCard';
import { fetchRecipes } from '@/services/recipeService';

// Contenedor que invoca el servicio y regresa la lista de recetas
async function RecipeCardWithData({ type }: { type: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const recipe = await fetchRecipes(type);
  return recipe.meals.map((recipe) => (
    <RecipeCard key={recipe.idMeal} recipe={recipe} />
  ));
}

export default function RecipePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Recetas disponibles</h1>
      <Suspense fallback={<CardSkeleton repeat={3} />}>
        <h2 className="text-1xl font-bold">Recetas con carne</h2>
        <RecipeCardWithData type="beef" />
      </Suspense>
    </div>
  );
}
