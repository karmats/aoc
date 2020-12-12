const { fileToPuzzle } = require("./util");

const STEP_REGEX = /^([A-Z])(\d*)$/;
const doStep = ([key, value], [x, y, direction]) => {
  switch (key) {
    case "N":
      return [x, y + value, direction];
    case "S":
      return [x, y - value, direction];
    case "E":
      return [x + value, y, direction];
    case "W":
      return [x - value, y, direction];
    case "L":
      const diff = direction - value;
      if (diff > 0) {
        return [x, y, diff];
      }
      return [x, y, 360 - (Math.abs(direction - value) % 360)];
    case "R":
      return [x, y, (direction + value) % 360];
    default:
      throw new Error(`WTF is ${key}`);
  }
};

const degreeToDirection = (degree) => {
  switch (degree) {
    case 0:
    case 360:
      return "N";
    case 90:
      return "E";
    case 180:
      return "S";
    case 270:
      return "W";
    default:
      throw new Error(`${degree} is not valid!`);
  }
};

const puzzleToSteps = (puzzle) =>
  puzzle.map((p) => {
    const regexResult = STEP_REGEX.exec(p);
    return [regexResult[1], +regexResult[2]];
  });
const makeStep = (pos, step) => {
  let s = step;
  if (step[0] === "F") {
    s = [degreeToDirection(pos[2]), step[1]];
  }
  return doStep(s, pos);
};

const rotateWaypoint = ([direction, degrees], position) => {
  const rotations = degrees / 90;
  let [x, y] = position;
  for (let i = 0; i < rotations; i++) {
    [x, y] = direction === "R" ? [y, -x] : [-y, x];
  }
  return [x, y];
};

const moveShip = (steps, [wX, wY], [sX, sY]) => [sX + wX * steps, sY + wY * steps];

const makeStepWithWaypoint = (positions, step) => {
  const [key, value] = step;
  if (key === "L" || key === "R") {
    return {
      ...positions,
      waypoint: rotateWaypoint(step, positions.waypoint),
    };
  } else if (key === "F") {
    return {
      ...positions,
      ship: moveShip(value, positions.waypoint, positions.ship),
    };
  }
  return {
    ...positions,
    waypoint: doStep(step, positions.waypoint),
  };
};

const manhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y);

fileToPuzzle("day12-puzzle.txt", (puzzle) => {
  const steps = puzzleToSteps(puzzle);

  // Part 1
  console.log(manhattanDistance(steps.reduce(makeStep, [0, 0, 90])));

  // Part 2
  console.log(manhattanDistance(steps.reduce(makeStepWithWaypoint, { waypoint: [10, 1], ship: [0, 0] }).ship));
});
