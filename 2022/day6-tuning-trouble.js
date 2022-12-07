const { fileToPuzzle } = require("./util");

const isAllDifferent = (str) => str.split("").every((s, idx) => str.indexOf(s) === idx);

const findStartOfPacket = (sequence, length) => {
  for (let i = 0; i < sequence.length - length - 1; i++) {
    const marker = sequence.substring(i, i + length);
    if (isAllDifferent(marker)) {
      return i + length;
    }
  }
  throw new Error("Could not find start of packet");
};

fileToPuzzle("day6-puzzle.txt", (puzzle) => {
  const sequence = puzzle.join("");

  // Part 1
  console.log(findStartOfPacket(sequence, 4));

  // Part 2
  console.log(findStartOfPacket(sequence, 14));
});
