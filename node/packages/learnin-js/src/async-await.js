/**
 * Promises are way better than callbacks, but still add a lot of complexity
 * over using synchronous code. Common patterns like `for (...) {}` loops don't
 * work with promises automatically and require special handling. We sometimes
 * have to check if something is a promise or not (eg can't call `.then` of String).
 * Error handling isn't ergonomic; we must handle synchronous errors with `try/catch`
 * and asynchronous errors with `promise.catch(...)`.
 *
 * It would be nice if there was a way to just automatically say:
 * ```js
 * function promiseFunction() {
 *   just wait for somePromiseFn() and then do everything past this in the function
 * }
 * ```
 *
 * Very often, that's what we want to do. That's why callback hell becomes an issue
 * so frequently, sequential asynchronus operations mean nesting functions
 * It's also one of the reasons that promises have chaining, so we can wait around for
 * something else to finish, and then do our stuff afterwords. None of this
 * is synchronous, but it allows for sequential asynchronous related pieces
 * of code to run in a way that's mostly seamless.
 *
 * Recall our previous magic synchronous function:
 */
function getRecipesWithIngredientsSync() {
  const result = [];
  const recipes = RecipeRepository.find();
  for (const recipe of recipes) {
    result.push({
      recipe: recipe,
      ingredients: IngredientRepository.find(recipe.ingredients),
    });
  }
  return result;
}

/**
 * So let's look at the `async`/`await` version.
 *
 * @reminder The `*Repository.find()` functions return promises.
 *
 * @note You must prepend the keyword `async` to your function declaration to use the `await` syntax
 * ```js
 * async () => {} // or
 * async function someFunction() {}
 * ```
 */
async function getRecipesWithIngredients() {
  const result = [];
  const recipes = await RecipeRepository.find();
  for (const recipe of recipes) {
    result.push({
      recipe: recipe,
      ingredients: await IngredientRepository.find(recipe.ingredients),
    });
  }
  return result;
}
/**
 * This is almost exactly the same as the synchronous version, but it works with
 * promise-based dependencies, and returns a promise.
 */

/**
 * By declaring this as an `async function. . .`, the return value is guaranted
 * to be a promise.
 */
async function getRecipesWithIngredientsAsync_inDetail() {
  const result = [];
  /**
   * `await` is a keyword that pauses an `async` function until
   * a promise resolves, and then it evaluates to the unwrapped
   * value resolved by the promise.
   */
  const recipes = await RecipeRepository.find();
  for (const recipe of recipes) {
    result.push({
      recipe: recipe,
      /**
       * `await` can be used anywhere a value is expected, but only a promise
       * is available. In this case, in each iteration of the loop, we pause
       * the function until we have the ingredients, at which time this object
       * definition finishes and is passed into `result.push`.
       */
      ingredients: await IngredientRepository.find(recipe.ingredients),
    });
  }
  /**
   * In an `async` function, a `return` statement resolves the underlying promise
   * with the value specified (or `undefined` like usual).
   */
  return result;
}

/**
 * Error handling is also much simpler with `async/await`. This is a modified
 * version of the above function that logs any errors and then rethrows them.
 */
async function getRecipesWithIngredientsAsync_withErrorLogging() {
  const result = [];
  /**
   * We can use the familiar `try`/`catch` syntax because there's no nesting
   * functions. This function is just capable of pausing, and sometimes when
   * it's done pausing, (when the promise rejects) an error is thrown in the
   * usual fashion.
   */
  try {
    const recipes = await RecipeRepository.find();
    for (const recipe of recipes) {
      result.push({
        recipe: recipe,
        ingredients: await IngredientRepository.find(recipe.ingredients),
      });
    }
  } catch (err) {
    /**
     * This catch block will be hit if:
     * - `RecipeRepository.find` rejects or throws
     * - `IngredientRepository.find` rejects or throws
     * - Any other type of synchronous error (like trying to access `foo` of undefined)
     */
    // just log the error
    console.error("Something's gone horribly awry while fetching data.");
    console.error(err);
    // forward the error on to the caller by rejecting the underlying promise
    // for this function
    throw err;
  }
  return result;
}

/**
 * We can also let the caller handle errors like usual. Any kind of error
 * thrown inside of an async function will reject the promise.
 */
function callGetRecipesWithPromise() {
  // this is the non-error-handling version, doesn't matter much though
  getRecipesWithIngredientsAsync().catch((err) => {
    /**
     * Any kind of error thrown in `getRecipesWithIngredeintsAsync` will end up here.
     */
  });
}

/**
 * Sophisticated (tm) `async/await` callers can continue using the `try`/`catch` syntax.
 */
async function callGetRecipesWithPromiseAsync() {
  try {
    await getRecipesWithPromsieAsync();
  } catch (err) {
    /**
     * Tada
     */
  }
}

/**
 * Remember all of this only applies if you actually `await` the promise
 */
async function callGetRecipesWithPromiseAsyncBusted() {
  try {
    getRecipesWithPromsieAsync();
  } catch (err) {
    /**
     * This will never happen. Errors thrown in the above call
     * will crash the server with an `UnhandledPromiseRejectionError`.
     */
  }
}

/**
 * Promises can be awaited after they're created, to allow for parallel waiting.
 */
async function parallelFetch(recipe1Id, recipe2Id) {
  const promises = [
    RecipeService.findById(recipe1Id),
    RecipeService.findById(recipe2Id),
  ];

  /**
   * Since we've already fired off both of the fetches, we can
   * await them in any order and it will finish when they're both
   * done.
   */
  const [recipe1, recipe2] = [await promises[0], await promises[1]];
  // same as
  const recipe1a = await promises[0];
  const recipe2a = await promises[1];
  // same as
  const [recipe1b, recipe2b] = await Promise.all(promises);
}
