/**
 * Asynchronous operations are a core part of what makes JS not complete trash.
 * So what does that mean? Most of the time when we talk about "asynchronous" programming
 * it's in the context of _concurrent_ programming concepts like threads.
 *
 * In javascript, asynchronicity does not imply concurrency. JS provides a "run-to-completion"
 * guarantee which means that your code is never going to be run concurrently with other JS code.
 * This is facilitated by a system called the event loop. In the event loop, there is a queue
 * (or multiple queues) of messages waiting to be executed. These messages might come from
 * system-level event listeners (open network connections, or keyboard inputs/mouse-clicks for example).
 *
 * Each message will essentially execute a synchronous block of javascript code to completion before returning
 * control to the event loop.
 *
 *
 * The event loop got its name from the way it's usually implemented. The event loop can be described
 * (in an extremely simplified way) with the following pseudocode:
 * ```js
 * while (queue.waitForMessage()) { // the waitForMessage function will wait until there's a new message on the queue
 *  queue.processNextMessage()
 * }
 * ```
 *
 * SO! What exactly does it mean for code to be synchronous or asynchronous?
 */

// This is a synchronous function
function add(a, b) {
  return a + b;
}

// Loops are also synchronous
function add(numbers) {
  let result = 0;
  for (const number of numbers) {
    result += number;
  }
  return result;
}

/**
 * Pretty much all of the "basic" programming concepts we've talked about so far are synchronous. If we wan to create
 * something asynchronous, we need to add a message to the event queue somehow. There are some built-in functions
 * that allow us to add functions to the event loop.
 * @see async-logging-example.js and then come back here
 */

/**
 * So, asynchronous stuff on the loop can run in unexpected order. Generally when writing code, we write it top-to-bottom
 * and expect it to execute top-to-bottom. With the ability to add stuff to the event loop from within our own code,
 * it becomes important to keep an eye on what exactly is going on. Sometime code is being executed, and some code is just
 * inline functions being passed around to be executed later.
 *
 * Also, this doesn't seem very useful so far.
 *
 * Sux. It's complicated and we'll get there.
 *
 * So, what if we wanted to return a value from an asynchronous function?
 * @see async-callbacks.js
 */
