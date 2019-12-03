const { fileToPuzzle } = require("./util");

const regex = /(L|R|D|U)(\d*)/;

const createEmptyMap = size => {
  let res = [];
  for (let i = 0; i < size; i++) {
    res[i] = null;
  }
  return res;
};
const getCoords = (currentCoord, steps, direction) => {
  switch (direction) {
    case "L":
      return createEmptyMap(steps).map((_, idx) => ({
        x: currentCoord.x - (idx + 1),
        y: currentCoord.y
      }));
    case "R":
      return createEmptyMap(steps).map((_, idx) => ({
        x: currentCoord.x + (idx + 1),
        y: currentCoord.y
      }));
    case "U":
      return createEmptyMap(steps).map((_, idx) => ({
        x: currentCoord.x,
        y: currentCoord.y + (idx + 1)
      }));
    case "D":
      return createEmptyMap(steps).map((_, idx) => ({
        x: currentCoord.x,
        y: currentCoord.y - (idx + 1)
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
      const newCoords = getCoords(acc.currentCoord, steps, direction);
      return {
        currentCoord: newCoords[newCoords.length - 1],
        coords: acc.coords.concat(newCoords)
      };
    },
    {
      currentCoord: { x: 0, y: 0 },
      coords: []
    }
  );
const findIntersectionPoints = (arr1, arr2) =>
  arr1.filter(a1 => arr2.find(a2 => a2.x === a1.x && a1.y === a2.y));
const manhattanDistance = coord => Math.abs(coord.x) + Math.abs(coord.y);
fileToPuzzle("day3-puzzle.txt", puzzle => {
  const wire1 = puzzle[0].split(",");
  const wire2 = puzzle[1].split(",");
  const wire1Coords = spannedCoordinates(wire1).coords;
  const wire2Coords = spannedCoordinates(wire2).coords;
  const result = findIntersectionPoints(wire1Coords, wire2Coords).reduce(
    (acc, c) => {
      const distance = manhattanDistance(c);
      if (acc.min === null || distance < acc.min) {
        return {
          min: distance,
          coord: c
        };
      }
      return acc;
    },
    {
      min: null,
      coord: null
    }
  );
  console.log(result.min);
});
