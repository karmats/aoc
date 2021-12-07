const { fileToPuzzle, replaceAtIndex } = require("./util");

const VENTS_REGEX = /^(\d*),(\d*)\s->\s(\d*),(\d*)$/;

const toVents = (puzzle) =>
  puzzle.map((p) => {
    const regexResult = VENTS_REGEX.exec(p);
    return {
      x1: +regexResult[1],
      y1: +regexResult[2],
      x2: +regexResult[3],
      y2: +regexResult[4],
    };
  });

const createCoords = (vents) => {
  const maxY = vents.reduce((max, pos) => {
    const mY = Math.max(pos.y1, pos.y2);
    if (mY > max) {
      return mY;
    }
    return max;
  }, 0);
  const maxX = vents.reduce((max, pos) => {
    const mX = Math.max(pos.x1, pos.x2);
    if (mX > max) {
      return mX;
    }
    return max;
  }, 0);
  return Array.from(new Array(maxY + 1)).map(() =>
    Array.from(new Array(maxX + 1))
      .map(() => "x")
      .join("")
  );
};

const doCoordHit = (x, y, coords) => {
  let val = coords[y][x];
  let replace = "1";
  if (val !== "x") {
    val = +val;
    replace = `${val + 1}`;
  }
  coords[y] = replaceAtIndex(coords[y], x, replace);
  return coords;
};
const doVent = (vent, coords, diagonal = false) => {
  const [maxX, maxY] = [Math.max(vent.x1, vent.x2), Math.max(vent.y1, vent.y2)];
  const [minX, minY] = [Math.min(vent.x1, vent.x2), Math.min(vent.y1, vent.y2)];
  if (diagonal && Math.abs(vent.x1 - vent.x2) === Math.abs(vent.y1 - vent.y2)) {
    let x = vent.y1 === minY ? vent.x1 : vent.x2;
    for (let y = minY; y <= maxY; y++) {
      doCoordHit(x, y, coords);
      if (vent.y1 === minY) {
        x = vent.x1 - vent.x2 > 0 ? x - 1 : x + 1;
      } else {
        x = vent.x1 - vent.x2 > 0 ? x + 1 : x - 1;
      }
    }
  } else if (vent.x1 === vent.x2) {
    const x = vent.x1;
    for (let y = minY; y <= maxY; y++) {
      doCoordHit(x, y, coords);
    }
  } else if (vent.y1 === vent.y2) {
    const y = vent.y1;
    for (let x = minX; x <= maxX; x++) {
      doCoordHit(x, y, coords);
    }
  }

  return coords;
};

const countOverlaps = (coords) =>
  coords.reduce((overlaps, coord) => {
    const numbers = coord
      .split("")
      .filter((c) => c !== "x")
      .map(Number);
    return overlaps + numbers.reduce((sum, c) => (c > 1 ? sum + 1 : sum), 0);
  }, 0);

fileToPuzzle("day5-puzzle.txt", (puzzle) => {
  const vents = toVents(puzzle);
  let coords = createCoords(vents);

  // Part 1
  vents.forEach((vent) => {
    doVent(vent, coords);
  });
  console.log(countOverlaps(coords));

  // Part 2
  coords = createCoords(vents);
  vents.forEach((vent) => {
    doVent(vent, coords, true);
  });
  console.log(countOverlaps(coords));
});
