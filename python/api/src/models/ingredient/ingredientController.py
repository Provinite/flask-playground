from tinydb import TinyDB
from models.tinyDbService import TinyDbService
from .ingredient import Ingredient
"""Controller for managing Ingredients"""
IngredientController = TinyDbService[Ingredient](TinyDB("ingredients.json"), Ingredient)