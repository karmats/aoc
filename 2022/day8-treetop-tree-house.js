const { fileToPuzzle } = require("./util");

const isNumber = (num) => typeof num === "number";

const isHidden = (x, y, trees) => {
  const height = +trees[y][x];
  let hidden = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  // Top/bottom
  let [yt, yb] = [y + 1, y - 1];
  for (let up = +trees[yt][x], down = +trees[yb][x]; isNumber(up) || isNumber(down); ++yt, --yb) {
    if (isNumber(up) && up >= height) {
      hidden.bottom = true;
    }
    if (isNumber(down) && down >= height) {
      hidden.top = true;
    }
    up = trees[yt] ? +trees[yt][x] : undefined;
    down = trees[yb] ? +trees[yb][x] : undefined;
  }
  // Left/right
  let [xr, xl] = [x + 1, x - 1];
  for (let right = +trees[y][xr], left = +trees[y][xl]; isNumber(right) || isNumber(left); ++xr, --xl) {
    if (isNumber(right) && right >= height) {
      hidden.right = true;
    }
    if (isNumber(left) && left >= height) {
      hidden.left = true;
    }
    right = trees[y][xr] >= 0 ? +trees[y][xr] : undefined;
    left = trees[y][xl] >= 0 ? +trees[y][xl] : undefined;
  }
  return hidden.top && hidden.bottom && hidden.right && hidden.left;
};

const getHiddenCount = (trees) => {
  let count = 0;
  for (let y = 1; y < trees.length - 1; y++) {
    const row = trees[y];
    for (let x = 1; x < row.length - 1; x++) {
      if (isHidden(x, y, trees)) {
        count++;
      }
    }
  }
  return count;
};

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  console.log(puzzle.length * puzzle[0].length - getHiddenCount(puzzle));
});
