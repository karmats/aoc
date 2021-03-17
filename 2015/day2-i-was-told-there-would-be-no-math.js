const { fileToPuzzle } = require("./util");

const DIMENSIONS_REGEX = /^(\d*)x(\d*)x(\d*)$/;

const calcWrappingPaper = (dimensions) => {
  const [, ...extractedDims] = DIMENSIONS_REGEX.exec(dimensions);
  const [l, w, h] = extractedDims.map((d) => +d);
  const sides = [l * w, w * h, h * l];
  const smallest = sides.reduce((min, side) => (side < min ? side : min), Number.MAX_SAFE_INTEGER);
  return sides.reduce((total, side) => side * 2 + total, smallest);
};

const caclRibbon = (dimensions) => {
  const [, ...extractedDims] = DIMENSIONS_REGEX.exec(dimensions);
  const dims = extractedDims.map((d) => +d);
  const max = dims.reduce((m, side) => (side > m ? side : m), 0);
  const smallestSides = dims.filter((d) => d < max);
  while (smallestSides.length !== 2) {
    smallestSides.push(max);
  }
  const perimiter = smallestSides.reduce((tot, side) => tot + side * 2, 0);
  return perimiter + dims.reduce((prod, side) => side * prod, 1);
};

fileToPuzzle("day2-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(puzzle.map(calcWrappingPaper).reduce((total, wp) => total + wp, 0));

  // Part 2
  console.log(puzzle.map(caclRibbon).reduce((total, r) => total + r, 0));
});
