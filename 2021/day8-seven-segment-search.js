const { fileToPuzzle, sum } = require("./util");

const UNIQUE_NUMBER_LENGTH = [2, 3, 4, 7];
const LETTERS = ["a", "b", "c", "d", "e", "f", "g"];

const countUniqueOutputNumbers = (notes) =>
  notes.reduce((unique, note) => {
    const output = note[1].split(" ");
    return unique + output.reduce((count, o) => (UNIQUE_NUMBER_LENGTH.includes(o.length) ? count + 1 : count), 0);
  }, 0);

const analyzeNumber = (map, output) => {
  const translated = output
    .split("")
    .map((o) => map[o])
    .sort()
    .join("");
  switch (translated) {
    case "abcefg":
      return 0;
    case "cf":
      return 1;
    case "acdeg":
      return 2;
    case "acdfg":
      return 3;
    case "bcdf":
      return 4;
    case "abdfg":
      return 5;
    case "abdefg":
      return 6;
    case "acf":
      return 7;
    case "abcdefg":
      return 8;
    case "abcdfg":
      return 9;
    default:
      throw new Error(`Unknown number ${translated}`);
  }
};

const calculateNumber = (note) => {
  const [input, output] = note;
  const inputNumbers = input.split(" ");
  const [one, seven, four] = inputNumbers
    .filter((i) => i.length === 2 || i.length === 3 || i.length === 4)
    .map((i) => i.split(""))
    .sort((a, b) => a.length - b.length);
  const [a] = seven.filter((z) => one.indexOf(z) < 0);
  const [c, f] = inputNumbers.filter((i) => i.includes(one[0])).length === 8 ? one : one.reverse();
  const [eg, ge] = LETTERS.filter((l) => four.indexOf(l) < 0 && seven.indexOf(l) < 0);
  const [e, g] = inputNumbers.filter((i) => i.indexOf(eg) >= 0).length === 7 ? [ge, eg] : [eg, ge];
  const [d] = inputNumbers
    .filter((i) => i.length === 5 && [a, c, f, g].every((l) => i.indexOf(l) >= 0))
    .pop()
    .split("")
    .filter((threeLetters) => [a, c, f, g].indexOf(threeLetters) < 0);
  const [b] = LETTERS.filter((l) => ![a, c, d, e, f, g].includes(l));
  return output.split(" ").map((o) =>
    analyzeNumber(
      [a, b, c, d, e, f, g].reduce((acc, c, idx) => ({ ...acc, [c]: LETTERS[idx] }), {}),
      o
    )
  );
};

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  const notes = puzzle.map((p) => p.split(" | "));

  // Part 1
  console.log(countUniqueOutputNumbers(notes));

  // Part 2
  console.log(notes.reduce((total, note) => total + +calculateNumber(note).join(""), 0));
});
