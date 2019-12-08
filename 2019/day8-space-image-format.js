const { fileToPuzzle } = require("./util");

const COLS = 25;
const ROWS = 6;
fileToPuzzle(
  "day8-puzzle.txt",
  puzzle => {
    const pixels = puzzle[0];
    const pxMap = [];
    let layer = -1;
    for (
      let pxI = 0, row = 0, col = 0;
      pxI < pixels.length;
      pxI++, col = pxI % COLS
    ) {
      if (row === 0 && col === 0) {
        layer++;
        pxMap[layer] = [];
      }
      const px = pixels[pxI];
      if (!pxMap[layer][row]) {
        pxMap[layer][row] = [];
      }
      pxMap[layer][row][col] = px;
      row = (col === COLS - 1 ? row + 1 : row) % ROWS;
    }

    // Part 1
    const count = (arr, val) => arr.filter(v => v === val).length;
    const flat = arr => arr.reduce((acc, c) => acc.concat(c), []);
    let part1;
    pxMap.forEach(l => {
      const counts = l.reduce(
        (acc, c) => {
          return {
            "0": acc["0"] + count(flat(c), "0"),
            "1": acc["1"] + count(flat(c), "1"),
            "2": acc["2"] + count(flat(c), "2")
          };
        },
        {
          "0": 0,
          "1": 0,
          "2": 0
        }
      );
      if (!part1 || counts["0"] < part1["0"]) {
        part1 = counts;
      }
    });
    console.log(part1["1"] * part1["2"]);

    // Part 2
    let bitmap = "";
    for (let row = 0; row < ROWS; row++) {
      bitmap = bitmap + "\n";
      for (let col = 0; col < COLS; col++) {
        let px;
        for (let l = pxMap.length - 1; l >= 0; l--) {
          const cPx = pxMap[l][row][col];
          if (px === undefined || cPx !== "2") {
            px = cPx;
          }
        }
        bitmap = bitmap + (px === "0" ? " " : "*");
      }
    }
    console.log(bitmap);
  },
  {
    separator: ""
  }
);
