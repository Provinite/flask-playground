from __future__ import annotations
from tinydb import TinyDB
from typing import TypeVar, Generic, Type

T = TypeVar("T")

"""Class for managing entities using TinyDB as a JSON database"""
class TinyDbService(Generic[T]):
  """The TinyDB instance"""
  db: TinyDB

  """Constructor

  Type Parameters
  ---------------
  T - The type of model this controller manages

  Parameters
  ----------
  db: TinyDB
    The tinydb database to use
  modelClass: Type[T]
    The model class itself
  """
  def __init__(self, db: TinyDB, modelClass: Type[T]):
    self.db = db
    self.modelClass = modelClass
    

  """Fetch all documents form tinydb"""
  def find_multiple(self):
    return [self.marshall(d) for d in self.db.all()]
  
  """Insert a document, returns the updated document"""
  def insert(self, document: T):
    id = self.db.insert(vars(document))
    document.id = id
    return document

  def find_by_id(self, id: int):
    doc = self.db.get(doc_id=id)
    return self.marshall(doc) if doc else None

  """Marshall a model object from a tinydb document"""
  def marshall(self, doc):
    model = self.modelClass()
    for key in doc:
      setattr(model, key, doc[key])
    setattr(model, "id", doc.doc_id)
    return model