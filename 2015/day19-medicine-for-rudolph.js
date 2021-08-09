const { fileToPuzzle } = require("./util");

const FORMULA_REGEX = /^(.*)\s=>\s(.*)$/;

const findCombinations = (origin, formula) => {
  const combinations = (fromIdx, combos) => {
    if (fromIdx >= 0) {
      const sub = origin.substring(fromIdx);
      const replaced = sub.replace(formula.from, formula.to);
      const rest = origin.substring(0, fromIdx);
      return combinations(origin.indexOf(formula.from, fromIdx + 1), combos.concat(rest + replaced));
    }
    return combos;
  };
  return combinations(origin.indexOf(formula.from), []);
};

fileToPuzzle("day19-puzzle.txt", (puzzle) => {
  const formulas = puzzle.slice(0, puzzle.length - 2).map((p) => {
    const regexResult = FORMULA_REGEX.exec(p);
    return {
      from: regexResult[1],
      to: regexResult[2],
    };
  });
  let combinations = new Set();
  const start = puzzle[puzzle.length - 1];
  formulas.forEach((formula) => {
    findCombinations(start, formula).forEach((combo) => combinations.add(combo));
  });
  console.log(combinations.size);
});
