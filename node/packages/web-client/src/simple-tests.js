(async () => {
  const createResponse = await fetch("http://localhost:5000/ingredients", {
    method: "POST",
    body: JSON.stringify({
      name: "Mock Ingredient",
    }),
  });

  const newIngredient = await createResponse.json();

  const fetchResponse = await fetch(
    "http://localhost:5000/ingredients/" + newIngredient.id
  );

  const fetchedIngredient = await fetchResponse.json();

  assertEqual(newIngredient.name, fetchedIngredient.name);
  assertEqual(newIngredient.id, fetchedIngredient.id);

  document.write("Tests passed!" + JSON.stringify(newIngredient));
})();

function assertEqual(a, b) {
  if (a === b) {
    return;
  } else {
    throw new Error("Assertion error!" + a + " != " + b);
  }
}
