import { fileToPuzzle } from "./util.mjs";

const MUL_REGEX = /(mul\(\d+,\d+\))/g;
const DO_REGEX = /(do\(\))/g;
const DONT_REGEX = /(don't\(\))/g;
fileToPuzzle("day3-puzzle.txt", (puzzle) => {
  const instruction = puzzle.reduce((acc, p) => acc + p);

  const mulInstructions = Array.from(instruction.matchAll(MUL_REGEX));

  const dontIndexes = [...instruction.matchAll(DONT_REGEX)].map((c) => c.index).sort((a, b) => a - b);
  const doIndexes = [...instruction.matchAll(DO_REGEX)].map((c) => c.index).sort((a, b) => a - b);
  const findClosesDoIndex = (index) => {
    for (let i = 0; i < doIndexes.length; i++) {
      const doIndex = doIndexes[i];
      if (doIndex > index) {
        return doIndex;
      }
    }
    return Number.MAX_SAFE_INTEGER;
  };
  const invalidRanges = dontIndexes.map((dontIndex) => {
    const doIndex = findClosesDoIndex(dontIndex);
    return [dontIndex, doIndex];
  });

  const isValidIndex = (index) => {
    for (let i = 0; i < invalidRanges.length; i++) {
      const [from, to] = invalidRanges[i];
      if (index > from && index < to) {
        return false;
      }
    }
    return true;
  };

  const mulInstructionsSum = (checkValid = false) =>
    mulInstructions.reduce((acc, c) => {
      const mulInstruction = c[0];
      if (checkValid && !isValidIndex(c.index)) {
        return acc;
      }
      const [a, b] = mulInstruction
        .substring(mulInstruction.indexOf("(") + 1, mulInstruction.length - 1)
        .split(",")
        .map(Number);
      return acc + Number(a) * Number(b);
    }, 0);

  // Part 1
  console.log(mulInstructionsSum());

  // Part 2
  console.log(mulInstructionsSum(true));
});
