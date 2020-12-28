const { fileToPuzzle } = require("./util");

const SUBJECT_NUMBER = 7;
const REMAINDER = 20201227;

const calculateEncryptionKey = (subjectNumber, loopSize) => {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = (value * subjectNumber) % REMAINDER;
  }
  return value;
};

const calculateLoopSize = (key) => {
  let value = 1;
  for (let loopSize = 1; value !== key; loopSize++) {
    value = (value * SUBJECT_NUMBER) % REMAINDER;
    if (value === key) {
      return loopSize;
    }
  }
};

fileToPuzzle(
  "day25-puzzle.txt",
  (puzzle) => {
    const cardKey = puzzle[0];
    const doorKey = puzzle[1];
    const cardLoopSize = calculateLoopSize(cardKey);
    const doorLoopSize = calculateLoopSize(doorKey);

    // Part 1
    console.log(calculateEncryptionKey(cardKey, doorLoopSize));
    console.log(calculateEncryptionKey(doorKey, cardLoopSize));

    // Part 2 :O
  },
  {
    isNumber: true,
  }
);
