const { fileToPuzzle } = require("./util");

const STEPS = 100;

const doFlash = (grid, y, x) => {
  for (let rowIdx = y - 1; rowIdx <= y + 1; rowIdx++) {
    for (let colIdx = x - 1; colIdx <= x + 1; colIdx++) {
      if (rowIdx < 10 && rowIdx >= 0 && colIdx < 10 && colIdx >= 0 && grid[rowIdx][colIdx] !== "*") {
        grid[rowIdx][colIdx] = grid[rowIdx][colIdx] + 1;
        if (grid[rowIdx][colIdx] > 9) {
          grid[rowIdx][colIdx] = "*";
          doFlash(grid, rowIdx, colIdx);
        }
      }
    }
  }
};

const doStep = (grid) => {
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = grid[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      row[colIdx] = row[colIdx] + 1;
      if (row[colIdx] > 9) {
        row[colIdx] = "*";
        doFlash(grid, rowIdx, colIdx);
      }
    }
  }
  let flashes = 0;
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = grid[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      if (typeof row[colIdx] === "string") {
        row[colIdx] = 0;
        flashes++;
      }
    }
  }
  return flashes;
};

fileToPuzzle("day11-puzzle.txt", (puzzle) => {
  const octopusGrid = puzzle.map((p) => p.split("").map(Number));

  let currentFlashCount = 0;
  let totalFlashCount = 0;
  let steps = 0;
  while (currentFlashCount !== 100) {
    currentFlashCount = doStep(octopusGrid);
    totalFlashCount += currentFlashCount;
    steps++;
    // Part 1
    if (steps === STEPS) {
      console.log(totalFlashCount);
    }
  }
  // Part 2
  console.log(steps);
});
