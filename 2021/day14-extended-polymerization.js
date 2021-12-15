const { fileToPuzzle } = require("./util");

const doRound = (template, rules) => {
  let newTemplate = "";
  for (let i = 0; i < template.length - 1; i++) {
    const letters = template[i] + template[i + 1];
    if (i === 0) {
      newTemplate += letters[0] + rules[letters] + letters[1];
    } else {
      newTemplate += rules[letters] + letters[1];
    }
  }
  return newTemplate;
};

const countLetters = (template) =>
  template.split("").reduce((counts, letter) => {
    if (counts[letter] > 0) {
      return { ...counts, [letter]: counts[letter] + 1 };
    }
    return { ...counts, [letter]: 1 };
  }, {});

fileToPuzzle("day14-puzzle.txt", (puzzle) => {
  let template = puzzle[0];
  const rules = puzzle.slice(2).reduce((acc, c) => {
    const [from, to] = c.split(" -> ");
    return {
      ...acc,
      [from]: to,
    };
  }, {});
  // Part 1
  for (let times = 0; times < 10; times++) {
    template = doRound(template, rules);
  }
  const letterCounts = countLetters(template);
  const [min, max] = Object.keys(letterCounts).reduce(
    (minMax, c) => {
      const counts = letterCounts[c];
      return [counts < minMax[0] ? counts : minMax[0], counts > minMax[1] ? counts : minMax[1]];
    },
    [Number.MAX_SAFE_INTEGER, 0]
  );
  console.log(max - min);
});
