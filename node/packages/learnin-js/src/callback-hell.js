/**
 * Callback hell is a very real place that you will quickly end up if you want
 * to create complex applications using asynchronous functionality (like sending and receiving
 * data over the internet)
 *
 * Let's look at a more complex callback use case. In the below example,
 * `RecipeRepository` and `IngredientRepository` are objects with callback-based
 * utilities for interacting with a database.
 *
 * Their `getAll` function takes a callback which receives an array of documents.
 * The `save` function takes an object and a callback which receives the saved document
 */

function fig1() {
  /**
   * This function fetches all of the recipes in the database, for each recipe
   * it fetches all of the ingredients, and gives back an array of objects that
   * looks like
   *
   * (this is some TypeScript style code that we can use for nice syntax highlighting
   * in the comment here. For now, just know that an Interface is a definition of a "shape"
   * of an object, eg its keys and value data types)
   * ```ts
   * interface Ingredient {
   *   id: number,
   *   name: string,
   *   cost: number
   * }
   *
   * interface Recipe {
   *   id: number,
   *   name: string
   *   ingredientIds: number[]
   * }
   *
   * interface ResultObject {
   *   recipe: Recipe,
   *   ingredient: Ingredient
   * }
   * ```
   */

  /**
   * First, here's the code if everything was synchronous
   *
   * This is super simple, just a few lines mostly just bundling the data
   * together and a simple iteration over the recipes array.
   */
  function getRecipesWIthIngredientsSync() {
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
   * Doing the same thing with callbacks is... complicated.
   *
   * It's difficult to write, read, and reason about. It's very
   * indirect and ultimately requires loads more documentation and
   * testing to verify it works.
   *
   * Additionally, it's not very robust. For example, if one of our
   * nested inner calls to `IngredientRepository.find` were to error
   * (say, the database went offline), the entire application would just
   * suddenly crash.
   *
   * It's not super important to fully understand this function, but you
   * should be able to see why callbacks aren't the greatest in terms of
   * ergonomics.
   */
  function getRecipesWithIngredients(callback) {
    RecipeRepository.find((recipes) => {
      let resultArray = [];
      const tasksToDo = [];

      /**
       * Fill tasksToDo with a set of functions that can be called
       * to process a single recipe, and invoke a provided callback.
       *
       * This will allow us to "chain" these together using some simple
       * recursion below
       */
      for (const recipe of recipes) {
        const taskFunction = (next) => {
          // side note, we're getting _deeply_ nested here. This is kind of the
          // heart of the problem with callback hell
          IngredientRepository.find({ id: recipe.ingredientIds }, () => {
            // at this point, we have the recipe and the ingredients
            // save them into the result array
            resultArray.push({
              recipe: recipe,
              ingredients: ingredients,
            });

            // call the callback for taskFunction to notify
            // the caller that we're done here and it can continue
            next();
          });
        };

        // put this task onto our queue
        tasksToDo.push(taskFunction);
      }

      // we've set up all the tasks, start them running
      processNextTask();

      // where even are we anymore? This is so confusing

      /**
       * This function processes the next task in the queue,
       * and invokes itself. If there is no remaining task, it will
       * call the top-level callback.
       */
      function processNextTask() {
        // remove the first element from the tasks array, and put it in the `task`variable
        const task = tasksToDo.shift();

        // we're out of tasks to do, invoke the top-level callback
        // this is the equivalent of "return result" in the sync version
        if (!task) {
          callback(resultArray);
          return; // stop executing so we don't infinitely loop below (or crash)
        }

        // run the task, and run `processNextTask` when its done
        task(processNextTask);
      }
    });
  }
}

/**
 * The same thing that was a single simple iterator in synchronous code has become
 * a morass of nested functions, recursion, and it encapsulates a bunch of unrelated
 * logic just to facilitate the asynchronous queueing.
 *
 * Moreover, in a synchronous function, to handle errors you can just use a familiar
 * try/catch block
 * ```js
 * try {
 *   getRecipesWIthIngredientsSync();
 * } catch (err) {
 *   console.log("Something went wrong, sorry. At least we didn't crash!")
 * }
 * ```
 *
 * But wrapping an asynchronous function in a `try/catch` won't catch errors inside of
 * event loop tasks that are added by the function (or its child tasks).
 *
 * ```js
 * try {
 *  setImmediate(() => {
 *    throw new Error("I'm going to crash this whole server")
 *  });
 * } catch (err) {
 *  // this won't every catch, since the error isn't thrown until after
 *  // this synchronous code all finishes
 * }
 * console.log("Good to go!");
 * // crashes after this when the event loop ticks over
 * ```
 *
 * If you want to learn a bit more about what callback usage is like in the "real world",
 * check out @see error-first-callbacks.js
 *
 * If you'd like to read on to some more relevant modern technologies used to manage
 * asynchronous workflows, @see promises.js
 */
