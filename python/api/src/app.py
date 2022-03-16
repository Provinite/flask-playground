from flask import Flask, request, jsonify

from models.ingredient import Ingredient
from models.ingredientController import IngredientController
from models.recipeController import RecipeController
from models.recipe import Recipe

"""Flask app"""
app = Flask(__name__)

@app.route("/ingredients")
def getIngredients():
  result = IngredientController.find_multiple()
  return jsonify([m.__dict__ for m in result])

@app.route("/ingredients/<ingredient_id>")
def getIngredient(ingredient_id):
  return jsonify(IngredientController.find_by_id(int(ingredient_id)).__dict__)

@app.route("/ingredients", methods = ["POST"])
def createIngredient():
  # create a new model
  ingredient = Ingredient()
  # get the JSON request body
  json = request.get_json()

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
  return jsonify(RecipeController.find_by_id(int(recipe_id)).__dict__)

@app.route("/recipes", methods = ["POST"])
def createRecipe():
  recipe = Recipe()
  json = request.get_json()
  recipe.name = json["name"] if "name" in json else None
  return RecipeController.insert(recipe).__dict__

if __name__ == "__main__":
  app.run()