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

const diffingChars = (a, b) => {
    const result = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            result.push(a[i]);
        }
    }
    return result;
}

fileToPuzzle("day2-puzzle.txt", puzzle => {
  // Part 1
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

  console.log(boxCount.twos * boxCount.threes);

  // Part 2
  loop:
  for (let i = 0; i < puzzle.length; i++) {
      for (let j = i + 1; j < puzzle.length; j++) {
          const diff = diffingChars(puzzle[i], puzzle[j]);
          if (diff.length === 1) {
              console.log(puzzle[i].replace(diff[0], ""));
              break loop;
          }
      }
  }
});
