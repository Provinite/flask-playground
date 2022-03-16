# Basic Flask REST API
This app presents a simple REST API

# Requirements
Dependencies are in requirements.txt. Suggest using a python virtual env

# Start the server
From this path:
```sh
python ./src/app.py
```

# Database
The databases exist under the root of this package (`python/api/`) as plain JSON files

# API Rules

- The API starts by default at http://localhost:5000
- Responses are always JSON
- Request bodies should be JSON encoded
- Data is expected in request body for POST requests

# API Structure

## Ingredients
Ingredient structure:
```js
{
  "id": int,
  "name": string,
  "cost": int
}
```

### GET /ingredients
Fetch all ingredients, returns an array of ingredients

### GET /ingredients/<ingredient_id>
Fetch an ingreident by its ID

### POST /ingredients
Create a new ingredient.

## Recipes
Recipe structure:
```js
{
  "id": int,
  "name": string,
  "items": [{
    ingredientId: int,
    quantity: int
  }]
}
```
Note that `items` is an array.

### GET /recipes
Fetch all recipes, returns an array of recipes

### GET /recipes/<recipe_id>
Fetch a recipe by its ID

### POST /recipes
Create a new RECIPE