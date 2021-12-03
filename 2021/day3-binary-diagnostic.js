const { fileToPuzzle } = require("./util");

const findMostCommon = (pos, binaries) => {
  const [ones, zeroes] = binaries.reduce((acc, c) => (c[pos] === "1" ? [acc[0] + 1, acc[1]] : [acc[0], acc[1] + 1]), [0, 0]);
  return ones >= zeroes ? "1" : "0";
};
const binariesToGammaEpsilon = (binaries) => {
  const binaryLength = binaries[0].length;
  let gamma = "";
  let epsilon = "";
  for (let p = 0; p < binaryLength; p++) {
    const mostCommon = findMostCommon(p, binaries);
    gamma += mostCommon;
    epsilon += mostCommon === "0" ? "1" : "0";
  }
  return [gamma, epsilon];
};

const findRating = (binaries, pos, type) => {
  if (binaries.length === 1) {
    return binaries[0];
  }
  const mostCommon = findMostCommon(pos, binaries);
  if (type === "oxygen") {
    return findRating(
      binaries.filter((b) => b[pos] === mostCommon),
      pos + 1,
      type
    );
  } else {
    return findRating(
      binaries.filter((b) => b[pos] !== mostCommon),
      pos + 1,
      type
    );
  }
};

fileToPuzzle("day3-puzzle.txt", (puzzle) => {
  // Part 1
  const [gamma, epsilon] = binariesToGammaEpsilon(puzzle);
  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

  // Part 2
  const [oxygen, co2] = [findRating(puzzle, 0, "oxygen"), findRating(puzzle, 0, "c02")];
  console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
});
