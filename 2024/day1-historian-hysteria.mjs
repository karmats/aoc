import { fileToPuzzle } from "./util.mjs";

fileToPuzzle("day1-puzzle.txt", (puzzle) => {
  const [a, b] = puzzle
    .map((p) => p.split("   ").map(Number))
    .reduce(
      (acc, c) => {
        acc[0].push(c[0]);
        acc[1].push(c[1]);
        return acc;
      },
      [[], []]
    );
  a.sort();
  b.sort();
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.abs(a[i] - b[i]);
  }
  // Part 1
  console.log(sum);

  // Part 2
  console.log(
    a.reduce((acc, c, i) => {
      const occursInB = b.filter((bNum) => bNum === c).length;
      return acc + c * occursInB;
    }, 0)
  );
});
