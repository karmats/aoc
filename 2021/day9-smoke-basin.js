const { fileToPuzzle, sum } = require("./util");

const findLowest = (points) => {
  const lowestPoints = [];
  for (let y = 0; y < points.length; y++) {
    const row = points[y];
    for (let x = 0; x < row.length; x++) {
      const c = +row[x];
      const [left, top, right, bottom] = [
        row[x - 1] ?? 10,
        points[y - 1] ? points[y - 1][x] ?? 10 : 10,
        row[x + 1] ?? 10,
        points[y + 1] ? points[y + 1][x] ?? 10 : 10,
      ].map(Number);
      if (c < left && c < top && c < right && c < bottom) {
        lowestPoints.push({ value: c, point: [x, y] });
      }
    }
  }
  return lowestPoints;
};

function findNeighbors(nodes, curr) {
  const neighbors = [];
  const [x, y] = curr.point;
  if (y >= 1) {
    neighbors.push(nodes[y - 1][x]);
  }
  if (x >= 1) {
    neighbors.push(nodes[y][x - 1]);
  }
  if (y < nodes.length - 1) {
    neighbors.push(nodes[y + 1][x]);
  }
  if (x < nodes[y].length - 1) {
    neighbors.push(nodes[y][x + 1]);
  }
  return neighbors;
}

function getBasinSize(nodes, current) {
  let size = 0;
  const queue = [current];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr.visited || curr.value === 9) {
      continue;
    }
    curr.visited = true;
    queue.push(...findNeighbors(nodes, curr));
    size++;
  }
  return size;
}

fileToPuzzle("day9-puzzle.txt", (puzzle) => {
  // Part 1
  const lowestNodes = findLowest(puzzle);
  console.log(sum(lowestNodes.map((p) => p.value + 1)));

  // Part 2
  const nodes = puzzle.reduce((acc, c, y) => {
    acc[y] = [];
    for (let x = 0; x < c.length; x++) {
      const value = +c[x];
      acc[y].push({ point: [x, y], value, visited: false });
    }
    return acc;
  }, []);

  const sizes = [];
  lowestNodes.forEach((node) => {
    sizes.push(getBasinSize(nodes, node) - 1);
  });
  const [first, second, third] = sizes.sort((a, b) => b - a);
  console.log(first * second * third);
});
