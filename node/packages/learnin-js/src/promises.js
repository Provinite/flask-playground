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
