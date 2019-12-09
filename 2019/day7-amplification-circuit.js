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
    list[posA] = input.shift();
    return runIntCode(list, pos + 2, input, output);
  } else if (op === 4) {
    if (typeof output === "function") {
      const newOutput = output(pos + 2);
      newOutput.o.push(paramA);
      return runIntCode(newOutput.l, newOutput.p, newOutput.o, output);
    } else {
      return runIntCode(list, pos + 2, input, paramA);
    }
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
    if (typeof output === "function") {
      return input.pop();
    }
    return output;
  }
  throw new Error("UNKOWN OPERATION " + op);
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
    { l: list.slice(), p: 0, o: [a, input] },
    { l: list.slice(), p: 0, o: [b] },
    { l: list.slice(), p: 0, o: [c] },
    { l: list.slice(), p: 0, o: [d] },
    { l: list.slice(), p: 0, o: [e] }
  ];
  let currAmplifier = 0;
  const toOutput = pos => {
    amplifiers[currAmplifier].p = pos;
    amplifiers[currAmplifier].phase = null;
    currAmplifier = (currAmplifier + 1) % amplifiers.length;
    return amplifiers[currAmplifier];
  };
  return runIntCode(
    amplifiers[currAmplifier].l,
    amplifiers[currAmplifier].p,
    amplifiers[currAmplifier].o,
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
