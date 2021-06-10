const TEST_INGREDIENTS = {
  Butterscotch: { capacity: -1, durability: -2, flavor: 6, texture: 3, calories: 8 },
  Cinnamon: { capacity: 2, durability: 3, flavor: -2, texture: -1, calories: 3 },
};
const INGREDIENTS = {
  Sprinkles: { capacity: 5, durability: -1, flavor: 0, texture: 0, calories: 5 },
  PeanutButter: { capacity: -1, durability: 3, flavor: 0, texture: 0, calories: 1 },
  Frosting: { capacity: 0, durability: -1, flavor: 4, texture: 0, calories: 6 },
  Sugar: { capacity: -1, durability: 0, flavor: 0, texture: 2, calories: 8 },
};

const INGREDIENT_PROPERTIES = ["capacity", "durability", "flavor", "texture"];

const calculateScore = (ingredients) => {
  const ingredientKeys = Object.keys(ingredients);
  let score = 1;
  INGREDIENT_PROPERTIES.forEach((prop) => {
    let propScore = 0;
    ingredientKeys.forEach((name) => {
      const ingredient = ingredients[name];
      propScore += ingredient.amount * ingredient[prop];
    });
    score *= propScore < 0 ? 0 : propScore;
  });
  return score;
};

const has500Calories = (ingredients) => {
  let calories = Object.keys(ingredients).reduce((cals, name) => {
    return cals + ingredients[name].calories * ingredients[name].amount;
  }, 0);
  return calories === 500;
};

let highestScore = 0;
let highestScore500Calories = 0;
for (let sp = 1; sp < 98; sp++) {
  for (let p = 1; p < 98; p++) {
    for (let f = 1; f < 98; f++) {
      for (let su = 1; su < 98; su++) {
        if (sp + p + f + su === 100) {
          const ingredients = { ...INGREDIENTS };
          ingredients.Sprinkles = { ...ingredients.Sprinkles, amount: sp };
          ingredients.PeanutButter = { ...ingredients.PeanutButter, amount: p };
          ingredients.Frosting = { ...ingredients.Frosting, amount: f };
          ingredients.Sugar = { ...ingredients.Sugar, amount: su };

          const score = calculateScore(ingredients);
          if (score > highestScore) {
            highestScore = score;
          }
          if (has500Calories(ingredients) && score > highestScore500Calories) {
            highestScore500Calories = score;
          }
        }
      }
    }
  }
}
// Part 1
console.log(highestScore);
// Part 2
console.log(highestScore500Calories);
