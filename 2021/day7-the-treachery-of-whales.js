const { fileToPuzzle, findMax, calculatePartialSum } = require("./util");

const calculateFuel = (position, positions) => positions.reduce((fuels, pos) => fuels + Math.abs(position - pos), 0);
const calculateFuelWithBurn = (position, positions) =>
  positions.reduce((fuels, pos) => fuels + calculatePartialSum(Math.abs(position - pos)), 0);

fileToPuzzle(
  "day7-puzzle.txt",
  (puzzle) => {
    const max = findMax(puzzle);
    let minFuels = Number.MAX_SAFE_INTEGER;
    let minFulesWithBurn = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i <= max; i++) {
      const fuels = calculateFuel(i, puzzle);
      if (fuels < minFuels) {
        minFuels = fuels;
      }
      const fuelsWithBurn = calculateFuelWithBurn(i, puzzle);
      if (fuelsWithBurn < minFulesWithBurn) {
        minFulesWithBurn = fuelsWithBurn;
      }
    }
    // Part 1
    console.log(minFuels);

    // Part2
    console.log(minFulesWithBurn);
  },
  { isNumber: true, separator: "," }
);
