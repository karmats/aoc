const { fileToPuzzle } = require("./util");

const NAUGHTY_STRINGS = ["ab", "cd", "pq", "xy"];
const VOWELS = "aeiou";

const isNice = (name) => {
  if (NAUGHTY_STRINGS.some((n) => name.includes(n))) {
    return false;
  }
  let lastChar = "";
  let vowelsCount = 0;
  let containsDouble = false;
  for (let i = 0; i < name.length; i++) {
    const currChar = name[i];
    if (currChar === lastChar) {
      containsDouble = true;
    }
    if (VOWELS.includes(currChar)) {
      vowelsCount++;
    }
    lastChar = currChar;
  }
  return vowelsCount >= 3 && containsDouble;
};

const isNiceImproved = (name) => {
  let oneLetterApart = false;
  let appearsTwice = false;
  for (let i = 0; i < name.length; i++) {
    const currChar = name[i];
    const nextChar = name[i + 1];
    if (name.slice(i + 2).includes(currChar + nextChar)) {
      appearsTwice = true;
    }
    if (currChar === name[i + 2]) {
      oneLetterApart = true;
    }
  }
  return oneLetterApart && appearsTwice;
};

fileToPuzzle("day5-puzzle.txt", (puzzle) => {
  console.log(puzzle.filter(isNice).length);
  console.log(puzzle.filter(isNiceImproved).length);
});
