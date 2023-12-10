import { fileToPuzzle } from "./util.mjs";

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

  let currentPosition = "AAA";
  for (let steps = 0; ; steps++) {
    const idx = steps % instructions.length;
    const direction = instructions[idx];
    currentPosition = direction === "L" ? map[currentPosition][0] : map[currentPosition][1];
    if (currentPosition === "ZZZ") {
      console.log(steps + 1);
      break;
    }
  }
});
