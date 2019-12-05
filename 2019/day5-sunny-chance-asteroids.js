const { fileToPuzzle, leftPad } = require("./util");

const runIntCode = (list, pos, input, output) => {
  const opCode = leftPad(list[pos] + "", 4);
  const op = +opCode.slice(2);
  const modeParamA = +opCode[1];
  const modeParamB = +opCode[0];
  const paramA = list[pos + 1];
  const paramB = list[pos + 2];
  const resPos = list[pos + 3];
  if (op === 1) {
    list[resPos] =
      (modeParamA === 1 ? paramA : list[paramA]) +
      (modeParamB === 1 ? paramB : list[paramB]);
    return runIntCode(list, pos + 4, input, output);
  } else if (op === 2) {
    list[resPos] =
      (modeParamA === 1 ? paramA : list[paramA]) *
      (modeParamB === 1 ? paramB : list[paramB]);
    return runIntCode(list, pos + 4, input, output);
  } else if (op === 3) {
    list[paramA] = input;
    return runIntCode(list, pos + 2, input, output);
  } else if (op === 4) {
    const newOutput = modeParamA === 1 ? paramA : list[paramA];
    return runIntCode(list, pos + 2, input, newOutput);
  } else if (op === 99) {
    return output;
  }
  throw new Error("UNKOWN OPERATION " + op);
};

fileToPuzzle(
  "day5-puzzle.txt",
  puzzle => {
    console.log(runIntCode(puzzle, 0, 1));
  },
  { separator: ",", isNumber: true }
);
