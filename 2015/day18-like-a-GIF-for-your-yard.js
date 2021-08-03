const { fileToPuzzle } = require("./util");

const TURNS = 100;

const countOnNeighbors = (grid, row, col) => {
  let count = 0;
  for (let rn = -1; rn <= 1; rn++) {
    for (let cn = -1; cn <= 1; cn++) {
      if (!(rn === 0 && cn === 0) && grid[row - rn] && grid[row - rn][col - cn] === "#") {
        count++;
      }
    }
  }
  return count;
};

const animateLights = (grid, brokenCorners = false) => {
  let nextGrid = Array.from(new Array(grid.length)).map(() => "");
  for (let iRow = 0; iRow < grid.length; iRow++) {
    for (let iCol = 0; iCol < grid.length; iCol++) {
      const currState = grid[iRow][iCol];
      let nextState = ".";
      const onNeighbors = countOnNeighbors(grid, iRow, iCol);
      if (
        (brokenCorners && iRow === 0 && (iCol === 0 || iCol === grid.length - 1)) ||
        (iRow === grid.length - 1 && (iCol === 0 || iCol === grid.length - 1))
      ) {
        nextState = "#";
      } else if ((currState === "#" && onNeighbors === 2) || onNeighbors === 3 || (currState === "." && onNeighbors === 3)) {
        nextState = "#";
      }
      nextGrid[iRow] = `${nextGrid[iRow]}${nextState}`;
    }
  }
  return nextGrid;
};

const printGrid = (grid) => grid.reduce((gridString, row) => `${gridString}\n${row}`, "");

const countOnLights = (grid) => grid.reduce((onLights, row) => onLights + (row.match(/#/g) || []).length, 0);

fileToPuzzle("day18-puzzle.txt", (puzzle) => {
  let grid1 = puzzle.slice();
  let grid2 = puzzle.map((row, idx) => {
    if (idx === 0 || idx === row.length - 1) {
      return `#${row.slice(1, row.length - 1)}#`;
    }
    return row;
  });
  for (let turn = 0; turn < TURNS; turn++) {
    grid1 = animateLights(grid1);
    grid2 = animateLights(grid2, true);
  }
  console.log(countOnLights(grid1));
  console.log(countOnLights(grid2));
});
