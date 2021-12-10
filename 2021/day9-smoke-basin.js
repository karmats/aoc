const { fileToPuzzle, sum } = require("./util");

const findLowest = (points) => {
  const lowestPoints = [];
  for (let y = 0; y < points.length; y++) {
    const row = points[y];
    for (let x = 0; x < row.length; x++) {
      const c = +row[x];
      const [left, top, right, bottom] = [
        row[x - 1] ?? 10,
        points[y - 1] ? points[y - 1][x] ?? 10 : 10,
        row[x + 1] ?? 10,
        points[y + 1] ? points[y + 1][x] ?? 10 : 10,
      ].map(Number);
      if (c < left && c < top && c < right && c < bottom) {
        lowestPoints.push(c);
      }
    }
  }
  return lowestPoints;
};

fileToPuzzle("day9-puzzle.txt", (puzzle) => {
  // Part 1
  const lowestPoints = findLowest(puzzle);
  console.log(sum(lowestPoints.map((p) => p + 1)));

  // Part 2
});
