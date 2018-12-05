const { fileToPuzzle } = require("./util");

const isReaction = (a, b) => {
  let upper = a.toUpperCase();
  let lower = a.toLowerCase();
  return a === lower ? b === upper : b === lower;
};

const reactedPolymer = polymer => {
  for (let i = 0; i < polymer.length - 1; ) {
    if (isReaction(polymer[i], polymer[i + 1])) {
      polymer.splice(i, 2);
      i--;
    } else {
      i++;
    }
  }
  return polymer;
};

fileToPuzzle("./day5-puzzle.txt", puzzle => {
  let polymer = puzzle[0].split("");

  // Part 1
  console.log(reactedPolymer(polymer).length);

  // Part 2
  const unitsToTest = polymer.reduce(
    (acc, c) =>
      acc.indexOf(c.toUpperCase()) < 0 ? acc.concat(c.toUpperCase()) : acc,
    []
  );
  let lowest;
  unitsToTest.forEach(unit => {
    const polymerWithoutUnit = polymer.filter(u => u.toUpperCase() !== unit);
    const reactedLength = reactedPolymer(polymerWithoutUnit).length;
    lowest = !lowest ? reactedLength : reactedLength < lowest ? reactedLength : lowest;
  });
  console.log(lowest);
});
