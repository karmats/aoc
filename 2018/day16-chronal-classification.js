const { fileToPuzzle } = require("./util");

const instructions = [
  "addr",
  "addi",
  "mulr",
  "muli",
  "banr",
  "bani",
  "borr",
  "bori",
  "setr",
  "seti",
  "gtir",
  "gtri",
  "gtrr",
  "eqir",
  "eqri",
  "eqrr"
];
const doInstruction = (instruction, register, input) => {
  const valueA = input[1];
  const valueB = input[2];
  const outputResultIdx = input[3];
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

const beforeRegex = /Before:\s*\[(.*)\]/;
const afterRegex = /After:\s*\[(.*)\]/;
fileToPuzzle("./day16-puzzle.txt", puzzle => {
  const operations = [];
  for (let i = 0; ; i = i + 4) {
    if (!puzzle[i]) {
      break;
    }
    const operation = {
      before: beforeRegex
        .exec(puzzle[i])[1]
        .split(", ")
        .map(p => +p),
      input: puzzle[i + 1].split(" ").map(p => +p),
      after: afterRegex
        .exec(puzzle[i + 2])[1]
        .split(", ")
        .map(p => +p)
    };
    operations.push(operation);
  }
  let threeOrMore = 0;
  operations.forEach(operation => {
    let count = 0;
    const after = operation.after.join("");
    instructions.forEach(i => {
      const output = doInstruction(i, operation.before, operation.input).join(
        ""
      );
      if (output === after) {
        count++;
      }
    });
    if (count >= 3) {
      threeOrMore++;
    }
  });
  console.log(threeOrMore);
});
