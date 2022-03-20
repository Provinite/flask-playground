/**
 * Promises! A promise is an object with a `then` function on it.
 * An object can be said to be a promise if it
 * fulfills the following "duck-typing" function.
 *
 * Side note: "Duck-Typing" is
 * a practice of looking at an object, and deciding at run-time what
 * type it is based on its properties. Eg if it walks like a duck,
 * quacks like a duck, we can use it as a duck even if its called a Goose.
 */
function isPromise(obj) {
  return typeof obj === "object" && typeof obj.then === "function";
}

/**
 * Okay, how does this help? What is this `then` function for, and how
 * does this help us avoid callback hell?
 *
 * A promise represents access to a "promise"d future value
 * that is not available synchronously.
 *
 * Some facts about promises:
 * - Promises can be in one of three states:
 *  - pending, fulfilled, or rejected
 *
 * The `then` method:
 * - This method provides access to the future value
 * - It accepts two arguments, both function
 * `promise.then(onFulfilled, onRejected)`
 * - both arguments are optional
 * - onFulfilled is called when the promise is fulfilled.
 *  - it is called with the resolved value
 * - onRejected is called when the promise is rejected
 *  - it is called with the rejection reason (error)
 * - You can call `then` as many times as you want, each
 *  registered `onFulfilled` or `onRejected` function will
 *  be run as/when appropriate.
 * - The return value of `then` is a new promise.
 *  - The returned promise resolves when the `onFulfilled`
 *      function resolves.
 *
 *
 * That's a lot, let's look at some examples.
 */

function fig1() {
  function addPromise(a, b) {
    /**
     * To return a simple value from a promise, we can use the `Promise.resolve()` helper.
     * `Promise.resolve()` returns a new promise that will immediately resolve with the provided
     * value.
     *
     * @note The promise may resolve immediately, but promises are always asynchronous. Any `onFulfilled`
     * or `onRejected` handlers will be placed on the event loop, not fired synchronously.
     */
    return Promise.resolve(a + b);
  }

  const onFulfilled = (sum) => {
    console.log(`The result of 1 + 2 is ${sum}`);
  };

  const onError = (err) => console.error(err);

  addPromise(1, 2).then(onFulfilled, onError);
}

/**
 * We can construct more complex promises using the `new Promise(promiseFunction)` constructor.
 *
 * The promise constructor takes in a function. This function will receive two arguments, `resolve` and `reject`.
 * These functions can be invoked to resolve or reject the promise with a value/error.
 *
 * @note The secret is that promises are based on callbacks. resolve and reject are just fancy asynchronous callbacks.
 * Promises make the entire structure of callback-based async code much more ergonomic.
 *
 * The above code could be rewritten with the promise constructor like so:
 */
function fig1_2() {
  function addPromise(a, b) {
    return new Promise((resolve, reject) => {
      resolve(a + b);
    });
  }

  const onFulfilled = (sum) => {
    console.log(`The result of 1 + 2 is ${sum}`);
  };

  const onError = (err) => console.error(err);

  addPromise(1, 2).then(onFulfilled, onError);
}

/**
 * The important feature of promises that eliminates callback hell is called
 * promise chaining. Let's look at an example where we want to fetch a recipe,
 * fetch its ingredients, and log them.
 *
 * First, without fully leveraging of promise chaining. This will devolve
 * into callback hell pretty quick.
 */
function fig2() {
  /**
   * For direct comparison, here's the function with callbacks
   */
  function fetchRecipeAndIngredientsCallback(recipeId, callback) {
    RecipeRepository.findById(recipeId, (recipe) => {
      IngredientRepository.find({ id: recipe.ingredientIds }, (ingredients) => {
        callback({
          recipe: recipe,
          ingredients: ingredients,
        });
      });
    });
  }

  // example usage
  fetchRecipeAndIngredients(recipeId, (result) => {
    console.log(result);
  });

  function fetchRecipeAndIngredients(recipeId) {
    return RecipeRepository.findById(recipeId).then((recipe) => {
      /**
       * A promise handler can return a promise, and further `.then` calls
       * will wait for that to resolve. So we can just `return` this value
       * to forward the eventually-fulfilled-result to the caller
       */
      return IngredientRepository.find({ id: recipe.ingredientIds }).then(
        (ingredients) => {
          // this is still a lot of nesting, but things are looking comparatively better
          // than the callback example already.
          return { recipe: recipe, ingredients: ingredients };
        }
      );
    });
  }

  fetchRecipeAndIngredients(recipeId).then((result) => {
    console.log(result);
  });

  /**
   * Now let's beef up our Promise usage by engaging fully with promise chaining
   * to flatten our deeply nested callback structure.
   */

  function fetchRecipeAndIngredientsPro(recipeId) {
    let result = {};
    return RecipeRepository.findById(recipeId)
      .then((recipe) => {
        result.recipe = recipe;
        return IngredientRepository.find({ id: recipe.ingredientIds });
      })
      .then((ingredients) => {
        result.ingredientIds = ingredients;
        return result;
      });
  }

  /**
   * This works exactly the same as above, but maintains a nice flat structure.
   * Since we can just keep chaining `.then` off of itself to specify
   * sequential operations, we don't have to explicitly describe these functions
   * as nesting inside of eachother.
   */
  fetchRecipeAndIngredientsPro(recipeId).then((result) => {
    console.log(result);
  });
}
/**
 * So what does our godawful nasty callback-hell example look like with promises?
 * Let's pretend our `Repository` classes have all been updated to use promises
 * instead of callbacks
 *
 * As a reminder, this function is implemented in callbacks in the @see callback-hell.JS
 * file. It fetches all of the recipes in the database, and all of their ingredients,
 * and marries them into an array of objects.
 */
function fig3() {
  function fetchAllRecipesAndIngredients() {
    var result = [];
    return RecipeRepository.find()
      .then((recipes) => {
        /**
         * Instead of creating a manual queue of tasks to process,
         * we can just chain all this stuff together and let promises
         * sort it out.
         *
         * This is the same as a big long chain of
         * promise.then().then().then().then()...
         */
        // start up a promise
        let promise = Promise.resolve();
        for (const recipe of recipes) {
          // chain the promise with the tasks needed to process
          // each recipe
          promise = promise
            .then(() => {
              return IngredientRepository.find({ id: recipe.ingredientIds });
            })
            .then((ingredients) => {
              result.push({
                recipe: recipe,
                ingredients: ingredients,
              });
            });
        }

        // by returning this promise in here, the following `.then` block
        // won't execute until _after_ we've fetched all of the data needed.
        return promise;
      })
      .then(() => {
        // finally, give back our result array after its all populated
        return result;
      });
  }
}

/**
 * Promises are looking a lot more appealing now. It's probably still looking a little magical, but
 * you can hopefully see how promises can begin to really simplify callback code with its ability
 * to flatten out big deep callback chains & sequencing features.
 *
 * Let's do something more realistic with promises, and add some error handling.
 *
 * This example will be using the
 * ```js
 * fetch(url, options)
 * ```
 * API. This API is standard in the browser, and coming to nodejs in version 17,
 * butfor now we'll use a dependency called "isomorphic-fetch" to provide it.
 */
require("isomorphic-fetch"); // requiring this makes `fetch` available globally

function fig2() {}
