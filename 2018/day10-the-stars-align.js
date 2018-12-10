const { fileToPuzzle } = require("./util");

const SECONDS = 400;

const maxMinXY = stars =>
  stars.reduce(
    (acc, c) => {
      const x = c.p[0];
      const y = c.p[1];
      if (x < acc.minX) {
        acc.minX = x;
      }
      if (x > acc.maxX) {
        acc.maxX = x;
      }
      if (y < acc.minY) {
        acc.minY = y;
      }
      if (y > acc.maxY) {
        acc.maxY = y;
      }
      return acc;
    },
    { minX: 0, minY: 0, maxX: 0, maxY: 0 }
  );

const regex = /.*=<(.*)>.*=<(.*)>/;
fileToPuzzle("./day10-puzzle.txt", puzzle => {
  const stars = puzzle
    .map(p => regex.exec(p))
    .map(c => {
      const p = c[1].split(",");
      const v = c[2].split(",");
      return {
        p: [parseInt(p[0].trim()), parseInt(p[1].trim())],
        v: [parseInt(v[0].trim()), parseInt(v[1].trim())]
      };
    });
  let maxMin = maxMinXY(stars);
  let time = 0;
  while (true) {
    for (let j = 0; j < stars.length; j++) {
      stars[j].p[0] = stars[j].p[0] + stars[j].v[0];
      stars[j].p[1] = stars[j].p[1] + stars[j].v[1];
    }
    const newMaxMin = maxMinXY(stars);
    if (
      newMaxMin.maxX - newMaxMin.minX > maxMin.maxX - maxMin.minX &&
      newMaxMin.maxY - newMaxMin.minY > maxMin.maxY - maxMin.minY
    ) {
      break;
    }
    time++;
    maxMin = newMaxMin;
  }
  for (let k = 0; k < stars.length; k++) {
    stars[k].p[0] = stars[k].p[0] - stars[k].v[0];
    stars[k].p[1] = stars[k].p[1] - stars[k].v[1];
  }
  // Part 1
  for (let y = maxMin.minY; y <= maxMin.maxY; y++) {
    let row = "";
    for (let x = maxMin.minX; x <= maxMin.maxX; x++) {
      if (stars.filter(s => s.p[0] === x && s.p[1] === y).length > 0) {
        row += "#";
      } else {
        row += ".";
      }
    }
    if (row.split("").some(c => c === "#")) {
      console.log(row);
    }
  }
  // Part 2
  console.log(time);
});
