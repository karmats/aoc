const { fileToPuzzle } = require("./util");

const STEP_REGEX = /([LR])(\d*)/;
const DIRECTIONS = ["N", "E", "S", "W"];

const nextDirection = (current, turn) => {
  const idx = DIRECTIONS.indexOf(current);
  const mod = DIRECTIONS.length;
  if (turn === "R") {
    return DIRECTIONS[(idx + 1) % mod];
  }
  return DIRECTIONS[idx - 1 >= 0 ? idx - 1 : mod - 1];
};

const doStep = ([x, y], direction, steps) => {
  switch (direction) {
    case "N":
      return [x, y + steps];
    case "E":
      return [x + steps, y];
    case "S":
      return [x, y - steps];
    case "W":
      return [x - steps, y];
    default:
      throw new Error(`Unknown direction ${direction}`);
  }
};

const allVisited = ([fromX, fromY], [toX, toY]) => {
  if (fromX - toX > 0) {
    return Array.from(new Array(fromX - toX - 1)).map((_, idx) => [fromX - idx - 1, fromY].join(","));
  } else if (fromX - toX < 0) {
    return Array.from(new Array(toX - fromX - 1)).map((_, idx) => [toX - idx - 1, fromY].join(","));
  } else if (fromY - toY > 0) {
    return Array.from(new Array(fromY - toY - 1)).map((_, idx) => [fromX, fromY - idx - 1].join(","));
  }
  return Array.from(new Array(toY - fromY - 1)).map((_, idx) => [fromX, toY - idx - 1].join(","));
};

const walk = (steps) =>
  steps.reduce(
    (acc, step) => {
      const [, turn, steps] = STEP_REGEX.exec(step);
      const dir = nextDirection(acc.direction, turn);
      const pos = doStep(acc.position, dir, +steps);
      return {
        direction: dir,
        position: pos,
        visited: acc.visited.concat(allVisited(acc.position, pos)).concat(pos.join(",")),
      };
    },
    {
      direction: "N",
      position: [0, 0],
      visited: ["0,0"],
    }
  );

const manhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y);

fileToPuzzle(
  "day1-puzzle.txt",
  (puzzle) => {
    const walked = walk(puzzle);

    // Part 1
    console.log(manhattanDistance(walked.position));

    // Part 2
    const firstVisited = walked.visited.filter((vis, idx, arr) => arr.indexOf(vis) !== idx)[0];
    console.log(manhattanDistance(firstVisited.split(",").map(Number)));
  },
  {
    separator: ", ",
  }
);
