const { fileToPuzzle } = require("./util");

const PARTS = {
  ONE: "one",
  TWO: "two",
};

const getNei = (x, y, z, w) => {
  let arr = [];
  for (let xX = -1; xX <= 1; xX++) {
    for (let yY = -1; yY <= 1; yY++) {
      for (let zZ = -1; zZ <= 1; zZ++) {
        for (let wW = -1; wW <= 1; wW++) {
          x + xX == x && y + yY == y && z + zZ == z && w + wW == w
            ? undefined
            : arr.push(x + xX + "|" + (y + yY) + "|" + (z + zZ) + "|" + (w + wW));
        }
      }
    }
  }
  return arr;
};
const runProgram = (puzzle, part, originActives) => {
  let oldActives = [...originActives];
  let cycle = 0;
  let minZ = (minY = minX = -1);
  minW = part == PARTS.ONE ? 0 : -1;
  let maxZ = 1;
  maxW = part == PARTS.ONE ? 0 : 1;
  let maxX = puzzle[0].length;
  let maxY = puzzle.length;
  while (cycle < 6) {
    cycle++;
    let newActives = [];
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        for (let z = minZ; z <= maxZ; z++) {
          for (let w = minW; w <= maxW; w++) {
            let coord = x + "|" + y + "|" + z + "|" + w;
            let nei = getNei(x, y, z, w);
            let intersection = oldActives.filter((x) => nei.includes(x));
            oldActives.indexOf(coord) !== -1
              ? intersection.length == 3 || intersection.length == 2
                ? newActives.push(coord)
                : undefined
              : intersection.length == 3
              ? newActives.push(coord)
              : undefined;
          }
        }
      }
    }
    oldActives = newActives;
    if (part === PARTS.TWO) {
      minW -= 1;
      maxW += 1;
    }
    minZ -= 1;
    minY -= 1;
    minX -= 1;
    maxZ += 1;
    maxX += 1;
    maxY += 1;
    if (cycle == 6) {
      return newActives.length;
    }
  }
};

fileToPuzzle("day17-puzzle.txt", (puzzle) => {
  let actives = [];
  puzzle.forEach((line, y) => {
    line = line.split("");
    line.forEach((cube, x) => {
      cube == "#" ? actives.push(x + "|" + y + "|" + 0 + "|" + 0) : undefined;
    });
  });

  console.log(runProgram(puzzle, PARTS.ONE, actives));
  console.log(runProgram(puzzle, PARTS.TWO, actives));
});
