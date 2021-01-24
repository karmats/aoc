const ROWS = 6;
const COLS = 50;

const RECT_REGEX = /rect\s(\d*)x(\d*)$/;
const ROTATE_COLUMN_REGEX = /rotate\scolumn\sx=(\d*)\sby\s(\d*)$/;
const ROTATE_ROW_REGEX = /rotate\srow\sy=(\d*)\sby\s(\d*)$/;

const { fileToPuzzle } = require("./util");

const drawRect = (screen, cols, rows) => {
  for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
    const row = screen[rowIdx];
    const slicedRow = row.substring(cols, row.length);
    screen[rowIdx] = slicedRow.padStart(row.length, "*");
  }
  return screen;
};

const rotateColumn = (screen, colIdx, by) => {
  const times = (by % ROWS);
  const colString = screen.reduce((acc, c) => acc + c[colIdx], "");
  const start = colString.substring(colString.length - times, colString.length);
  const end = colString.substring(0, colString.length - times);
  const newColSring = start + end;
  return screen.map((row, idx) => {
    return row.substring(0, colIdx) + newColSring[idx] + row.substring(colIdx + 1);
  });
};

const rotateRow = (screen, rowIdx, by) => {
  const times = (by % COLS);
  const row = screen[rowIdx];
  const start = row.substring(row.length - times, row.length);
  const end = row.substring(0, row.length - times);
  screen[rowIdx] = start + end;
  return screen;
};

const doInstruction = (screen, instruction) => {
  let regexResult = RECT_REGEX.exec(instruction);
  if (regexResult) {
    return drawRect(screen, +regexResult[1], +regexResult[2]);
  }
  regexResult = ROTATE_COLUMN_REGEX.exec(instruction);
  if (regexResult) {
    return rotateColumn(screen, +regexResult[1], +regexResult[2]);
  }
  regexResult = ROTATE_ROW_REGEX.exec(instruction);
  if (regexResult) {
    return rotateRow(screen, +regexResult[1], +regexResult[2]);
  }
  throw new Error(`Failed to parse ${instruction}`);
};

const toReadableString = (screen) => screen.reduce((str, row) => `${str}\n${row}`, "");

const countLights = (screen) =>
  screen.reduce((total, row) => total + row.split("").reduce((rowLights, col) => (col === "*" ? rowLights + 1 : rowLights), 0), 0);

fileToPuzzle("day8-puzzle.txt", (puzzle) => {
  let screen = Array.from(new Array(ROWS)).map(() => "".padStart(COLS, "."));
  rotateRow(screen, 1, 9);
  puzzle.forEach((instruction) => {
    screen = doInstruction(screen, instruction);
  });
  // Part 1
  console.log(countLights(screen));
  // Part 2
  console.log(toReadableString(screen));
});
