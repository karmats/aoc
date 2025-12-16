import { fileToPuzzle } from "./util.mjs";

const isInvalidNumber = (number, checkSequence) => {
  const numberString = number.toString();
  let isInvalid = false;
  if (numberString.length % 2 === 0) {
    isInvalid = numberString.substring(0, numberString.length / 2) === numberString.substring(numberString.length / 2);
  }
  if (checkSequence && !isInvalid) {
    for (let i = 1; i <= numberString.length; i++) {
      if (numberString.length % i === 0) {
        const parts = [];
        for (let j = 0; j < numberString.length; j += i) {
          parts.push(numberString.slice(j, j + i));
        }
        if (parts.length > 1 && parts.every((part) => part === parts[0])) {
          return true;
        }
      }
    }
  }
  return isInvalid;
};
const getInvalidNumbers = (range, checkSequence = false) => {
  const [from, to] = range;
  const invalidNumbers = [];
  for (let i = from; i <= to; i++) {
    if (isInvalidNumber(i, checkSequence)) {
      invalidNumbers.push(i);
    }
  }
  return invalidNumbers;
};
fileToPuzzle(
  "day2-puzzle.txt",
  (puzzle) => {
    const ranges = puzzle.map((c) => c.split("-").map(Number));
    const invalidNumbers = ranges.flatMap((range) => getInvalidNumbers(range));

    // Part 1
    console.log(invalidNumbers.reduce((sum, n) => sum + n, 0));

    // Part 2
    const invalidNumbers2 = ranges.flatMap((range) => getInvalidNumbers(range, true));
    // console.log(invalidNumbers2);
    console.log(invalidNumbers2.reduce((sum, n) => sum + n, 0));
  },
  { separator: "," }
);
