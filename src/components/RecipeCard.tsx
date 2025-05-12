//src/components/RecipeCard.tsx

'use client';

type Props = {
  recipe: { strMeal: string; strInstructions: string };
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="bg-orange-100 text-orange-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
      <p className="truncate">{recipe.strInstructions}</p>
    </div>
  );
}
