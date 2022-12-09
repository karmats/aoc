const { fileToPuzzle } = require("./util");

const isNumber = (num) => typeof num === "number";

const getIsHiddenAndScore = (x, y, trees) => {
  const height = +trees[y][x];
  const hidden = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  // Top/bottom
  let [yt, yb] = [y + 1, y - 1];
  let [foundUp, foundDown] = [false, false];
  let [treesUp, treesDown] = [0, 0];
  for (let up = +trees[yt][x], down = +trees[yb][x]; isNumber(up) || isNumber(down); yt++, yb--) {
    up = trees[yt] ? +trees[yt][x] : undefined;
    down = trees[yb] ? +trees[yb][x] : undefined;
    if (isNumber(up)) {
      if (up >= height) {
        hidden.bottom = true;
        if (!foundUp) {
          treesUp++;
          foundUp = true;
        }
      } else if (!foundUp) {
        treesUp++;
      }
    }
    if (isNumber(down)) {
      if (down >= height) {
        hidden.top = true;
        if (!foundDown) {
          treesDown++;
          foundDown = true;
        }
      } else if (!foundDown) {
        treesDown++;
      }
    }
  }
  // Left/right
  let [xr, xl] = [x + 1, x - 1];
  let [foundLeft, foundRight] = [false, false];
  let [treesLeft, treesRight] = [0, 0];
  for (let right = +trees[y][xr], left = +trees[y][xl]; isNumber(right) || isNumber(left); xr++, xl--) {
    right = trees[y][xr] >= 0 ? +trees[y][xr] : undefined;
    left = trees[y][xl] >= 0 ? +trees[y][xl] : undefined;
    if (isNumber(right)) {
      if (right >= height) {
        hidden.right = true;
        if (!foundRight) {
          treesRight++;
          foundRight = true;
        }
      } else if (!foundRight) {
        treesRight++;
      }
    }
    if (isNumber(left)) {
      if (left >= height) {
        hidden.left = true;
        if (!foundLeft) {
          treesLeft++;
          foundLeft = true;
        }
      } else if (!foundLeft) {
        treesLeft++;
      }
    }
  }
  const heightScore = treesUp * treesDown * treesLeft * treesRight;
  const isHidden = hidden.top && hidden.bottom && hidden.right && hidden.left;
  return {
    isHidden,
    heightScore,
  };
};

const getHiddenCountAndHighestScore = (trees) => {
  let hiddenCount = 0;
  let highestScore = 0;
  for (let y = 1; y < trees.length - 1; y++) {
    const row = trees[y];
    for (let x = 1; x < row.length - 1; x++) {
      const { isHidden, heightScore } = getIsHiddenAndScore(x, y, trees);
      if (isHidden) {
        hiddenCount++;
      }
      if (heightScore > highestScore) {
        highestScore = heightScore;
      }
    }
  }
  return { hiddenCount, highestScore };
};

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  const { hiddenCount, highestScore } = getHiddenCountAndHighestScore(puzzle);
  // Part 1
  console.log(puzzle.length * puzzle[0].length - hiddenCount);

  // Part 2
  console.log(highestScore);
});
