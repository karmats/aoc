const { fileToPuzzle } = require("./util");

const joltDiffs = (adapters) =>
  adapters.reduce(
    (acc, c, idx, arr) => {
      const diff = arr[idx + 1] - c;
      if (isNaN(diff)) {
        return acc;
      }
      if (diff === 1) {
        return [acc[0] + 1, acc[1], acc[2]];
      } else if (diff === 2) {
        return [acc[0], acc[1] + 1, acc[2]];
      }
      return [acc[0], acc[1], acc[2] + 1];
    },
    [0, 0, 0]
  );

const possibleCombinations = (adapters) => {
  const combintations = [1];
  for (let idx = 0; idx < adapters.length; idx++) {
    for (nextIdx = idx + 1; adapters[nextIdx] <= adapters[idx] + 3; nextIdx++) {
      combintations[nextIdx] = (combintations[nextIdx] || 0) + combintations[idx];
    }
  }
  return combintations[adapters.length - 1];
};

const findMax = (numbers) => numbers.reduce((max, c) => (c > max ? c : max), 0);

fileToPuzzle(
  "day10-puzzle.txt",
  (puzzle) => {
    const adapters = puzzle.concat(0, findMax(puzzle) + 3).sort((a, b) => a - b);

    // Part 1
    const [ones, _, threes] = joltDiffs(adapters);
    console.log(ones * threes);

    // Part 2
    console.log(possibleCombinations(adapters));
  },
  {
    isNumber: true,
  }
);
