const { fileToPuzzle } = require("./util");

const isValid = (number, numbers) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === number) {
        return true;
      }
    }
  }
  return false;
};

const findFirstInvalid = (numbers) => {
  let startIdx = 0;
  let endIdx = 25;
  while (true) {
    const number = numbers[endIdx];
    const numbersToCheck = numbers.slice(startIdx, endIdx);
    if (!isValid(number, numbersToCheck)) {
      return { number, idx: endIdx };
    }
    startIdx++;
    endIdx++;
  }
};

const sumNumbers = (numbers) => numbers.reduce((result, c) => result + c, 0);
const findMin = (numbers) => numbers.reduce((min, c) => (c < min ? c : min), Number.MAX_SAFE_INTEGER);
const findMax = (numbers) => numbers.reduce((max, c) => (c > max ? c : max), 0);

const findContiguosSum = (goal, numbers) => {
  for (let idx = 0; idx < numbers.length; idx++) {
    let endIdx, sum, currNumbers;
    for (endIdx = idx + 1, sum = 0, currNumbers = []; sum < goal; sum = sumNumbers(currNumbers), endIdx++) {
      currNumbers = numbers.slice(idx, endIdx);
    }
    if (sum === goal) {
      return currNumbers;
    }
  }
  return [];
};

fileToPuzzle(
  "day9-puzzle.txt",
  (puzzle) => {
    // Part 1
    const firstInvalidNumber = findFirstInvalid(puzzle);
    console.log(firstInvalidNumber.number);

    // Part 2
    const contiguosSum = findContiguosSum(firstInvalidNumber.number, puzzle.slice(0, firstInvalidNumber.idx));
    console.log(findMin(contiguosSum) + findMax(contiguosSum));
  },
  {
    isNumber: true,
  }
);
