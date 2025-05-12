// src/services/recipeService.ts

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
};

export async function fetchRecipes(
  category: string
): Promise<{ meals: Recipe[] }> {
  try {
    const url = `${BASE_URL}/search.php?s=${category}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchRecipes:', error);
    throw error;
  }
}
