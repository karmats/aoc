const { fileToPuzzle } = require("./util");

const getType = (x, y, area) =>
  x >= 0 && x < area.length && y >= 0 && y < area.length && area[x][y];

const adjacent = (x, y, area) => {
  return [
    getType(x - 1, y, area),
    getType(x - 1, y - 1, area),
    getType(x, y - 1, area),
    getType(x + 1, y - 1, area),
    getType(x + 1, y, area),
    getType(x + 1, y + 1, area),
    getType(x, y + 1, area),
    getType(x - 1, y + 1, area)
  ];
};

const count = (types, what) =>
  types.reduce((acc, c) => (c === what ? acc + 1 : acc), 0);

const transform = (x, y, area) => {
  const type = getType(x, y, area);
  const adjacentTypes = adjacent(x, y, area);
  switch (type) {
    case ".":
      return count(adjacentTypes, "|") >= 3 ? "|" : ".";
    case "|":
      return count(adjacentTypes, "#") >= 3 ? "#" : "|";
    case "#":
      return count(adjacentTypes, "#") >= 1 && count(adjacentTypes, "|") >= 1
        ? "#"
        : ".";
      break;
    default:
      console.log("WTF!", type);
      return type;
  }
};

fileToPuzzle("./day18-puzzle.txt", puzzle => {
  const size = puzzle.length;
  let area = puzzle.map(p => p.split(""));
  for (let minute = 0; minute < 10; minute++) {
    let newArea = area.map(a => a.slice());
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        newArea[x][y] = transform(x, y, area);
      }
    }
    area = newArea;
  }
  console.log(
    area.reduce((acc, c) => acc + count(c, "|"), 0) *
      area.reduce((acc, c) => acc + count(c, "#"), 0)
  );
});
