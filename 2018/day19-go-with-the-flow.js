const { fileToPuzzle } = require("./util");

const doInstruction = (instruction, register, input) => {
  const valueA = input[0];
  const valueB = input[1];
  const outputResultIdx = input[2];
  const registerA = register[valueA];
  const registerB = register[valueB];
  let result;
  switch (instruction) {
    case "addr":
      result = registerA + registerB;
      break;
    case "addi":
      result = registerA + valueB;
      break;
    case "mulr":
      result = registerA * registerB;
      break;
    case "muli":
      result = registerA * valueB;
      break;
    case "banr":
      result = registerA & registerB;
      break;
    case "bani":
      result = registerA & valueB;
      break;
    case "borr":
      result = registerA | registerB;
      break;
    case "bori":
      result = registerA | valueB;
      break;
    case "setr":
      result = registerA;
      break;
    case "seti":
      result = valueA;
      break;
    case "gtir":
      result = valueA > registerB ? 1 : 0;
      break;
    case "gtri":
      result = registerA > valueB ? 1 : 0;
      break;
    case "gtrr":
      result = registerA > registerB ? 1 : 0;
      break;
    case "eqir":
      result = valueA === registerB ? 1 : 0;
      break;
    case "eqri":
      result = registerA === valueB ? 1 : 0;
      break;
    case "eqrr":
      result = registerA === registerB ? 1 : 0;
      break;
    default:
      console.log("WTF!?", instruction);
      break;
  }
  const res = register.slice();
  res[outputResultIdx] = result;
  return res;
};

fileToPuzzle("./day19-puzzle.txt", puzzle => {
  const ip = +/#ip\s(\d)/.exec(puzzle.shift())[1];
  const instructions = puzzle.map(p => {
    const splitted = p.split(" ");
    return {
      ip,
      instruction: splitted[0],
      register: [+splitted[1], +splitted[2], +splitted[3]]
    };
  });
  let input = [instructions[0].ip, 0, 0, 0, 0, 0];
  while (true) {
    const ip = input[0];
    const operation = instructions[ip];
    input = doInstruction(operation.instruction, input, operation.register);
    if (input.length > 6) {
        console.log('wtf', input);
    }
    if (input[0] + 1 >= instructions.length) {
        console.log(input);
      console.log(input[0]);
      break;
    }
    input[0]++;
  }
});
