const { fileToPuzzle } = require("./util");

const boxTwoAndThreeCount = chars => {
  const charCount = chars.split("").reduce((acc, c, _, arr) => {
    if (acc[c]) {
      return acc;
    }
    acc[c] = arr.reduce((count, char) => (char === c ? count + 1 : count), 0);
    return acc;
  }, {});
  return Object.keys(charCount).reduce(
    (acc, c) => {
      if (charCount[c] === 2) {
        acc.two = true;
      } else if (charCount[c] === 3) {
        acc.three = true;
      }
      return acc;
    },
    { two: false, three: false }
  );
};

fileToPuzzle("day2-puzzle.txt", puzzle => {
  const boxCount = puzzle.map(boxTwoAndThreeCount).reduce(
    (acc, c) => {
      if (c.two) {
        acc.twos++;
      }
      if (c.three) {
        acc.threes++;
      }
      return acc;
    },
    { twos: 0, threes: 0 }
  );
  // Part 1
  console.log(boxCount.twos * boxCount.threes);
});
