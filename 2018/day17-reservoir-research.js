const { fileToPuzzle } = require("./util");

const isHit = (x, y, coordinates) => {
  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i];
    if (
      (coordinate.x === x || (x >= coordinate.x.from && x <= coordinate.x.to)) &&
      (coordinate.y === y || (y >= coordinate.y.from && y <= coordinate.y.to))
    ) {
      return true;
    }
  }
  return false;
};

const firstRegex = /([xy])=(\d*)/;
const secondRegex = /([xy])=(\d*)\.\.(\d*)/;
fileToPuzzle("./day17-puzzle.txt", puzzle => {
  const coordinates = puzzle.reduce((acc, c) => {
    const xy = c.split(", ");
    const first = firstRegex.exec(xy[0]);
    const second = secondRegex.exec(xy[1]);
    const xObj =
      first[1] === "x" ? +first[2] : { from: +second[2], to: +second[3] };
    const yObj =
      first[1] === "y" ? +first[2] : { from: +second[2], to: +second[3] };
    return acc.concat({ x: xObj, y: yObj });
  }, []);

  let x = 500;
  let y = 1;

  const maxY = coordinates.reduce(
    (acc, c) => (c.y > acc ? c.y : c.y.to > acc ? c.y.to : acc),
    0
  );
  const minX = coordinates.reduce(
    (acc, c) => (c.x < acc ? c.x : c.x.from < acc ? c.x.to : acc),
    500
  );
  const maxX = coordinates.reduce(
    (acc, c) => (c.x > acc ? c.x : c.x.to > acc ? c.x.to : acc),
    0
  );
  console.log(maxY, minX, maxX);

  for (let y = 0; y <= maxY; y++) {
    let map = [];
    for (let x = minX; x <= maxX; x++) {
      if (isHit(x, y, coordinates)) {
        map.push("#");
      } else {
        map.push(".");
      }
    }
    console.log(map.join(""));
  }
});
