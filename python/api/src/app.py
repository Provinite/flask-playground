from flask import Flask, request, Response, jsonify

from models.ingredient.ingredient import Ingredient
from models.ingredient.ingredientController import IngredientController
from models.recipe.recipeController import RecipeController
from models.recipe.recipe import Recipe
from flask_cors import CORS
"""Flask app"""
app = Flask(__name__)
CORS(app)

@app.route("/ingredients")
def getIngredients():
  result = IngredientController.find_multiple()
  return jsonify([m.__dict__ for m in result])


@app.route("/ingredients/<ingredient_id>")
def getIngredient(ingredient_id):
  model = IngredientController.find_by_id(int(ingredient_id))
  if model is None:
    response = jsonify(error="NotFound")
    response.status_code = 404
    return response
  else:
    return jsonify(model.__dict__)

@app.route("/ingredients", methods = ["POST"])
def createIngredient():
  # create a new model
  ingredient = Ingredient()
  # get the JSON request body
  json = request.get_json(force = True)

  # transcribe data from request body onto the model
  ingredient.name = json["name"] if "name" in json else None
  ingredient.cost = json["cost"] if "cost" in json else None

  # save the model and return it as the response body
  return jsonify(IngredientController.insert(ingredient).__dict__)

@app.route("/recipes")
def getRecipes():
  # fetch all recipes
  result = RecipeController.find_multiple()

  # jsonify the result
  return jsonify([m.__dict__ for m in result])

@app.route("/recipes/<recipe_id>")
def getRecipe(recipe_id):
  model = RecipeController.find_by_id(int(recipe_id))
  if model is None:
    response = jsonify(error="NotFound")
    response.status_code = 404
    return response
  else:
    return jsonify(model.__dict__)

@app.route("/recipes", methods = ["POST"])
def createRecipe():
  recipe = Recipe()
  json = request.get_json(force=True)
  recipe.name = json["name"] if "name" in json else None
  recipe.items = json["items"] if "items" in json else None
  return RecipeController.insert(recipe).__dict__

if __name__ == "__main__":
  app.run()