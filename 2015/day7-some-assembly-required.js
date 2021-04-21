const { fileToPuzzle } = require("./util");

const SIGNAL_REGEX = /^(\d*|[a-z]*)\s->\s([a-z]*)$/;
const BITWISE_REGEX = /^(\d*|[a-z]*)\s(AND|OR|LSHIFT|RSHIFT)\s(.*)\s->\s([a-z]*)$/;
const NOT_REGEX = /^NOT\s([a-z]*)\s->\s([a-z]*)$/;

const uint16 = (n) => n & 0xffff;

const doInt16Operation = (operation, a, b) => {
  switch (operation) {
    case "AND":
      return uint16(a & b);
    case "OR":
      return uint16(a | b);
    case "LSHIFT":
      return uint16(a << b);
    case "RSHIFT":
      return uint16(a >> b);
    case "NOT":
      return uint16(~a);
    default:
      throw new Error(`'${operation}' not supported`);
  }
};

const doAssembleCircuit = (instructions, circuit) => {
  let currInstructions = instructions.filter((instruction) => instruction.operation === "INPUT" && !isNaN(instruction.fromA));
  if (!currInstructions.length) {
    currInstructions = instructions.filter((instruction) => {
      const { operation, fromA, fromB } = instruction;
      if (operation === "INPUT" || operation === "NOT" || operation === "RSHIFT" || operation === "LSHIFT") {
        return circuit[fromA] !== undefined;
      }
      const a = isNaN(fromA) ? circuit[fromA] : +fromA;
      const b = isNaN(fromB) ? circuit[fromB] : +fromB;
      return a !== undefined && b !== undefined;
    });
  }
  if (!currInstructions.length) {
    return circuit;
  }
  return doAssembleCircuit(
    instructions.filter((instruction) => !currInstructions.includes(instruction)),
    doCircuit(currInstructions, circuit)
  );
};

const doCircuit = (instructions, circuit) => {
  instructions.forEach((instruction) => {
    const { operation, fromA, fromB, to } = instruction;
    switch (operation) {
      case "INPUT":
        if (isNaN(+fromA)) {
          circuit[to] = circuit[fromA];
        } else {
          circuit[to] = +fromA;
        }
        break;
      case "AND":
      case "OR":
        const a = isNaN(fromA) ? circuit[fromA] : +fromA;
        const b = isNaN(fromB) ? circuit[fromB] : +fromB;
        circuit[to] = doInt16Operation(operation, a, b);
        break;
      case "LSHIFT":
      case "RSHIFT":
        circuit[to] = doInt16Operation(operation, circuit[fromA], +fromB);
        break;
      case "NOT":
        circuit[to] = doInt16Operation(operation, circuit[fromA]);
        break;
      default:
        throw new Error(`'${operation}' not supported`);
    }
  });
  return circuit;
};

fileToPuzzle("day7-puzzle.txt", (puzzle) => {
  const instructions = puzzle.map((p) => {
    let regexRes = SIGNAL_REGEX.exec(p);
    if (regexRes) {
      return {
        operation: "INPUT",
        fromA: regexRes[1],
        to: regexRes[2],
      };
    }
    regexRes = BITWISE_REGEX.exec(p);
    if (regexRes) {
      const [, fromA, operation, fromB, to] = regexRes;
      return {
        operation,
        fromA,
        fromB,
        to,
      };
    }
    regexRes = NOT_REGEX.exec(p);
    if (regexRes) {
      return {
        operation: "NOT",
        fromA: regexRes[1],
        to: regexRes[2],
      };
    }
    throw new Error(`'${p}' didn't match any regex`);
  });

  // Part 1
  const valueAPart1 = doAssembleCircuit(instructions, {})["a"];
  console.log(valueAPart1);

  // Part 2
  const part2Instructions = instructions.map((instruction) =>
    instruction.to === "b" ? { ...instruction, fromA: valueAPart1 } : instruction
  );
  const valueAPart2 = doAssembleCircuit(part2Instructions, {})["a"];
  console.log(valueAPart2);
});
