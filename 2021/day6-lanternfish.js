const { fileToPuzzle } = require("./util");

doCycles = (days, ages) => {
  for (let i = 0; i < days; i++) {
    const zeroes = ages.filter((a) => a === 0);
    ages = ages.map((age) => (age === 0 ? 6 : age - 1));
    zeroes.forEach(() => {
      ages.push(8);
    });
  }
  return ages;
};

fileToPuzzle(
  "day6-puzzle.txt",
  (puzzle) => {
    // Part 1
    console.log(doCycles(80, puzzle).length);
  },
  {
    separator: ",",
    isNumber: true,
  }
);
