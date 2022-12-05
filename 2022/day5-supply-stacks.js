const { fileToPuzzle } = require("./util");

const CRATE_REGEX = /\[([A-Z])\]/g;
const MOVE_REGEX = /^move\s(\d*)\sfrom\s(\d*)\sto\s(\d*)$/;

const createCratesArray = (crateStrings) => {
  let match;
  const crates = [];
  crateStrings.forEach((crateString) => {
    do {
      match = CRATE_REGEX.exec(crateString);
      if (match) {
        crates[match.index] = crates[match.index] ? [...crates[match.index], match[1]] : [match[1]];
      }
    } while (match);
  });
  return crates.filter((c) => !!c);
};

const moveCrates = (crates, moveStrings, isMoveMultiple) => {
  moveStrings.forEach((moveString) => {
    const [, amount, from, to] = MOVE_REGEX.exec(moveString);
    const boxes = crates[+from - 1].splice(0, +amount);
    if (!isMoveMultiple) {
      boxes.reverse();
    }
    crates[+to - 1] = [...boxes, ...crates[+to - 1]];
  });
  return crates;
};

fileToPuzzle("day5-puzzle.txt", (puzzle) => {
  const cratesToIndex = puzzle.findIndex((p) => p === "");
  // Part 1
  let crates = createCratesArray(puzzle.slice(0, cratesToIndex));
  let movedCrates = moveCrates(crates, puzzle.slice(cratesToIndex + 1), false);
  console.log(movedCrates.reduce((p, c) => [...p, c[0]], []).join(""));

  // Part 2
  crates = createCratesArray(puzzle.slice(0, cratesToIndex));
  movedCrates = moveCrates(crates, puzzle.slice(cratesToIndex + 1), true);
  console.log(movedCrates.reduce((p, c) => [...p, c[0]], []).join(""));
});
