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

const adjustBrightness = (row, start, end, brightness) => {
  const replacement = row.slice(start, end).reduce((acc, currBrightness) => {
    const newBrightness = currBrightness + brightness <= 0 ? 0 : currBrightness + brightness;
    return acc.concat(newBrightness);
  }, []);
  return row.slice(0, start).concat(replacement).concat(row.slice(end));
};

const doLights2 = (instructions) => {
  let lightGrid = Array.from(new Array(1000)).map(() => Array.from(new Array(1000)).map(() => 0));
  instructions.forEach((instruction) => {
    let brightness = 0;
    switch (instruction.method) {
      case "turn on":
        brightness = 1;
        break;
      case "turn off":
        brightness = -1;
        break;
      case "toggle":
        brightness = 2;
        break;
      default:
        throw new Error(`No such method '${method}'`);
    }
    for (let i = instruction.yFrom; i <= instruction.yTo; i++) {
      lightGrid[i] = adjustBrightness(lightGrid[i], instruction.xFrom, instruction.xTo + 1, brightness);
      if (lightGrid[i].length !== 1000) {
        throw new Error(`WTF!! ${lightGrid[i].length}`);
      }
    }
  });
  return lightGrid;
};

const countOnLights = (row) => (row.match(/\*/g) || []).length;
const countBrightness = (row) => row.reduce((count, brightness) => count + +brightness, 0);

fileToPuzzle("day6-puzzle.txt", (puzzle) => {
  const instructions = puzzle.map((p) => {
    const regexResult = INSTRUCTION_REGEX.exec(p);
    const [, method, xFrom, yFrom, xTo, yTo] = regexResult;
    return { method, xFrom: +xFrom, xTo: +xTo, yFrom: +yFrom, yTo: +yTo };
  });

  // Part 1
  const lightingGrid = doLights(instructions);
  console.log(lightingGrid.reduce((onLights, row) => onLights + countOnLights(row), 0));

  // Part 2
  const lightGrid2 = doLights2(instructions);
  console.log(lightGrid2.reduce((brightness, row) => brightness + countBrightness(row), 0));
});
