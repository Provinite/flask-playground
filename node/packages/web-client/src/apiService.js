/**
 * Fetch all recipes from the API
 * @returns {Recipe[]} All recipes
 */
export async function getAllRecipes() {
  const result = await fetch("http://localhost:5000/recipes", {
    method: "GET",
  });
  return result.json();
}

/**
 * Create a new recipe
 * @returns {Recipe} The new recipe
 */
export async function createRecipe(recipe) {
  const result = await fetch("http://localhost:5000/recipes", {
    method: "POST",
    body: JSON.stringify(recipe),
  });
  return result.json();
}
