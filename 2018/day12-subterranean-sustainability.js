const { fileToPuzzle } = require("./util");

const regex = /([#|\.]{5})\s=>\s(#|\.)/;

const calculate = (state, padded) =>
  state
    .split("")
    .reduce((acc, c, idx) => (c === "#" ? acc + idx - padded * 4 - 4 : acc), 0);

const runGenerations = (state, spreadTable, generations) => {
  let lastCount = 0;
  for (let i = 0; i < generations; i++) {
    state =
      state.split("").reduce((acc, c, idx, arr) => {
        const left = (arr[idx - 2] || ".") + (arr[idx - 1] || ".");
        const right = (arr[idx + 1] || ".") + (arr[idx + 2] || ".");
        const pattern = left + c + right;
        const match = spreadTable[pattern];
        if (match) {
          return acc + match;
        }
        return acc + ".";
      }, "....") + "....";
    if (i > 50) {
      count = calculate(state, i);
      lastCount = count;
    }
  }
  return calculate(state, generations);
};
fileToPuzzle("./day12-puzzle.txt", puzzle => {
  const initialState = puzzle[0].replace("initial state:", "").trim();
  const spreadTable = puzzle.slice(2).reduce((acc, c) => {
    const data = regex.exec(c);
    acc[data[1]] = data[2];
    return acc;
  }, {});

  // Part 1
  console.log(runGenerations("...." + initialState + "....", spreadTable, 20));
  // Part 2
  console.log(
    runGenerations("...." + initialState + "....", spreadTable, 200) +
      (50000000000 - 200) * 98
  );
});
