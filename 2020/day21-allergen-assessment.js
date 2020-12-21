const { fileToPuzzle } = require("./util");

const ALLERGEN_REGEX = /\(contains\s(.*)\)/;

const toModel = (puzzle) =>
  puzzle.map((p) => {
    const [ingedients, allergens] = p.split(ALLERGEN_REGEX);
    return {
      ingredients: ingedients
        .split(" ")
        .map((s) => s.trim())
        .filter((s) => !!s),
      allergens: allergens
        .split(",")
        .map((s) => s.trim())
        .filter((s) => !!s),
    };
  });

const toIngredientsAllergensMap = (model) =>
  model.reduce((ingrAllergens, rule) => {
    rule.allergens.forEach((allergen) => {
      if (!ingrAllergens[allergen]) {
        ingrAllergens[allergen] = rule.ingredients;
      } else {
        ingrAllergens[allergen] = ingrAllergens[allergen].filter((a) => rule.ingredients.includes(a));
      }
    });
    return ingrAllergens;
  }, {});

const countAllergenFree = (ingredientsAllergensMap, model) => {
  const uniqueIngredients = new Set(model.reduce((unique, x) => unique.concat(x.ingredients), []));
  const allergenIngredients = new Set(
    Object.keys(ingredientsAllergensMap).reduce((unique, allergen) => unique.concat(ingredientsAllergensMap[allergen]), [])
  );
  const notAllergenIngredients = [...uniqueIngredients].filter((ingr) => ![...allergenIngredients].includes(ingr));
  return model.reduce(
    (ingrAllergens, rule) =>
      ingrAllergens + rule.ingredients.reduce((count, ingr) => (notAllergenIngredients.includes(ingr) ? count + 1 : count), 0),
    0
  );
};

const removeIngredient = (ingredient, ingredientsAllergensMap) => {
  for (let allergen in ingredientsAllergensMap) {
    const ingredients = ingredientsAllergensMap[allergen];
    if (ingredients.length > 1) {
      ingredientsAllergensMap[allergen] = ingredients.filter((i) => i !== ingredient);
    }
  }
  return ingredientsAllergensMap;
};

const findIngredientsWithAllergen = (ingredientsAllergensMap, removed) => {
  if (Object.keys(ingredientsAllergensMap).every((a) => ingredientsAllergensMap[a].length === 1)) {
    return ingredientsAllergensMap;
  }
  for (let allergen in ingredientsAllergensMap) {
    if (ingredientsAllergensMap[allergen].length === 1) {
      const ingredientToRemove = ingredientsAllergensMap[allergen][0];
      if (!removed.includes(ingredientToRemove)) {
        removed.push(ingredientToRemove);
        return findIngredientsWithAllergen(removeIngredient(ingredientToRemove, ingredientsAllergensMap), removed);
      }
    }
  }
  return ingredientsAllergensMap;
};

fileToPuzzle("day21-puzzle.txt", (puzzle) => {
  const model = toModel(puzzle);
  const ingredientsAllergensMap = toIngredientsAllergensMap(model);
  // Part 1
  console.log(countAllergenFree(ingredientsAllergensMap, model));

  // Part 2
  const allergenMap = findIngredientsWithAllergen(ingredientsAllergensMap, []);
  console.log(
    Object.keys(allergenMap)
      .sort()
      .map((allergen) => allergenMap[allergen][0])
      .join(",")
  );
});
