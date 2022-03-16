from tinydb import TinyDB
from models.tinyDbService import TinyDbService
from .recipe import Recipe
"""Controller for managing recipes"""
RecipeController = TinyDbService[Recipe](TinyDB("recipes.json"), Recipe)