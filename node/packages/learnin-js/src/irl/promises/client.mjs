/**
 * Real quick, an `.mjs` file is just a way to denote that a particular JS file uses
 * the new `import` and `export` module system, instead of the old `require()` based
 * version. You'll want to understand both, but for now, mjs enables some convenient
 * syntax for us.
 */
import { help } from "./commands/help.mjs";
import { ingredientService, recipeService } from "./services.mjs";

const functions = {
  help,
};

/**
 * When you run `node script.mjs foo`, `process.argv` will look
 * like `["node", "script.mjs", "foo"]`
 */
const [executableName, scriptName, commandName] = process.argv;

runCommand(commandName);

function runCommand() {
  console.log(`Received Command: ${commandName || "None"}`);
  const command = functions[commandName];
  if (!command) {
    console.error("Unknown command");
    help();
    process.exitCode = 1;
    return;
  } else {
    command();
  }
}
