# Install

npm install

# Run

npm start [command] [param]

(try `npm start` to get a list of commands and params)

# Quick Start

- Start the python API

```bash
npm start createSampleData
npm start getRecipe 1
```

# Package Structure

`src/client.mjs` is the main entry point

`src/commands` contains the code that handles each command

`src/services.mjs` contains the promise-based services that work with the python API
