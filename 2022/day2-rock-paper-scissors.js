const { fileToPuzzle, sum } = require("./util");

const matrixPart1 = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
};

const matrixPart2 = {
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  },
};

const calculateMatchPoints = (matches, matrix) => {
  return matches.map((match) => {
    const [opp, me] = match.split(" ");
    const points = matrix[opp][me];
    return points;
  });
};

fileToPuzzle("day2-puzzle.txt", (puzzle) => {
  // Part 1
  let matchPoints = calculateMatchPoints(puzzle, matrixPart1);
  console.log(sum(matchPoints));

  // Part 2
  matchPoints = calculateMatchPoints(puzzle, matrixPart2);
  console.log(sum(matchPoints));
});
