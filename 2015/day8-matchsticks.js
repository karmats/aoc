const { fileToPuzzle } = require("./util");

const countChars = (str) => str.length;
const countUnescapedChars = (str) => eval(str).length;
const countEscapedChars = (str) => JSON.stringify(str).length;

const countArray = (arr) => arr.reduce((acc, c) => acc + c, 0);

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(countArray(puzzle.map(countChars)) - countArray(puzzle.map(countUnescapedChars)));

  // Part 2
  console.log(countArray(puzzle.map(countEscapedChars)) - countArray(puzzle.map(countChars)));
});
