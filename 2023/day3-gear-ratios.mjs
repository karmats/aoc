import { fileToPuzzle, sum } from "./util.mjs";

const isSymbol = (char) => {
  return char !== "." && isNaN(+char);
};

const isSurroundedWithSymbol = (y, x, schematic) => {
  for (let y1 = y - 1; y1 <= y + 1; y1++) {
    for (let x1 = x - 1; x1 <= x + 1; x1++) {
      if (isSymbol(schematic[y1] && schematic[y1][x1] ? schematic[y1][x1] : ".")) {
        return true;
      }
    }
  }
};

const getNumbersNotAdjacentToSymbol = (schemtatic) => {
  const numbers = [];
  for (let y = 0; y < schemtatic.length; y++) {
    const row = schemtatic[y];
    for (let x = 0; x < row.length; x++) {
      let num = "";
      let hasSymbolAround = false;
      while (!isNaN(row[x])) {
        num += row[x];
        if (!hasSymbolAround) {
          hasSymbolAround = isSurroundedWithSymbol(y, x, schemtatic);
        }
        x++;
      }
      if (hasSymbolAround) {
        numbers.push(num);
      }
    }
  }
  return numbers.map(Number).filter((n) => n && !isNaN(n));
};

fileToPuzzle("day3-puzzle.txt", (schemtatic) => {
  // Part 1
  const numbers = getNumbersNotAdjacentToSymbol(schemtatic);
  console.log(sum(numbers));
});
