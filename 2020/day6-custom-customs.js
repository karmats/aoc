const { fileToPuzzle } = require("./util");

const uniqueChars = (charsArray) => {
  const result = new Set();
  charsArray.forEach((ca) => {
    const chars = ca.split("");
    chars.forEach(result.add, result);
  });
  return [...result];
};

const charsInAll = (groups, uniqueChars) =>
  uniqueChars.map((uc, idx) => {
    const group = groups[idx];
    return uc.filter((c) => group.every((g) => g.includes(c))).length;
  });

const sum = (arr) => arr.reduce((s, c) => s + c, 0);

fileToPuzzle(
  "day6-puzzle.txt",
  (puzzle) => {
    const groups = puzzle.map((p) => p.split("\n"));
    const uniqueCharsArray = groups.map(uniqueChars);

    // Part 1
    const uniqueCharLengthArray = uniqueCharsArray.map((uca) => uca.length);
    console.log(sum(uniqueCharLengthArray));

    // Part 2
    const charsInAllArray = charsInAll(groups, uniqueCharsArray);
    console.log(sum(charsInAllArray));
    // console.log(charsInAllArray);
  },
  { separator: /\n\s?\n/ }
);
