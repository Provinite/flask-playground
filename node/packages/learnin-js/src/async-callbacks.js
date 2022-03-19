/**
 * In this file, we're going to examine one of the most basic patterns in javascript
 * for orchestrating asynchronous workflows: the callback.
 *
 * First off, let's look at the problem. I've kind of implied that returning from
 * asynchronous functions is complicated, but why is that?
 */

/**
 * Take a guess at this one, run it in a REPL before continuing
 */
function fig1() {
  function addAsync(a, b) {
    let result = undefined;
    setImmediate(() => {
      result = a + b;
    });
    return result;
  }

  const result = addAsync(1, 2);
  console.log(`The result of 1 + 2 is ${result}!`);
}

/**
 * So why is the result undefined? Let's think about what's happening in the `addAsync` function:
 */
function fig1_in_detail() {
  /**
   * This function takes in two numbers, schedules an asynchronous task on the event queue
   * to add them, and then. . . ?
   */
  function addAsync(a, b) {
    /** result is initialized to undefined, since we don't know the result yet */
    let result = undefined;
    /**
     * This code essentially says:
     * "At a later iteration of the event loop, please run this function:
     * `() => { result = a + b };`
     */
    setImmediate(() => {
      result = a + b;
    });

    /**
     * This code is still part of the synchronous block of `addAsync`.
     * The code inside of the above `setImmediate` call has not run yet, so
     * `result` is still `undefined`.
     */
    return result;
  }

  /**
   * Run the synchronous part of `addAsync` and give me the result it returns.
   */
  const result = addAsync(1, 2);
  /**
   * At this point, the task to run `result = a + b` is still sitting on the event queue
   * waiting to be run. All of this synchronous code comes first, and so the result of this log
   * is `undefined`.
   */
  console.log(`The result of 1 + 2 is ${result}!`);
}

/**
 * So the takeaway here is: when starting an asynchronous task from a synchronous flow,
 * you have to remember that those tasks are essentially "fire-and-forget". By default,
 * you don't have any visibility into when those tasks have actually run, or the result
 * of their computations.
 *
 * So how can we "wait" for synchronous code to finish? Javascript's "run-to-completion"
 * is seeming like a detriment at this point. In fact, we can't. There's no way to make
 * synchronous code wait for asynchronous code in javascript.
 */

function cheatingAtJavascript() {
  function addAsyncMagic(a, b) {
    let done = false;
    let result = undefined;
    setImmediate(() => {
      result = a + b;
      done = true;
    });

    // line [A]:
    while (!done) {
      // just loop here until we're done
      // hah, gotcha JS
    }

    return result;
  }

  const result = addAsyncMagic(1, 2);
  console.log(`The result of 1 + 2 is ${result}!`);
}

/**
 * The above function attempts to cheat causality by synchronously
 * returning a value derived from an asynchronous function.
 *
 * Unfortunately it doesn't work, and simply enters into a
 * synchronous infinite loop on line [A], never to `return` again.
 *
 * So, fine, we can't make synchronous code wait around. How can we make
 * code "asynchronous" so it _can_ wait around?
 *
 * One of the first solutions in JS to this problem was the callback pattern.
 * A callback is a function that is passed as an argument to another function,
 * and invoked later with result data.
 */

function fig2() {
  /**
   * Asynchronously add two numbers. Invokes callback with the result
   * @param {number} a - summand
   * @param {number} b - summand
   * @param {Function} callback - A callback function, invoked with
   * the sum of a and b.
   *
   * Documentation Note: Another way to denote the type of a function in more detail:
   * @param {(sum: number) => void} callback
   */
  function addAsync(a, b, callback) {
    setImmediate(() => {
      // ring ring
      callback(a + b);
    });
  }

  /**
   * This is our callback function we'll pass into
   * addAsync.
   * @param {} result
   */
  const handleResult = (result) => {
    console.log(`The result of 1 + 2 is ${result}!`);
  };

  addAsync(1, 2, handleResult);

  /**
   * It's also really common to see callbacks declared anonymously
   */
  addAsync(1, 2, (sum) => {
    console.log(`The result of 1 + 2 is ${sum}!`);
  });
}
