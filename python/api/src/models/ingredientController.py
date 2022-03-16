from tinydb import TinyDB
from models.tinyDbService import TinyDbService
from models.ingredient import Ingredient
"""Controller for managing Ingredients"""
IngredientController = TinyDbService[Ingredient](TinyDB("ingredients.json"), Ingredient)