const { fileToPuzzle, sum } = require("./util");

const charScore = (char) => {
  if (char.toUpperCase() === char) {
    return char.charCodeAt(0) - 38;
  }
  return char.charCodeAt(0) - 96;
};

const getRucksackScore = (compartments) => {
  const splitIdx = compartments.length / 2;
  const [c1, c2] = [compartments.substring(0, splitIdx), compartments.substring(splitIdx, compartments.length)];
  for (let i = 0; i < c1.length; i++) {
    const char = c1[i];
    if (c2.includes(char)) {
      return charScore(char);
    }
  }
  throw new Error("Found no common letters");
};

const getStickerEfforts = (compartments) => {
  const stickers = [];
  for (let i = 0; i < compartments.length; i += 3) {
    const first = compartments[i];
    const second = compartments[i + 1];
    const third = compartments[i + 2];
    for (let i = 0; i < first.length; i++) {
      const char = first[i];
      if (second.includes(char) && third.includes(char)) {
        stickers.push(charScore(char));
        break;
      }
    }
  }
  return stickers;
};

fileToPuzzle("day3-puzzle.txt", (puzzle) => {
  // Part 1
  const scores = puzzle.map(getRucksackScore);
  console.log(sum(scores));

  // Part 2
  const stickers = getStickerEfforts(puzzle);
  console.log(sum(stickers));
});
