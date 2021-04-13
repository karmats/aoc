const { fileToPuzzle } = require("./util");

const INSTRUCTION_REGEX = /^(turn\soff|turn\son|toggle)\s(\d*),(\d*)\sthrough\s(\d*),(\d*)$/;
const ON_CHAR = "*";
const OFF_CHAR = "-";

const replaceCharRange = (str, start, end, char) => {
  const range = end - start;
  return (
    str.substring(0, start) +
    Array.from(new Array(range))
      .map(() => char)
      .join("") +
    str.substring(end)
  );
};

const toggleRow = (row, start, end) => {
  const charsToToggle = row.substring(start, end);
  const offAsX = charsToToggle.replace(/\-/g, "x");
  return row.substring(0, start) + offAsX.replace(/\*/g, "-").replace(/x/g, "*") + row.substring(end);
};

const doLights = (instructions) => {
  let lightGrid = Array.from(new Array(1000)).map(() =>
    Array.from(new Array(1000))
      .map(() => OFF_CHAR)
      .join("")
  );
  instructions.forEach((instruction) => {
    for (let i = instruction.yFrom; i <= instruction.yTo; i++) {
      if (instruction.method === "turn on" || instruction.method === "turn off") {
        const replacementChar = instruction.method === "turn on" ? ON_CHAR : OFF_CHAR;
        lightGrid[i] = replaceCharRange(lightGrid[i], instruction.xFrom, instruction.xTo + 1, replacementChar);
      } else if (instruction.method === "toggle") {
        lightGrid[i] = toggleRow(lightGrid[i], instruction.xFrom, instruction.xTo + 1);
      } else {
        throw new Error(`No such method '${method}'`);
      }
    }
  });
  return lightGrid;
};

const countOnLights = (row) => (row.match(/\*/g) || []).length;

fileToPuzzle("day6-puzzle.txt", (puzzle) => {
  //const puzzle = ["turn on 0,0 through 2,2", "toggle 1,1 through 2,2"];
  const instructions = puzzle.map((p) => {
    const regexResult = INSTRUCTION_REGEX.exec(p);
    const [, method, xFrom, yFrom, xTo, yTo] = regexResult;
    return { method, xFrom: +xFrom, xTo: +xTo, yFrom: +yFrom, yTo: +yTo };
  });
  const lightingGrid = doLights(instructions);

  console.log(lightingGrid.reduce((onLights, row) => onLights + countOnLights(row), 0));
});
