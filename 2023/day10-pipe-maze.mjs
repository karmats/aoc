import { fileToPuzzle, printGrid } from "./util.mjs";

const SYMBOLS = {
  F: ["S", "E"],
  "-": ["E", "W"],
  7: ["W", "S"],
  "|": ["N", "S"],
  J: ["N", "W"],
  L: ["E", "N"],
};
const getEntryFromExit = (exit) => {
  switch (exit) {
    case "N":
      return "S";
    case "S":
      return "N";
    case "W":
      return "E";
    case "E":
      return "W";
    default:
      throw new Error(`Unknown exit: "${exit}"`);
  }
};
//const getNextDirection = (entry, symbol) => SYMBOLS[symbol]?.filter((s) => s !== entry).pop();
const getNextDirection = (currDirection, symbol) => {
  switch (symbol) {
    case "F":
      return currDirection === "N" ? "E" : "S";
    case "-":
      return currDirection;
    case "7":
      return currDirection === "E" ? "S" : "W";
    case "|":
      return currDirection;
    case "J":
      return currDirection === "E" ? "N" : "W";
    case "L":
      return currDirection === "S" ? "E" : "N";
    default:
      throw new Error(`Unexpected symbol "${symbol}"`);
  }
};
const doMove = (direction, position) => {
  const [y, x] = position;
  switch (direction) {
    case "N":
      return [y - 1, x];
    case "S":
      return [y + 1, x];
    case "W":
      return [y, x - 1];
    case "E":
      return [y, x + 1];
    default:
      throw new Error(`Unknown exit: "${exit}"`);
  }
};

fileToPuzzle("day10-puzzle.txt", (map) => {
  let animalPos = [];
  for (let i = 0; i < map.length; i++) {
    let animalIdx = map[i].indexOf("S");
    if (animalIdx >= 0) {
      animalPos = [i, animalIdx];
      break;
    }
  }
  let currDirection = "S";
  let currPosition = [animalPos[0], animalPos[1]];

  for (let steps = 0; ; steps++) {
    const [newY, newX] = doMove(currDirection, currPosition);
    if (newY === animalPos[0] && newX === animalPos[1]) {
      console.log(Math.ceil(steps / 2));
      break;
    }
    const symbol = map[newY][newX];
    currDirection = getNextDirection(currDirection, symbol);
    currPosition = [newY, newX];
  }
});
