const { fileToPuzzle, leftPad } = require("./util");

const getParam = (list, mode, pos, relativeBase) => {
  switch (mode) {
    case 0:
      return list[pos];
    case 1:
      return pos;
    case 2:
      return list[pos + relativeBase];
    default:
      throw new Error("Unknow mode " + mode);
  }
};
const runIntCode = (list, input) => {
  let output;
  let relativeBase = 0;
  let pos = 0;
  while (true) {
    const opCode = leftPad(list[pos] + "", 5);
    const op = +opCode.slice(3);
    const modeParamA = +opCode[2];
    const modeParamB = +opCode[1];
    const modeParamC = +opCode[0];
    const posA = list[pos + 1];
    const posB = list[pos + 2];
    const paramA = getParam(list, modeParamA, posA, relativeBase) || 0;
    const paramB = getParam(list, modeParamB, posB, relativeBase) || 0;
    const resPos = list[pos + 3] + (modeParamC === 2 ? relativeBase : 0);

    switch (op) {
      case 1:
        list[resPos] = paramA + paramB;
        pos = pos + 4;
        break;
      case 2:
        list[resPos] = paramA * paramB;
        pos = pos + 4;
        break;
      case 3:
        list[posA + (modeParamA === 2 ? relativeBase : 0)] = input;
        pos = pos + 2;
        break;
      case 4:
        output = paramA;
        pos = pos + 2;
        break;
      case 5:
        pos = paramA !== 0 ? paramB : pos + 3;
        break;
      case 6:
        pos = paramA === 0 ? paramB : pos + 3;
        break;
      case 7:
        list[resPos] = paramA < paramB ? 1 : 0;
        pos = pos + 4;
        break;
      case 8:
        list[resPos] = paramA === paramB ? 1 : 0;
        pos = pos + 4;
        break;
      case 9:
        relativeBase += paramA;
        pos = pos + 2;
        break;
      case 99:
        if (input.length) {
          return input;
        }
        return output;
      default:
        throw new Error("UNKOWN OPERATION " + op);
    }
  }
};

fileToPuzzle(
  "day9-puzzle.txt",
  puzzle => {
    // Part 1
    console.log(runIntCode(puzzle.slice(), 1));
    // Part 2
    console.log(runIntCode(puzzle.slice(), 2));
  },
  {
    separator: ",",
    isNumber: true
  }
);
