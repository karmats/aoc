const { fileToPuzzle } = require("./util");

const getNewSeating = (rowIdx, colIdx, seates) => {
  const currentSeating = seates[rowIdx][colIdx];
  let occupies = 0;
  for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
    const row = seates[i];
    if (row) {
      for (let j = colIdx - 1; j <= colIdx + 1; j++) {
        if (j === colIdx && i === rowIdx) {
          continue;
        }
        if (row[j] === "#") {
          occupies++;
        }
      }
    }
  }
  if (currentSeating === "L" && occupies === 0) {
    return "#";
  } else if (currentSeating === "#" && occupies >= 4) {
    return "L";
  }
  return currentSeating;
};
const getSeating = (seates) => {
  const newSeates = [];
  for (let rowIdx = 0; rowIdx < seates.length; rowIdx++) {
    let newRow = "";
    const row = seates[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      newRow += getNewSeating(rowIdx, colIdx, seates);
    }
    newSeates.push(newRow);
  }
  return newSeates;
};
const equals = (seating1, seating2) => {
  for (let i = 0; i < seating1.length; i++) {
    if (seating1[i] !== seating2[i]) {
      return false;
    }
  }
  return true;
};

const getConstantSeating = (initialSeating) => {
  let currentSeating = initialSeating.slice();
  let newSeating = getSeating(currentSeating);
  while (true) {
    currentSeating = newSeating;
    newSeating = getSeating(currentSeating);
    if (equals(currentSeating, newSeating)) {
      break;
    }
  }
  return currentSeating;
};

const toString = (seates) => seates.reduce((str, c) => `${str}\n${c}`);

const caculateOccupiedSeates = (seates) => seates.reduce((occupied, row) => occupied + (row.match(/#/g) || []).length, 0);

fileToPuzzle("day11-puzzle.txt", (puzzle) => {
  const constantSeating = getConstantSeating(puzzle);
  console.log(caculateOccupiedSeates(constantSeating));
});
