const { fileToPuzzle } = require("./util");

const runIntCode = (noun, verb, list) => {
  list[1] = noun;
  list[2] = verb;

  for (let i = 0; i < list.length; i = i + 4) {
    const op = list[i];
    const posA = list[i + 1];
    const posB = list[i + 2];
    const resPos = list[i + 3];
    if (op === 1) {
      list[resPos] = list[posA] + list[posB];
    } else if (op === 2) {
      list[resPos] = list[posA] * list[posB];
    } else if (op === 99) {
      break;
    } else {
      throw new Error("UNKOWN OPERATION " + op);
    }
  }
  return list;
};

fileToPuzzle(
  "day2-puzzle.txt",
  list => {
    const part1 = runIntCode(12, 2, list.slice());
    console.log(part1[0]);

    const wantedOutput = 19690720;
    nounLoop: for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const result = runIntCode(i, j, list.slice());
        if (result[0] === wantedOutput) {
          console.log(i * 100 + j);
          break nounLoop;
        }
      }
    }
  },
  { separator: ",", isNumber: true }
);
