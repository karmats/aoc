const { fileToPuzzle } = require("./util");

const isBig = (str) => str.toUpperCase() === str;

const isValidPath = (path) => {
  let duplicates = 0;
  const sortedPath = path.filter((a) => !isBig(a) && a !== "start" && a !== "end").sort();
  if (sortedPath.length <= 2) {
    return true;
  }
  for (let i = 1; i < sortedPath.length; i++) {
    if (sortedPath[i - 1] === sortedPath[i]) {
      duplicates++;
    }
  }
  return duplicates <= 1;
};

const pathToConnections = (paths) =>
  paths.reduce((acc, c) => {
    const [a, b] = c;
    if (!acc[a]) {
      acc[a] = [b];
    } else {
      acc[a].push(b);
    }
    if (!acc[b]) {
      acc[b] = [a];
    } else {
      acc[b].push(a);
    }
    return acc;
  }, {});

const calculatePaths = (connections, part = 1) => {
  const toExplore = [["start"]];
  const paths = [];
  while (toExplore.length > 0) {
    const currPath = toExplore.pop();
    const currLastPlace = currPath.at(-1);

    if (currLastPlace === "end") {
      paths.push(currPath);
      continue;
    }
    connections[currLastPlace].forEach((neighbour) => {
      if (neighbour === "start") {
        return;
      }
      if (part === 1) {
        if (!isBig(neighbour) && currPath.includes(neighbour)) {
          return;
        }
        toExplore.push([...currPath, neighbour]);
      } else {
        const possiblePath = [...currPath, neighbour];
        if (isValidPath(possiblePath)) {
          toExplore.push(possiblePath);
        }
      }
    });
  }
  return paths;
};

fileToPuzzle("day12-puzzle.txt", (puzzle) => {
  const connections = pathToConnections(puzzle.map((p) => p.split("-")));

  // Part 1
  console.log(calculatePaths(connections).length);

  // Part 2
  console.log(calculatePaths(connections, 2).length);
});
