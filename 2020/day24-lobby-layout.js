const { fileToPuzzle } = require("./util");

const toTileId = (instruction) => {
  let [horizontal, vertical] = [0, 0];
  for (let i = 0; i < instruction.length; i++) {
    let direction = instruction[i];
    if (direction === "s" || direction === "n") {
      ++i;
      direction += instruction[i];
    }
    switch (direction) {
      case "ne":
        horizontal += 0.5;
        vertical += 0.5;
        break;
      case "e":
        horizontal += 1;
        break;
      case "se":
        horizontal += 0.5;
        vertical += -0.5;
        break;
      case "sw":
        horizontal += -0.5;
        vertical += -0.5;
        break;
      case "w":
        horizontal += -1;
        break;
      case "nw":
        horizontal += -0.5;
        vertical += 0.5;
        break;
      default:
        throw new Error("Unknown direction " + direction);
    }
  }
  return tileCoordToId([horizontal, vertical]);
};

const tileIdToCoord = (tileId) => tileId.split(",").map((t) => +t);
const tileCoordToId = (tileCoord) => tileCoord.join(",");

const calculateFlippedTiles = (instructions) => {
  let flipped = [];
  instructions.forEach((instruction) => {
    const tileId = toTileId(instruction);
    const tileIdx = flipped.indexOf(tileId);
    if (tileIdx >= 0) {
      flipped.splice(tileIdx, 1);
    } else {
      flipped.push(tileId);
    }
  });
  return flipped;
};

const findMax = (arr) => arr.reduce((max, c) => (c > max ? c : max), Number.MIN_SAFE_INTEGER);
const findMin = (arr) => arr.reduce((min, c) => (c < min ? c : min), Number.MAX_SAFE_INTEGER);
const getSurrounding = ([x, y]) => [
  tileCoordToId([x - 1, y]),
  tileCoordToId([x - 0.5, y + 0.5]),
  tileCoordToId([x + 0.5, y + 0.5]),
  tileCoordToId([x + 1, y]),
  tileCoordToId([x + 0.5, y - 0.5]),
  tileCoordToId([x - 0.5, y - 0.5]),
];
const countBlackTiles = (blacktTiles, tiles) => tiles.reduce((count, tile) => (blacktTiles.includes(tile) ? count + 1 : count), 0);
const flip = (tiles) => {
  const newTiles = [];

  const tileCoords = tiles.map(tileIdToCoord);
  const xArr = tileCoords.map((t) => t[0]);
  const [minX, maxX] = [findMin(xArr), findMax(xArr)];
  const yArr = tileCoords.map((t) => t[1]);
  const [minY, maxY] = [findMin(yArr), findMax(yArr)];
  for (let y = minY - 1; y <= maxY + 1; y += 0.5) {
    for (let x = minX - 1; x <= maxX + 1; x += 0.5) {
      const coord = [x, y];
      const id = tileCoordToId(coord);
      const isBlack = tiles.includes(id);
      const surrounding = getSurrounding(coord);
      const surroundingBlackTiles = countBlackTiles(tiles, surrounding);
      if (isBlack && (surroundingBlackTiles === 1 || surroundingBlackTiles === 2)) {
        newTiles.push(id);
      } else if (!isBlack && surroundingBlackTiles === 2) {
        newTiles.push(id);
      }
    }
  }
  return newTiles;
};

const flipTiles = (tiles, days) => {
  let flippedTiles = tiles.slice();
  for (let i = 0; i < days; i++) {
    flippedTiles = flip(flippedTiles);
  }
  return flippedTiles;
};

fileToPuzzle("day24-puzzle.txt", (puzzle) => {
  const flippedTiles = calculateFlippedTiles(puzzle);

  // Part 1
  console.log(flippedTiles.length);

  // Part 2
  console.log(flipTiles(flippedTiles, 100).length);
});
