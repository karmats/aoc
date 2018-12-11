const FUEL_CELLS_X = 300;
const FUEL_CELLS_Y = 300;
const SERIAL_NO = 7403;

const power = (x, y) => {
  const rackId = x + 10;
  const part = ((rackId * y + SERIAL_NO) * rackId).toString();
  const hundredth = parseInt(part.substring(part.length - 3, part.length - 2));
  return hundredth - 5;
};
const totalPower = (x, y, cells) => {
  let total = 0;
  for (let i = y; i < y + 3; i++) {
    for (let j = x; j < x + 3; j++) {
      total += cells[j + "_" + i];
    }
  }
  return total;
};
let grid = {};
for (let y = 1; y <= FUEL_CELLS_Y; y++) {
  for (let x = 1; x <= FUEL_CELLS_X; x++) {
    grid[x + "_" + y] = power(x, y);
  }
}
let highest = 0;
let highestCoord = [1, 1];
for (let y = 1; y < FUEL_CELLS_Y - 3; y++) {
  for (let x = 1; x <= FUEL_CELLS_X - 3; x++) {
      const total = totalPower(x, y, grid);
      if (total > highest) {
          highest = total;
          highestCoord = [x, y];
      }
  }
}

console.log(highestCoord.join(','));
