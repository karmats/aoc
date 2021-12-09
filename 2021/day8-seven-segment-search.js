const { fileToPuzzle } = require("./util");

const countUniqueOutputNumbers = (notes) =>
  notes.reduce((unique, note) => {
    const output = note[1].split(" ");
    return (
      unique + output.reduce((count, o) => (o.length === 2 || o.length === 3 || o.length === 4 || o.length === 7 ? count + 1 : count), 0)
    );
  }, 0);

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  const notes = puzzle.map((p) => p.split(" | "));
  console.log(countUniqueOutputNumbers(notes));
});
