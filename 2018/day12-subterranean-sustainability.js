const { fileToPuzzle } = require("./util");

const GENERATIONS = 20;
const regex = /([#|\.]{5})\s=>\s(#|\.)/;
fileToPuzzle("./day12-puzzle.txt", puzzle => {
  const initialState = puzzle[0].replace("initial state:", "").trim();
  const spreadTable = puzzle.slice(2).reduce((acc, c) => {
    const data = regex.exec(c);
    if (data[2] === "#") {
      acc[data[1]] = data[2];
    }
    return acc;
  }, {});
  let result = "...." + initialState + "....";
  for (let i = 0; i < 20; i++) {
    result =
      result.split("").reduce((acc, c, idx, arr) => {
        const left = (arr[idx - 2] || ".") + (arr[idx - 1] || ".");
        const right = (arr[idx + 1] || ".") + (arr[idx + 2] || ".");
        const pattern = left + c + right;
        const match = spreadTable[pattern];
        if (match) {
          return acc + match;
        }
        return acc + ".";
      }, "....") + "....";
  }

  // Part 1
  console.log(
    result
      .split("")
      .reduce(
        (acc, c, idx) => (c === "#" ? acc + idx - GENERATIONS * 4 - 4 : acc),
        0
      )
  );
});
