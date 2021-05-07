const { fileToPuzzle } = require("./util");

const isNumber = (value) => typeof value === "number";

const sumAllNumbers = (json, sum, ignoreRed = false) => {
  if (Array.isArray(json)) {
    return sum + json.reduce((s, c) => s + sumAllNumbers(c, 0, ignoreRed), 0);
  }
  if (typeof json === "object" && (!ignoreRed || (ignoreRed && !Object.keys(json).some((key) => json[key] === "red")))) {
    return sum + Object.keys(json).reduce((s, key) => s + sumAllNumbers(json[key], 0, ignoreRed), 0);
  }
  if (isNumber(json)) {
    return sum + json;
  }
  return sum;
};

fileToPuzzle("day12-puzzle.txt", (puzzle) => {
  const json = JSON.parse(puzzle);

  // Part 1
  console.log(sumAllNumbers(json, 0));

  // Part 2
  console.log(sumAllNumbers(json, 0, true));
});
