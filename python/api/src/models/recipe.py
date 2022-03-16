from __future__ import annotations
from typing import List, TypedDict
"""Model for a recipe. Includes its name and what is required"""
class Recipe:
  id: int
  """The name of the recipe"""
  name: str
  """List of inputs to the recipe. Each has a quantity and references an ingredient"""
  items: List[RecipeItem] = []

"""Typed dictionary type for recipe inputs"""
class RecipeItem(TypedDict):
  ingredientId: int
  quantity: int
