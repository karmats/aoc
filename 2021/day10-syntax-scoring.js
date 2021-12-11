const { fileToPuzzle } = require("./util");

const START_CHARS = "([{<";
const MATCHING_CHARS = ["()", "[]", "{}", "<>"];

const getFirstIllegalOrMissing = (chunk) => {
  const startChars = [];
  for (let i = 0; i < chunk.length; i++) {
    const char = chunk[i];
    if (START_CHARS.indexOf(char) >= 0) {
      startChars.push(char);
    } else {
      const matching = startChars.pop() + char;
      if (MATCHING_CHARS.indexOf(matching) < 0) {
        return char;
      }
    }
  }
  return startChars;
};

const calculateAutocompleteScore = (chars) =>
  chars.reduce((total, c) => {
    let extra = START_CHARS.indexOf(c) + 1;
    return total * 5 + extra;
  }, 0);

fileToPuzzle("day10-puzzle.txt", (puzzle) => {
  let points = 0;
  let notCorrupt = [];
  puzzle.forEach((chunk) => {
    const illegalOrMissing = getFirstIllegalOrMissing(chunk);
    if (typeof illegalOrMissing === "string") {
      switch (illegalOrMissing) {
        case ")":
          points += 3;
          break;
        case "]":
          points += 57;
          break;
        case "}":
          points += 1197;
          break;
        case ">":
          points += 25137;
          break;
        default:
          throw new Error(`Unknown illegal char '${illegalOrMissing}'`);
      }
    } else {
      notCorrupt.push(illegalOrMissing);
    }
  });
  // Part 1
  console.log(points);

  // Part 2
  notCorrupt = notCorrupt.map((c) => c.reverse());
  const scores = [];
  notCorrupt.forEach((c) => {
    scores.push(calculateAutocompleteScore(c));
  });
  const middle = Math.floor(scores.length / 2);
  console.log(scores.sort((a, b) => a - b)[middle]);
});
