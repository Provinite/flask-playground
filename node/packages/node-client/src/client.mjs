/**
 * Real quick, an `.mjs` file is just a way to denote that a particular JS file uses
 * the new `import` and `export` module system, instead of the old `require()` based
 * version. You'll want to understand both, but for now, mjs enables some convenient
 * syntax for us.
 */
import { help } from "./commands/help.mjs";
import { getRecipe } from "./commands/getRecipe.mjs";
import { createSampleData } from "./commands/createSampleData.mjs";
const functions = {
  help,
  getRecipe,
  createSampleData,
};

/**
 * When you run `node script.mjs foo`, `process.argv` will look
 * like `["node", "script.mjs", "foo"]`
 */
const [executableName, scriptName, commandName, param] = process.argv;

runCommand(commandName);

function runCommand() {
  console.log(
    `Received Command: ${commandName || "None"}, Param: ${param || "None"}`
  );
  const command = functions[commandName];
  if (!command) {
    console.error("Unknown command");
    help();
    process.exitCode = 1;
    return;
  } else {
    // wrap in Promise.resolve() here so that functions
    // that don't return promises are safely wrapped
    Promise.resolve()
      .then(() => command(param))
      .then((response) => {
        const result = {
          status: "success",
          command: commandName,
          param: param || undefined,
          response: response || "None",
        };

        // pretty-print
        console.log(JSON.stringify(result, null, 2));
      })
      .catch((err) => {
        const result = {
          status: "error",
          command: commandName,
          param: param || undefined,
          errorName: err.name,
          errorMessage: err.message,
          stack: err.stack,
        };
        // pretty-print
        console.error(JSON.stringify(result, null, 2));
      });
  }
}
