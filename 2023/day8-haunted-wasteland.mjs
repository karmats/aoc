import { fileToPuzzle, findMin } from "./util.mjs";

const MAP_REGEX = /^([A-Z]{3})\s=\s\(([A-Z]{3}),\s([A-Z]{3})\)/;

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  const [instructions, ...mapArray] = puzzle;
  const map = mapArray.reduce((m, i) => {
    const regexResult = MAP_REGEX.exec(i);
    if (regexResult) {
      const [, from, left, right] = regexResult;
      m[from] = [left, right];
    }
    return m;
  }, {});

  const getSteps = (initialPosition = "AAA", checkOnlyLast = false) => {
    for (let steps = 0; ; steps++) {
      const idx = steps % instructions.length;
      const direction = instructions[idx];
      initialPosition = direction === "L" ? map[initialPosition][0] : map[initialPosition][1];
      if (checkOnlyLast ? initialPosition.endsWith("Z") : initialPosition === "ZZZ") {
        return steps + 1;
      }
    }
  };

  // Part 1
  console.log(getSteps());

  // Part 2
  let currentPositions = Object.keys(map).filter((a) => a.endsWith("A"));
  const minimumSteps = currentPositions.map((cp) => getSteps(cp, true));
  for (let i = findMin(minimumSteps); ; i++) {
    const nums = minimumSteps.map((s) => i % s);
    if (nums.every((n) => n === 0)) {
      console.log(i);
      break;
    }
  }
});
