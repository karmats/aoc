const fs = require("fs");

const sum = numbers =>
  numbers.reduce((result, number) => parseInt(number) + result, 0);

fs.readFile("day1-puzzle.txt", "utf-8", (_, data) => {
  const puzzle = data.split("\n");

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
