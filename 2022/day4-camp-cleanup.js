const { fileToPuzzle } = require("./util");

const getFromTo = (section) => {
  return section.split("-").map(Number);
};
const isEveryOverlap = (sections) => {
  const [s1, s2] = sections.split(",");
  const [f1, t1] = getFromTo(s1);
  const [f2, t2] = getFromTo(s2);
  return (f1 >= f2 && t1 <= t2) || (f2 >= f1 && t2 <= t1);
};

const isSomeOverlap = (sections) => {
  const [s1, s2] = sections.split(",");
  const [f1, t1] = getFromTo(s1);
  const [f2, t2] = getFromTo(s2);
  return (f1 >= f2 && f1 <= t2) || (f2 >= f1 && f2 <= t1);
};

fileToPuzzle("day4-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(puzzle.filter(isEveryOverlap).length);

  // Part 2
  console.log(puzzle.filter(isSomeOverlap).length);
});
