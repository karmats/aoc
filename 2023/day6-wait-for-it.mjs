import { fileToPuzzle, isNumber } from "./util.mjs";

const toNumbers = (str) =>
  str
    .split(" ")
    .filter((s) => !!s && isNumber(s))
    .map(Number);
fileToPuzzle("day6-puzzle.txt", (puzzle) => {
  // Part 1
  const [times, recordDistances] = [toNumbers(puzzle[0]), toNumbers(puzzle[1])];
  const winWays = [];
  times.forEach((time, idx) => {
    let wins = 0;
    for (let i = 1; i < time; i++) {
      const distance = (time - i) * i;
      if (distance > recordDistances[idx]) {
        wins++;
      }
    }
    winWays.push(wins);
  });
  console.log(winWays.reduce((acc, c) => acc * c, 1));

  // Part 2
  const [time2, recordDistance2] = [+times.join(""), +recordDistances.join("")];
  let wins = 0;
  for (let i = 1; i < time2; i++) {
    const distance = (time2 - i) * i;
    if (distance > recordDistance2) {
      wins++;
    }
  }
  console.log(wins);
});
