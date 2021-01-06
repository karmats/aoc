const { fileToPuzzle } = require("./util");

const isValid = ([a, b, c]) => a + b > c && a + c > b && b + c > a;

const toTriangles = (spec) =>
  spec
    .split(" ")
    .map((s) => +s)
    .filter((s) => s > 0);

const groupColumns = (matrix) => {
  const grouped = [];
  for (let row = 0; row < matrix.length; row += 3) {
    for (let col = 0; col < 3; col++) {
      grouped.push([matrix[row][col], matrix[row + 1][col], matrix[row + 2][col]]);
    }
  }
  return grouped;
};

fileToPuzzle("day3-puzzle.txt", (puzzle) => {
  const triangles = puzzle.map(toTriangles);
  // Part 1
  console.log(triangles.filter(isValid).length);

  // Part 2
  console.log(groupColumns(triangles).filter(isValid).length);
});
