const { fileToPuzzle, sum } = require("./util");

const countAges = (ages, age) => ages.filter((a) => age === a).length;

const doCycles = (days, ages) => {
  let fishAges = [];
  for (let age = 0; age <= 8; age++) {
    fishAges.push(countAges(ages, age));
  }
  for (let i = 0; i < days; i++) {
    const fishReady = fishAges[0];
    for (let j = 0; j < fishAges.length - 1; j++) {
      fishAges[j] = fishAges[j + 1];
    }
    fishAges[fishAges.length - 1] = fishReady;
    fishAges[6] = fishAges[6] + fishReady;
  }
  return fishAges;
};

fileToPuzzle(
  "day6-puzzle.txt",
  (puzzle) => {
    // Part 1
    console.log(sum(doCycles(80, puzzle)));
    // Part 2
    console.log(sum(doCycles(256, puzzle)));
  },
  {
    separator: ",",
    isNumber: true,
  }
);
