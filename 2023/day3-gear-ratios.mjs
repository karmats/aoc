import { fileToPuzzle, isNumber, sum } from "./util.mjs";

const isSymbol = (char) => {
  return char !== "." && isNaN(+char);
};

const isSurroundedWithSymbol = (y, x, schematic, symbol) => {
  for (let y1 = y - 1; y1 <= y + 1; y1++) {
    for (let x1 = x - 1; x1 <= x + 1; x1++) {
      const char = schematic[y1] && schematic[y1][x1] ? schematic[y1][x1] : ".";
      if (symbol) {
        if (char === symbol) {
          return { y: y1, x: x1 };
        }
      } else {
        if (isSymbol(char)) {
          return true;
        }
      }
    }
  }
};

const convertToNumberAndFilter = (numbers) => numbers.map(Number).filter((n) => n && isNumber(n));

const getNumbersNotAdjacentToSymbol = (schemtatic) => {
  const numbersPart1 = [];
  const numbersPart2 = [];
  for (let y = 0; y < schemtatic.length; y++) {
    const row = schemtatic[y];
    for (let x = 0; x < row.length; x++) {
      let num = "";
      let hasSymbolAround = null;
      let starSymbolCoords = false;
      while (isNumber(row[x])) {
        num += row[x];
        if (!starSymbolCoords) {
          starSymbolCoords = isSurroundedWithSymbol(y, x, schemtatic, "*");
        }
        if (!hasSymbolAround) {
          hasSymbolAround = isSurroundedWithSymbol(y, x, schemtatic);
        }
        x++;
      }
      if (hasSymbolAround) {
        numbersPart1.push(num);
      }
      if (starSymbolCoords) {
        numbersPart2.push({ num, ...starSymbolCoords });
      }
    }
  }
  return [convertToNumberAndFilter(numbersPart1), numbersPart2];
};

fileToPuzzle("day3-puzzle.txt", (schemtatic) => {
  // Part 1
  const numbers = getNumbersNotAdjacentToSymbol(schemtatic);
  console.log(sum(numbers[0]));

  // Part 2
  const occurencesByCoords = numbers[1].reduce((occurences, coord) => {
    const { num, y, x } = coord;
    const coords = `${y}_${x}`;
    if (!occurences[coords]) {
      occurences[coords] = [0, 1];
    }
    return { ...occurences, [coords]: [occurences[coords][0] + 1, occurences[coords][1] * +num] };
  }, {});
  console.log(
    Object.keys(occurencesByCoords).reduce((sum, key) => {
      const [occurences, value] = occurencesByCoords[key];
      if (occurences === 2) {
        return sum + value;
      }
      return sum;
    }, 0)
  );
});
