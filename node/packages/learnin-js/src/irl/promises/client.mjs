/**
 * Real quick, an `.mjs` file is just a way to denote that a particular JS file uses
 * the new `import` and `export` module system, instead of the old `require()` based
 * version. You'll want to understand both, but for now, mjs enables some convenient
 * syntax for us.
 */
import { ingredientService, recipeService } from "./services.mjs";

function main() {
  recipeService
    .getAll()
    .then((recipes) => {
      console.log(recipes);
    })
    .catch((err) => {
      console.error(
        "Something went wrong. Retrying in 3 seconds. Original message:\n " +
          err.message
      );
      setTimeout(main, 3000);
    });
}

main();
