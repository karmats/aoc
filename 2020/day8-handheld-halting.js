const { fileToPuzzle } = require("./util");

const INSTRUCTION_REGEX = /(.{3})\s([+|-]\d*)/;

const toInstructions = (puzzle) =>
  puzzle.map((p) => {
    const regexResult = INSTRUCTION_REGEX.exec(p);
    return [regexResult[1], +regexResult[2]];
  });

const getAccumulatorValue = (instructions) => {
  let acc = 0;
  let pos = 0;
  let visited = [];
  while (pos < instructions.length) {
    if (visited.includes(pos)) {
      return { infinite: true, acc };
    }
    visited.push(pos);
    const [operation, arg] = instructions[pos];
    switch (operation) {
      case "jmp":
        pos += arg;
        break;
      case "acc":
        acc += arg;
      case "nop":
        pos++;
        break;
      default:
        throw new Error(`WTF is ${operation}???`);
    }
  }
  return { infinite: false, acc };
};

const getNotInfiniteAccumolatorValue = (instructions) => {
  for (let i = 0; i < instructions.length; i++) {
    const [operation, arg] = instructions[i];
    if (operation === "jmp" || operation === "nop") {
      const newInstructions = instructions.slice();
      newInstructions[i] = [operation === "jmp" ? "nop" : "jmp", arg];
      const result = getAccumulatorValue(newInstructions);
      if (!result.infinite) {
        return result.acc;
      }
    }
  }
};
fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  const instructions = toInstructions(puzzle);

  // Part 1
  console.log(getAccumulatorValue(instructions).acc);

  // Part 2
  console.log(getNotInfiniteAccumolatorValue(instructions));
});
