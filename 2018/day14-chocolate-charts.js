const RECIPIES = 704321;

let recipe = "37";
let firstElfPos = 0;
let secondElfPos = 1;
let r = recipe.length;
for (r = 2; ; r = recipe.length) {
  if (r === RECIPIES + 10) {
    // Part 1
    console.log(recipe.substring(RECIPIES));
  }
  const firstElfScore = +recipe[firstElfPos];
  const secondElfScore = +recipe[secondElfPos];
  const newRecipe = firstElfScore + secondElfScore;
  recipe += newRecipe;
  firstElfPos = (firstElfPos + firstElfScore + 1) % recipe.length;
  secondElfPos = (secondElfPos + secondElfScore + 1) % recipe.length;
  const idx = recipe.indexOf(RECIPIES + "");
  if (idx >= 0) {
    // Part 2
    console.log(recipe.substring(0, idx).length);
    break;
  }
}
