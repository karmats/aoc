const { fileToPuzzle } = require("./util");

const regex = /(L|R|D|U)(\d*)/;

const createEmptyMap = size => new Array(size).fill(null);
const getCoords = (currentCoord, steps, direction, totalSteps) => {
  switch (direction) {
    case "L":
      return createEmptyMap(+steps).map((_, idx) => ({
        x: currentCoord.x - (idx + 1),
        y: currentCoord.y,
        totalSteps: totalSteps + idx + 1
      }));
    case "R":
      return createEmptyMap(+steps).map((_, idx) => ({
        x: currentCoord.x + (idx + 1),
        y: currentCoord.y,
        totalSteps: totalSteps + idx + 1
      }));
    case "U":
      return createEmptyMap(+steps).map((_, idx) => ({
        x: currentCoord.x,
        y: currentCoord.y + (idx + 1),
        totalSteps: totalSteps + idx + 1
      }));
    case "D":
      return createEmptyMap(+steps).map((_, idx) => ({
        x: currentCoord.x,
        y: currentCoord.y - (idx + 1),
        totalSteps: totalSteps + idx + 1
      }));
    default:
      throw new Error(`Unknown direction '${direction}'`);
  }
};
const spannedCoordinates = wire =>
  wire.reduce(
    (acc, c) => {
      const regexResult = regex.exec(c);
      const direction = regexResult[1];
      const steps = regexResult[2];
      const newCoords = getCoords(
        acc.currentCoord,
        steps,
        direction,
        acc.totalSteps
      );
      return {
        currentCoord: newCoords[newCoords.length - 1],
        coords: acc.coords.concat(newCoords),
        totalSteps: acc.totalSteps + +steps
      };
    },
    {
      currentCoord: { x: 0, y: 0, steps: 0 },
      coords: [],
      totalSteps: 0
    }
  );
const findIntersectionPoints = (arr1, arr2) =>
  arr1.reduce((acc, c) => {
    const match = arr2.find(a => a.x === c.x && a.y === c.y);
    if (match) {
      return acc.concat({
        x: match.x,
        y: match.y,
        steps: c.totalSteps + match.totalSteps
      });
    }
    return acc;
  }, []);
const manhattanDistance = coord => Math.abs(coord.x) + Math.abs(coord.y);
fileToPuzzle("day3-puzzle.txt", puzzle => {
  const wire1 = puzzle[0].split(",");
  const wire2 = puzzle[1].split(",");
  const wire1Coords = spannedCoordinates(wire1).coords;
  const wire2Coords = spannedCoordinates(wire2).coords;
  const result = findIntersectionPoints(wire1Coords, wire2Coords).reduce(
    (acc, c) => {
      const distance = manhattanDistance(c);
      let minDistance = acc.minDistance;
      let minSteps = acc.minSteps;
      if (acc.minDistance === null || distance < acc.minDistance) {
        minDistance = distance;
      }
      if (acc.minSteps === null || c.steps < acc.minSteps) {
        minSteps = c.steps;
      }
      return {
        minDistance: minDistance,
        coord: c,
        minSteps: minSteps
      };
    },
    {
      minDistance: null,
      minSteps: null,
      coord: null
    }
  );
  console.log(result.minDistance);
  console.log(result.minSteps);
});
