const { fileToPuzzle } = require("./util");

const columnsToRows = (arrays) => {
  const result = [];
  arrays.forEach((str) => {
    for (let i = 0; i < str.length; i++) {
      result[i] = (result[i] || "") + str[i];
    }
  });
  return result;
};

const countChars = (str) =>
  str.split("").reduce(
    (counted, char) => ({
      ...counted,
      [char]: (counted[char] || 0) + 1,
    }),
    {}
  );

const findMostCommonChar = (counted) =>
  Object.keys(counted).reduce((mostCommon, c) => (counted[c] > (counted[mostCommon] || 0) ? c : mostCommon));
const findLeastCommonChar = (counted) =>
  Object.keys(counted).reduce((mostCommon, c) => (counted[c] < (counted[mostCommon] || Number.MAX_SAFE_INTEGER) ? c : mostCommon));

fileToPuzzle("day6-puzzle.txt", (puzzle) => {
  const counted = columnsToRows(puzzle).map(countChars);

  // Part 1
  console.log(counted.map(findMostCommonChar).join(""));
  // Part 2
  console.log(counted.map(findLeastCommonChar).join(""));
});
