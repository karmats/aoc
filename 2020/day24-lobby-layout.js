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
  return [horizontal, vertical].join(",");
};

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

fileToPuzzle("day24-puzzle.txt", (puzzle) => {
  console.log(calculateFlippedTiles(puzzle).length);
});
