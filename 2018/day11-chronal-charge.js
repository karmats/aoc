const SIZE = 300;
const SERIAL_NO = 7403;

const power = (x, y) => {
  const rackId = x + 10;
  const part = ((rackId * y + SERIAL_NO) * rackId).toString();
  const hundredth = parseInt(part.substring(part.length - 3, part.length - 2));
  return hundredth - 5;
};
const areaPower = (x, y, cells, size) => {
  let total = 0;
  for (let i = y; i < y + size; i++) {
    for (let j = x; j < x + size; j++) {
      total += cells[j + "_" + i];
    }
  }
  return total;
};
const addedPower = (x, y, cells, size) => {
  let tot = 0;
  for (let j = x; j <= x + size; j++) {
    tot += cells[j + "_" + (size + y)];
  }
  for (let i = y; i <= y + size - 1; i++) {
    tot += cells[(size + x) + "_" + i];
  }
  return tot;
};
let grid = {};
for (let y = 1; y <= SIZE; y++) {
  for (let x = 1; x <= SIZE; x++) {
    grid[x + "_" + y] = power(x, y);
  }
}
let highest = 0;
let highestCoord = [0, 0];
let highestSize = 0;
let highestPart1 = 0;
let highestPart1Coord = [0, 0];
const prev = {};
for (let size = 1; size <= SIZE; size++) {
  for (let y = 1; y <= SIZE - size; y++) {
    for (let x = 1; x <= SIZE - size; x++) {
      let total = prev[x + "_" + y];
      if (total === undefined) {
        total = areaPower(x, y, grid, size);
      } else {
        total += addedPower(x, y, grid, size - 1);
      }
      prev[x + "_" + y] = total;
      if (size === 3 && total > highestPart1) {
        highestPart1 = total;
        highestPart1Coord = [x, y];
      }
      if (total > highest) {
        highest = total;
        highestCoord = [x, y];
        highestSize = size;
      }
    }
  }
  //if (size === 4) break;
}
// Part 1
console.log(highestPart1Coord.join(","));
// Part 2
console.log(`${highestCoord.join(",")},${highestSize}`);
