const { fileToPuzzle, leftPad } = require("./util");

const runIntCode = (list, pos, input, toOutput) => {
  let output;
  while (true) {
    const opCode = leftPad(list[pos] + "", 4);
    const op = +opCode.slice(2);
    const modeParamA = +opCode[1];
    const modeParamB = +opCode[0];
    const posA = list[pos + 1];
    const posB = list[pos + 2];
    const paramA = modeParamA === 1 ? posA : list[posA];
    const paramB = modeParamB === 1 ? posB : list[posB];
    const resPos = list[pos + 3];
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
        list[posA] = input.shift();
        pos = pos + 2;
        break;
      case 4:
        output = paramA;
        pos = pos + 2;
        if (toOutput) {
          const out = toOutput(pos);
          out.inputs.push(output);
          return runIntCode(out.l, out.pos, out.inputs, toOutput);
        }
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
      case 99:
        if (input.length) {
          return input.pop();
        }
        return output;
      default:
        throw new Error("UNKOWN OPERATION " + op);
    }
  }
};

const combinations = array => {
  const combination = (arr, temp) => {
    if (!arr.length) {
      result.push(temp);
    }
    for (let i = 0; i < arr.length; i++) {
      const x = arr.splice(i, 1)[0];
      combination(arr, temp.concat(x));
      arr.splice(i, 0, x);
    }
  };

  var result = [];
  combination(array, []);
  return result;
};

const runSequence = (list, input, [a, b, c, d, e]) => {
  const outputA = runIntCode(list.slice(), 0, [a, input]);
  const outputB = runIntCode(list.slice(), 0, [b, outputA]);
  const outputC = runIntCode(list.slice(), 0, [c, outputB]);
  const outputD = runIntCode(list.slice(), 0, [d, outputC]);
  return runIntCode(list.slice(), 0, [e, outputD]);
};

const runLoop = (list, input, [a, b, c, d, e]) => {
  const amplifiers = [
    { l: list.slice(), pos: 0, inputs: [a, input] },
    { l: list.slice(), pos: 0, inputs: [b] },
    { l: list.slice(), pos: 0, inputs: [c] },
    { l: list.slice(), pos: 0, inputs: [d] },
    { l: list.slice(), pos: 0, inputs: [e] }
  ];
  let currAmplifier = 0;
  const toOutput = pos => {
    amplifiers[currAmplifier].pos = pos;
    currAmplifier = (currAmplifier + 1) % amplifiers.length;
    return amplifiers[currAmplifier];
  };
  return runIntCode(
    amplifiers[currAmplifier].l,
    amplifiers[currAmplifier].pos,
    amplifiers[currAmplifier].inputs,
    toOutput
  );
};

fileToPuzzle(
  "day7-puzzle.txt",
  puzzle => {
    // Part 1
    const combs1 = combinations([0, 1, 2, 3, 4]);
    let maxPart1 = 0;
    combs1.forEach(comb => {
      const signal = runSequence(puzzle.slice(), 0, comb);
      if (signal > maxPart1) {
        maxPart1 = signal;
      }
    });
    console.log(maxPart1);

    // Part 2
    const combs2 = combinations([5, 6, 7, 8, 9]);
    let maxPart2 = 0;
    combs2.forEach(comb => {
      const signal = runLoop(puzzle.slice(), 0, comb);
      if (signal > maxPart2) {
        maxPart2 = signal;
      }
    });

    console.log(maxPart2);
  },
  { separator: ",", isNumber: true }
);
