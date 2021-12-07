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

const doVent = (vent, coords) => {
  for (let y = Math.min(vent.y1, vent.y2); y <= Math.max(vent.y1, vent.y2); y++) {
    for (let x = Math.min(vent.x1, vent.x2); x <= Math.max(vent.x1, vent.x2); x++) {
      let val = coords[y][x];
      if (val === "x") {
        coords[y] = replaceAtIndex(coords[y], x, "1");
      } else {
        val = +val;
        coords[y] = replaceAtIndex(coords[y], x, `${val + 1}`);
      }
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
  const vents = toVents(puzzle).filter((pos) => pos.x1 === pos.x2 || pos.y1 === pos.y2);
  let coords = createCoords(vents);

  vents.forEach((vent) => {
    doVent(vent, coords);
  });
  console.log(countOverlaps(coords));
});
