const { fileToPuzzle } = require("./util");

const HIGH_NUMBER = 99999999;
fileToPuzzle("./day6-puzzle.txt", puzzle => {
  const coordinates = puzzle.map(p =>
    p.split(",").map(s => parseInt(s.trim()))
  );
  const maxX = coordinates.reduce((acc, c) => (c[0] > acc ? c[0] : acc), 0);
  const maxY = coordinates.reduce((acc, c) => (c[1] > acc ? c[1] : acc), 0);
  const minX = coordinates.reduce(
    (acc, c) => (c[0] < acc ? c[0] : acc),
    HIGH_NUMBER
  );
  const minY = coordinates.reduce(
    (acc, c) => (c[1] < acc ? c[1] : acc),
    HIGH_NUMBER
  );

  const closest = (x, y) =>
    coordinates.reduce(
      (acc, c) => {
        const distance = Math.abs(x - c[0]) + Math.abs(y - c[1]);
        if (acc.distance > distance) {
          acc.coordinates = [c];
          acc.distance = distance;
        } else if (acc.distance === distance) {
          acc.coordinates.push(c);
        }
        return acc;
      },
      { coordinates: [], distance: HIGH_NUMBER }
    );
  const withinMaxMin = coordinate => {
    const x = coordinate[0];
    const y = coordinate[1];
    return x > minX && x < maxX && y > minY && y < maxY;
  };

  let result = {};
  for (let x = 0; x <= maxX + 200; x++) {
    for (let y = 0; y <= maxY + 200; y++) {
      const c = closest(x, y);
      if (c.coordinates.length === 1) {
        const coords = c.coordinates[0];
        if (withinMaxMin(coords)) {
          const key = coords.join('_');
          result[key] = typeof result[key] === "number" ? result[key] + 1 : 1;
        }
      }
    }
  }
  let outside = new Set();
  for (let x = 0; x <= maxX; x++) {
    const c = closest(x, maxY + 1);
    const c2 = closest(x, minY - 1);
    if (c.coordinates.length === 1) {
      outside.add(`${c.coordinates[0][0]}_${c.coordinates[0][1]}`);
    }
    if (c2.coordinates.length === 1) {
      outside.add(`${c2.coordinates[0][0]}_${c2.coordinates[0][1]}`);
    }
  }
  for (let y = 0; y <= maxY; y++) {
    const c = closest(maxX + 1, y);
    const c2 = closest(minX - 1, y);
    if (c.coordinates.length === 1) {
      outside.add(c.coordinates[0].join('_'));
    }
    if (c2.coordinates.length === 1) {
      outside.add(c2.coordinates[0].join('_'));
    }
  }
  console.log(
    Object.keys(result)
      .filter(r => !outside.has(r))
      .reduce((acc, c) => (result[c] > acc ? result[c] : acc), 0)
  );
});
