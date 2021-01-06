const { fileToPuzzle } = require("./util");

const KEY_PAD = ["123", "456", "789"];
const KEY_PAD_ADVANCED = ["  1  ", " 234 ", "56789", " ABC ", "  D  "];

const toKey = (key, fallback) => (key && key.trim().length ? key : fallback);

const doMove = (start, instruction, keyPad) => {
  let current = start;
  for (let i = 0; i < instruction.length; i++) {
    const [y, x] = keyPad.reduce((pos, key, yIdx) => {
      const xIdx = key.indexOf(current);
      if (xIdx >= 0) {
        return [yIdx, xIdx];
      }
      return pos;
    }, []);
    const move = instruction[i];
    switch (move) {
      case "U":
        current = y - 1 >= 0 ? toKey(keyPad[y - 1][x], current) : current;
        break;
      case "R":
        current = toKey(keyPad[y][x + 1], current);
        break;
      case "D":
        current = y + 1 < keyPad.length ? toKey(keyPad[y + 1][x], current) : current;
        break;
      case "L":
        current = toKey(keyPad[y][x - 1], current);
        break;
      default:
        throw new Error(`Unknown direction ${move}.`);
    }
  }
  return current;
};

const combinationsToNumbers = (instructions, keyPad) =>
  instructions.reduce(
    (acc, instruction) => {
      const move = doMove(acc.curr, instruction, keyPad);
      return {
        curr: move,
        combination: acc.combination.concat(move),
      };
    },
    { curr: "5", combination: [] }
  );

fileToPuzzle("day2-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(combinationsToNumbers(puzzle, KEY_PAD).combination.join(""));

  // Part 2
  console.log(combinationsToNumbers(puzzle, KEY_PAD_ADVANCED).combination.join(""));
});
