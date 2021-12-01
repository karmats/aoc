const { fileToPuzzle } = require("./util");

const countIncreases = (measurements, everyX) =>
  measurements.reduce((count, measurement, idx, arr) => (arr[idx + everyX] > measurement ? count + 1 : count), 0);

fileToPuzzle(
  "day1-puzzle.txt",
  (puzzle) => {
    // Part 1
    console.log(countIncreases(puzzle, 1));

    // Part 2
    console.log(countIncreases(puzzle, 3));
  },
  {
    isNumber: true,
  }
);
