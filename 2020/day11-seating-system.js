const { fileToPuzzle } = require("./util");

const MODE = {
  PART_1: 1,
  PART_2: 2,
};

const DIRECTIONS = {
  left: "left",
  topLeft: "top-left",
  top: "top",
  topRight: "top-right",
  right: "right",
  bottomRight: "bottom-right",
  bottom: "bottom",
  bottomLeft: "bottom-left",
};

const firstSeenStatus = (rowIdx, colIdx, seates, direction) => {
  let ci = direction.includes("left") ? colIdx - 1 : colIdx + 1;
  let ri = direction.includes("top") ? rowIdx - 1 : rowIdx + 1;
  const maxRow = seates.length;
  const maxCol = seates[0].length;
  switch (direction) {
    case DIRECTIONS.left:
      for (; ci >= 0; ci--) {
        let status = seates[rowIdx][ci] || ".";
        if (status !== ".") {
          return status;
        }
      }
      return ".";
    case DIRECTIONS.topLeft:
      for (; ri >= 0, ci >= 0; ri--, ci--) {
        const row = seates[ri];
        if (row) {
          let status = row[ci] || ".";
          if (status !== ".") {
            return status;
          }
        }
      }
      return ".";
    case DIRECTIONS.top:
      for (; ri >= 0; ri--) {
        const row = seates[ri];
        let status = row[colIdx] || ".";
        if (status !== ".") {
          return status;
        }
      }
      return ".";
    case DIRECTIONS.topRight:
      for (; ri >= 0, ci < maxCol; ri--, ci++) {
        const row = seates[ri];
        if (row) {
          let status = row[ci] || ".";
          if (status !== ".") {
            return status;
          }
        }
      }
      return ".";
    case DIRECTIONS.right:
      for (; ci < maxCol; ci++) {
        const status = seates[rowIdx][ci] || ".";
        if (status !== ".") {
          return status;
        }
      }
      return ".";
    case DIRECTIONS.bottomRight:
      for (; ri < maxRow, ci < maxCol; ri++, ci++) {
        const row = seates[ri];
        if (row) {
          let status = row[ci] || ".";
          if (status !== ".") {
            return status;
          }
        }
      }
      return ".";
    case DIRECTIONS.bottom:
      for (; ri < maxRow; ri++) {
        const row = seates[ri];
        if (row) {
          let status = row[colIdx] || ".";
          if (status !== ".") {
            return status;
          }
        }
      }
      return ".";
    case DIRECTIONS.bottomLeft:
      for (; ri < maxRow, ci >= 0; ri++, ci--) {
        const row = seates[ri];
        if (row) {
          let status = row[ci] || ".";
          if (status !== ".") {
            return status;
          }
        }
      }
      return ".";
    default:
      throw new Error(`WTF is ${direction}`);
  }
};

const getNewSeating = (rowIdx, colIdx, seates, mode) => {
  const currentSeating = seates[rowIdx][colIdx];
  if (currentSeating === ".") {
    return currentSeating;
  }
  let occupies = 0;
  if (mode === MODE.PART_1) {
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
  } else {
    Object.values(DIRECTIONS).forEach((direction) => {
      const status = firstSeenStatus(rowIdx, colIdx, seates, direction);
      if (status === "#") {
        occupies++;
      }
    });
    if (currentSeating === "L" && occupies === 0) {
      return "#";
    } else if (currentSeating === "#" && occupies >= 5) {
      return "L";
    }
  }
  return currentSeating;
};
const getSeating = (seates, mode) => {
  const newSeates = [];
  for (let rowIdx = 0; rowIdx < seates.length; rowIdx++) {
    let newRow = "";
    const row = seates[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      newRow += getNewSeating(rowIdx, colIdx, seates, mode);
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

const getConstantSeating = (initialSeating, mode) => {
  let currentSeating = initialSeating.slice();
  let newSeating = getSeating(currentSeating, mode);
  while (true) {
    currentSeating = newSeating;
    newSeating = getSeating(currentSeating, mode);
    if (equals(currentSeating, newSeating)) {
      break;
    }
  }
  return currentSeating;
};

const toString = (seates) => seates.reduce((str, c) => `${str}\n${c}`);

const caculateOccupiedSeates = (seates) => seates.reduce((occupied, row) => occupied + (row.match(/#/g) || []).length, 0);

fileToPuzzle("day11-puzzle.txt", (puzzle) => {
  // Part 1
  const constantSeating1 = getConstantSeating(puzzle, MODE.PART_1);
  console.log(caculateOccupiedSeates(constantSeating1));

  // Part 2
  const constantSeating2 = getConstantSeating(puzzle, MODE.PART_2);
  console.log(caculateOccupiedSeates(constantSeating2));
});
