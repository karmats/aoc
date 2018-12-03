const { fileToPuzzle } = require("./util");

const claimsRegex = /#(\d*)\s@\s(\d*),(\d*):\s(\d*)x(\d*)/;

const overlapX = (a, b) => {
  if (a.from.x >= b.from.x && a.from.x <= b.to.x) {
    return { from: a.from.x, to: Math.min(b.to.x, a.to.x) };
  }
  if (a.to.x >= b.from.x && a.to.x <= b.to.x) {
    return { from: Math.max(b.from.x, a.from.x), to: a.to.x };
  }
  if (b.from.x >= a.from.x && b.from.x <= a.to.x) {
    return { from: b.from.x, to: Math.min(a.to.x, b.to.x) };
  }
  if (b.to.x >= a.from.x && b.to.x <= a.to.x) {
    return { from: Math.max(a.from.x, b.from.x), to: b.to.x };
  }
  return null;
};
const overlapY = (a, b) => {
  if (a.from.y >= b.from.y && a.from.y <= b.to.y) {
    return { from: a.from.y, to: Math.min(b.to.y, a.to.y) };
  }
  if (a.to.y >= b.from.y && a.to.y <= b.to.y) {
    return { from: Math.max(b.from.y, a.from.y), to: a.to.y };
  }
  if (b.from.y >= a.from.y && b.from.y <= a.to.y) {
    return { from: b.from.y, to: Math.min(a.to.y, b.to.y) };
  }
  if (b.to.y >= a.from.y && b.to.y <= a.to.y) {
    return { from: Math.max(a.from.y, b.from.y), to: b.to.y };
  }
  return null;
};
const overlaps = (a, b) => {
  return {
    x: overlapX(a, b),
    y: overlapY(a, b)
  };
};
fileToPuzzle("./day3-puzzle.txt", puzzle => {
  const stiches = puzzle.map(p => {
    const parsed = claimsRegex.exec(p);
    const from = {
      x: parseInt(parsed[2]),
      y: parseInt(parsed[3])
    };
    const to = {
      x: from.x - 1 + parseInt(parsed[4]),
      y: from.y - 1 + parseInt(parsed[5])
    };
    return {
      id: parsed[1],
      from: from,
      to: to
    };
  });

  const coordinates = {};
  const overlapIds = new Set();
  const allIds = stiches.map(s => s.id);
  for (let i = 0; i < stiches.length; i++) {
    const a = stiches[i];
    for (let j = i + 1; j < stiches.length; j++) {
      const b = stiches[j];
      const overlap = overlaps(a, b);
      if (overlap.x && overlap.y) {
        overlapIds.add(a.id).add(b.id);
        for (let x = overlap.x.from; x <= overlap.x.to; x++) {
          for (let y = overlap.y.from; y <= overlap.y.to; y++) {
            coordinates[x + "_" + y] = "x";
          }
        }
      }
    }
  }
  // Part 1
  console.log(Object. keys(coordinates).length);
  // Part 2
  console.log(allIds.filter(id => !overlapIds.has(id)).pop());
});
