const { fileToPuzzle } = require("./util");

const MAX_ROW = 127;
const MAX_COL = 7;

const toSeat = (bsp) =>
  bsp.split("").reduce(
    (position, move) => {
      if (move === "F" || move === "B") {
        const [[min, max], col] = position;
        const diff = max - min;
        if (diff === 1) {
          return [move === "B" ? max : min, col];
        } else {
          const newMin = move === "B" ? max - Math.floor(diff / 2) : min;
          const newMax = move === "F" ? max - Math.ceil(diff / 2) : max;
          return [[newMin, newMax], col];
        }
      } else {
        const [row, [min, max]] = position;
        const diff = max - min;
        if (diff === 1) {
          return [row, move === "R" ? max : min];
        } else {
          const newMin = move === "R" ? max - Math.floor(diff / 2) : min;
          const newMax = move === "L" ? max - Math.ceil(diff / 2) : max;
          return [row, [newMin, newMax]];
        }
      }
    },
    [
      [0, MAX_ROW],
      [0, MAX_COL],
    ]
  );

const getSeatId = (seat) => seat[0] * 8 + seat[1];

const getAllSeatIds = () => {
  let allSeats = [];
  for (let row = 0; row < MAX_ROW; row++) {
    for (let col = 0; col < MAX_COL; col++) {
      allSeats.push(getSeatId([row, col]));
    }
  }
  return allSeats;
};

fileToPuzzle("day5-puzzle.txt", (puzzle) => {
  const seats = puzzle.map(toSeat);

  // Part 1
  const highest = seats.reduce((max, seat) => {
    const seatId = getSeatId(seat);
    if (seatId > max) {
      return seatId;
    }
    return max;
  }, 0);
  console.log(highest);

  // Part 2
  const allSeatIds = getAllSeatIds().sort((a, b) => a - b);
  const seatIds = seats.map(getSeatId).sort((a, b) => a - b);
  const lowest = seatIds.reduce((min, seatId) => (seatId < min ? seatId : min), highest);
  console.log(allSeatIds.filter((id) => id < highest && id > lowest && !seatIds.includes(id)).pop());
});
