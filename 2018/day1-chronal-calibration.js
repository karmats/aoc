const { fileToPuzzle } = require("./util");

const sum = numbers =>
  numbers.reduce((result, number) => parseInt(number) + result, 0);

fileToPuzzle("day1-puzzle.txt", puzzle => {
  // Part 1
  console.log(sum(puzzle));

  // Part 2
  const frequencies = [];
  let currFrequency = 0;
  for (let i = 0; ; i++) {
    currFrequency += parseInt(puzzle[i % puzzle.length]);
    if (frequencies.indexOf(currFrequency) >= 0) {
      console.log(currFrequency);
      break;
    }
    frequencies.push(currFrequency);
  }
});
