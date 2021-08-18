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

const calculateFewestSteps = (molecule, formulas) => {
  const uniqueFormulas = formulas.reduce((acc, c) => (acc.indexOf(c.from) < 0 ? acc.concat(c.from) : acc), []);

  const replaced = molecule
    .replace(/Rn/g, () => "(")
    .replace(/Ar/g, () => ")")
    .replace(/Y/g, () => ",");
  const countRnAr = replaced.match(new RegExp("[(|)]", "g")).length;
  const countY = replaced.match(new RegExp(",", "g")).length;
  let countElements = countRnAr + countY;
  uniqueFormulas.forEach((formula) => {
    countElements += (replaced.match(new RegExp(formula, "g")) || []).length;
  });
  return countElements - countRnAr - countY * 2;
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
  const molecule = puzzle[puzzle.length - 1];
  formulas.forEach((formula) => {
    findCombinations(molecule, formula).forEach((combo) => combinations.add(combo));
  });
  // Part 1
  console.log(combinations.size);

  // Part 2
  console.log(calculateFewestSteps(molecule, formulas));
});
