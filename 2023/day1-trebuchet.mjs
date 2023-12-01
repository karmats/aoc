import { fileToPuzzle } from "./util.mjs";

const NUMBER_STRINGS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const getDigits = (instruction) => {
  return instruction
    .split("")
    .map((i, idx) => (isNaN(Number(i)) ? null : { num: Number(i), idx }))
    .filter((i) => !!i);
};

fileToPuzzle("day1-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(
    puzzle.reduce((sum, instruction) => {
      const digigts = getDigits(instruction);
      return sum + +`${digigts[0].num}${digigts.pop().num}`;
    }, 0)
  );

  // Part 2
  console.log(
    puzzle.reduce((sum, instruction) => {
      const stringNumberIndexes = [];
      NUMBER_STRINGS.forEach((numberString) => {
        const [index1, index2] = [instruction.indexOf(numberString), instruction.lastIndexOf(numberString)];
        if (index1 !== -1) {
          stringNumberIndexes.push({ num: numberString, idx: index1 });
          if (index2 !== index1) {
            stringNumberIndexes.push({ num: numberString, idx: index2 });
          }
        }
      });
      const digits = stringNumberIndexes
        .concat(getDigits(instruction))
        .sort((a, b) => a.idx - b.idx)
        .map((i) => {
          if (typeof i.num === "number") {
            return i.num;
          }
          return NUMBER_STRINGS.indexOf(i.num) + 1;
        });
      return sum + +`${digits[0]}${digits.pop()}`;
    }, 0)
  );
});
