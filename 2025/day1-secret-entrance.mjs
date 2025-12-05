import { fileToPuzzle } from "./util.mjs";

fileToPuzzle("day1-puzzle.txt", (puzzle) => {
  let curr = 50;
  let zeroResult = 0;
  let zeroPassed = 0;
  puzzle.forEach((p) => {
    const [direction, distance] = [p[0], +p.slice(1)];
    if (direction === "L") {
      const diff = curr - distance;
      if (diff >= 0) {
        curr = diff;
      } else {
        const rounds = (curr === 0 ? 0 : 1) + Math.floor(Math.abs(diff) / 100);
        zeroPassed += rounds;

        curr = (100 - Math.abs(diff)) % 100;
      }
    } else {
      let rest = (curr + distance) % 100;
      const rounds = Math.floor((curr + distance) / 100) - (rest === 0 ? 1 : 0);
      zeroPassed += rounds > 0 ? rounds : 0;

      curr = rest;
    }
    if (curr === 0) {
      zeroResult++;
      zeroPassed++;
    }
  });
  console.log(zeroResult, zeroPassed);
});
