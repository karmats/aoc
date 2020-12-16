const { fileToPuzzle, leftPad } = require("./util");

const MASK_REGEX = /^mask\s=\s([01|X]*)$/;
const MEM_REGEX = /^mem\[(\d*)\]\s=\s(\d*)$/;

const toProgram = (p) => {
  const mask = MASK_REGEX.exec(p);
  if (mask) {
    return { mask: mask[1] };
  }
  const mem = MEM_REGEX.exec(p);
  return {
    mem: mem[1],
    value: mem[2],
  };
};

const applyMask = (mask, value, v2 = false) => {
  const binary = Number(value).toString(2);
  let result = "";
  let i, j;
  for (i = mask.length - 1, j = binary.length - 1; i >= 0; i--, j--) {
    if ((!v2 && mask[i] !== "X") || (v2 && (mask[i] === "X" || mask[i] === "1"))) {
      result = mask[i] + result;
    } else {
      result = (binary[j] || "0") + result;
    }
  }
  return result;
};

const execute = (program) =>
  program.reduce(
    (result, instruction) => {
      if (instruction.mask) {
        return {
          ...result,
          mask: instruction.mask,
        };
      }
      const { mem, value } = instruction;
      const afterMask = applyMask(result.mask, value);
      return {
        ...result,
        memory: {
          ...result.memory,
          [mem]: afterMask,
        },
      };
    },
    {
      mask: "",
      memory: {},
    }
  );

const replaceAtIndex = (str, index, replace) => str.substr(0, index) + replace + str.substr(index + replace.length);

const replaceXWith = (floating, xIdx, value) => {
  let result = floating;
  for (let i = 0; i < value.length; i++) {
    result = replaceAtIndex(result, xIdx[i], value[i]);
  }
  return parseInt(result, 2);
};

const getAllPossibleAdressess = (floating) => {
  const result = [];
  const xIdx = floating
    .split("")
    .map((f, idx) => (f === "X" ? idx : null))
    .filter((f) => f !== null);
  const possibilities = Math.pow(2, xIdx.length);
  const pad = Number(possibilities - 1).toString(2).length;
  for (let i = 0; i < possibilities; i++) {
    const replaceWith = Number(i).toString(2);
    result.push(replaceXWith(floating, xIdx, leftPad(replaceWith, pad)));
  }
  return result;
};

const executeV2 = (program) =>
  program.reduce(
    (result, instruction) => {
      if (instruction.mask) {
        return {
          ...result,
          mask: instruction.mask,
        };
      }
      const { mem, value } = instruction;
      const afterMask = applyMask(result.mask, mem, true);
      const possibleAdressess = getAllPossibleAdressess(afterMask);
      possibleAdressess.forEach((adress) => {
        result.memory[adress] = value;
      });
      return result;
    },
    {
      mask: "",
      memory: {},
    }
  );

const countMemory = (memory, radix = 2) => Object.keys(memory).reduce((sum, key) => sum + parseInt(memory[key], radix), 0);

fileToPuzzle("day14-puzzle.txt", (puzzle) => {
  const program = puzzle.map(toProgram);

  // Part 1
  const afterExecution = execute(program);
  const result = countMemory(afterExecution.memory);
  console.log(result);

  // Part 2
  const afterExecutionV2 = executeV2(program);
  console.log(countMemory(afterExecutionV2.memory, 10));
});
