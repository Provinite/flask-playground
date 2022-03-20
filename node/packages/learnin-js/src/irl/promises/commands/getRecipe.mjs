import { ingredientService, recipeService } from "../services.mjs";
/**
 * Get a recipe and its related ingredients
 * @param { string } param The stringified ID of the recipe to fetch
 * @returns
 */
export function getRecipe(param) {
  if (!param) {
    throw new Error("Missing recipe ID");
  }
  const id = parseInt(param, 10);
  if (Number.isNaN(id)) {
    throw new Error("Invalid recipe ID");
  }
  return recipeService.getById(id).then((recipe) => {
    const ingredientPromises = [];
    if (!recipe.items) {
      return { recipe: recipe };
    }
    for (const ingredient of recipe.items) {
      const ingredientId = ingredient.ingredientId;
      ingredientPromises.push(ingredientService.getById(ingredientId));
    }

    /**
     * Promise.all is a way of combining an array of promises
     * into one promise that returns an array when all of the
     * underlying promises resolve. Note that we're not waiting
     * for each to come back before starting the next one,
     * just sending them all off and waiting for them all to come back.
     */
    return Promise.all(ingredientPromises).then((ingredients) => {
      return {
        recipe: recipe,
        ingredients: ingredients,
      };
    });
  });
}
