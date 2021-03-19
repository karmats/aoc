const { fileToPuzzle } = require("./util");

const getLocationToId = (location) => location.join("_");

const getHousesVisited = (directionMap) =>
  directionMap.reduce(
    (result, direction) => {
      const [x, y] = result.current;
      let next;
      switch (direction) {
        case "^":
          next = [x, y + 1];
          break;
        case ">":
          next = [x + 1, y];
          break;
        case "v":
          next = [x, y - 1];
          break;
        case "<":
          next = [x - 1, y];
          break;
        default:
          throw new Error(`Unknown direction: '${direction}'`);
      }
      const nextId = getLocationToId(next);
      if (!result.visitedHouses.includes(nextId)) {
        return {
          current: next,
          visitedHouses: result.visitedHouses.concat(nextId),
        };
      }
      return {
        current: next,
        visitedHouses: result.visitedHouses,
      };
    },
    { current: [0, 0], visitedHouses: [getLocationToId([0, 0])] }
  );

fileToPuzzle(
  "day3-puzzle.txt",
  (puzzle) => {
    // Part 1
    console.log(getHousesVisited(puzzle).visitedHouses.length);

    // Part 2
    const santa = getHousesVisited(puzzle.filter((_, idx) => idx % 2 === 0));
    const roboSanta = getHousesVisited(puzzle.filter((_, idx) => idx % 2 !== 0));
    const allVisited = santa.visitedHouses.concat(roboSanta.visitedHouses.filter((h) => !santa.visitedHouses.includes(h)));
    console.log(allVisited.length);
  },
  {
    separator: "",
  }
);
