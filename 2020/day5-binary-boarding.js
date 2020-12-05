const { fileToPuzzle } = require("./util");

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
      [0, 127],
      [0, 7],
    ]
  );

const getSeatId = (seat) => seat[0] * 8 + seat[1];
fileToPuzzle("day5-puzzle.txt", (puzzle) => {
  const seats = puzzle.map(toSeat);
  const highest = seats.reduce((max, seat) => {
    const seatId = getSeatId(seat);
    if (seatId > max) {
      return seatId;
    }
    return max;
  }, 0);
  console.log(highest);
});
