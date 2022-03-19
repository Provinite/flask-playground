/**
 * This will be an array of messages to log. We'll use this to examine what order code executes in using different
 * asynchronous constructs.
 */
const logMessages = [];

/**
 * This function synchronously adds a log message
 */
function log(message) {
  console.log(message);
}

/**
 * This function uses the built in function `setImmediate(fn)` to place a function onto the event
 * queue to be executed some time after the current synchronous block of code finishes. Remember
 * "run-to-completion" still applies.
 *
 */
function logImmediateIsh(message) {
  /**
   * `setImmediate` takes a function as an argument. This function is executed in a later
   * iteration of the event loop. It's not guaranteed to be "immediately" or even the next block
   * of synchronous code on the event loop.
   */
  setImmediate(() => {
    log(message);
  });
}

/**
 * This function uses the built-in function `setTimeout` to place a function onto the event
 * queue to be executed after a delay.
 *
 * @param {string} message
 * @param {number} ms - The number of milliseconds to wait before adding the message to the log list
 */
function logLater(message, ms) {
  setTimeout(() => {
    log(message);
  }, ms);
}

/**
 * Change this line of code to run the different example functions below.
 * Before running each function try to take a guess at what you expect the output to be.
 */
ex5_with_var();

function ex1() {
  console.log("foo");
  console.log("bar");
  console.log("baz");
}

function ex2() {
  console.log("Scheduling async log");
  setImmediate(() => {
    console.log("Async log message");
  });
  console.log("Scheduled async log");
}

function ex3() {
  logImmediateIsh("A");
  log("B");
  log("C");
}

function ex4() {
  setTimeout(() => {
    console.log("A");
  }, 3000);
  setImmediate(() => {
    console.log("B");
  });
  console.log("C");
  for (let i = 0; i < 3; i++) {
    console.log(i);
  }
}

function ex5() {
  for (let i = 0; i < 5; i++) {
    setImmediate(() => {
      console.log(i);
    });

    console.log(i);
  }
}

/**
 * This example is here to show a very confusing property of `var`-declared
 * variables property of being function-scoped.
 */
function ex5_with_var() {
  for (var i = 0; i < 5; i++) {
    setImmediate(() => {
      console.log(i);
    });
    console.log(i);
  }
}
