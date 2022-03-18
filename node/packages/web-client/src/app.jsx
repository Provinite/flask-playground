import { useEffect, useState } from "react";
import * as React from "react";
import { render } from "react-dom";
import { getAllRecipes, createRecipe } from "./apiService";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipeName, setNewRecipeName] = useState();

  useEffect(() => {
    const loadRecipes = async () => {
      const newRecipes = await getAllRecipes();
      setRecipes(newRecipes);
    };

    loadRecipes();
  }, []);

  const createNewRecipe = async () => {
    const newRecipe = await createRecipe({
      name: newRecipeName,
    });

    const newRecipes = recipes.concat([newRecipe]);
    setRecipes(newRecipes);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          const newText = e.target.value;
          if (newText.length > 10) {
            return;
          }
          setNewRecipeName(newText);
        }}
        value={newRecipeName}
      />
      <button
        onClick={() => {
          createNewRecipe();
        }}
      >
        Add Recipe
      </button>
      <RecipeList recipes={recipes} />
    </div>
  );
}

function RecipeList(props) {
  return <pre>{JSON.stringify(props.recipes, null, 2)}</pre>; // null, 2 here for "json pretty printing"
}

render(<App />, document.getElementById("app"));
