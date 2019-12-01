const { fileToPuzzle } = require("./util");

const calcFuel = mass => Math.floor(+mass / 3) - 2;
const calcPart2Fuel = (mass, acc) => {
  const fuel = calcFuel(mass);
  if (fuel <= 0) {
    return acc;
  }
  return calcPart2Fuel(fuel, acc + fuel);
};

fileToPuzzle("day1-puzzle.txt", masses => {
  // Part 1
  console.log(masses.reduce((acc, mass) => acc + calcFuel(mass), 0));
  // Part 2
  console.log(masses.reduce((acc, mass) => acc + calcPart2Fuel(mass, 0), 0));
});
