import { ingredientService, recipeService } from "../services.mjs";
export function createSampleData() {
  const ingredients = [];
  const recipes = [];

  const createAndSaveRecipe = (body) =>
    recipeService.create(body).then((model) => {
      recipes.push(model);
    });

  const createAndSaveIngredient = (body) =>
    ingredientService.create(body).then((model) => {
      ingredients.push(model);
    });
  return Promise.resolve()
    .then(() =>
      createAndSaveIngredient({
        name: "Luck",
        cost: 1,
      })
    )
    .then(() =>
      createAndSaveIngredient({
        name: "Power",
        cost: 100,
      })
    )
    .then(() =>
      createAndSaveRecipe({
        name: "Victory",
        items: [
          {
            ingredientId: ingredients[0].id,
            quantity: 10,
          },
          {
            ingredientId: ingredients[1].id,
            quantity: 30,
          },
        ],
      })
    )
    .then(() => {
      return {
        recipes: recipes,
        ingredients: ingredients,
      };
    });
}
