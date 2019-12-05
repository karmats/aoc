const { fileToPuzzle, leftPad } = require("./util");

const runIntCode = (list, pos, input, output) => {
  const opCode = leftPad(list[pos] + "", 4);
  const op = +opCode.slice(2);
  const modeParamA = +opCode[1];
  const modeParamB = +opCode[0];
  const posA = list[pos + 1];
  const posB = list[pos + 2];
  const paramA = modeParamA === 1 ? posA : list[posA];
  const paramB = modeParamB === 1 ? posB : list[posB];
  const resPos = list[pos + 3];
  if (op === 1) {
    list[resPos] = paramA + paramB;
    return runIntCode(list, pos + 4, input, output);
  } else if (op === 2) {
    list[resPos] = paramA * paramB;
    return runIntCode(list, pos + 4, input, output);
  } else if (op === 3) {
    list[posA] = input;
    return runIntCode(list, pos + 2, input, output);
  } else if (op === 4) {
    return runIntCode(list, pos + 2, input, paramA);
  } else if (op === 5) {
    return runIntCode(list, paramA !== 0 ? paramB : pos + 3, input, output);
  } else if (op === 6) {
    return runIntCode(list, paramA === 0 ? paramB : pos + 3, input, output);
  } else if (op === 7) {
    list[resPos] = paramA < paramB ? 1 : 0;
    return runIntCode(list, pos + 4, input, output);
  } else if (op === 8) {
    list[resPos] = paramA === paramB ? 1 : 0;
    return runIntCode(list, pos + 4, input, output);
  } else if (op === 99) {
    return output;
  }
  throw new Error("UNKOWN OPERATION " + op);
};

fileToPuzzle(
  "day5-puzzle.txt",
  puzzle => {
    console.log(runIntCode(puzzle.slice(), 0, 1));
    console.log(runIntCode(puzzle.slice(), 0, 5));
  },
  { separator: ",", isNumber: true }
);
