import { fileToPuzzle } from "./util.mjs";

const checkIsLoop = (possibleLoops) => {
  const lastRoute = [];
  const startDirection = possibleLoops[possibleLoops.length - 1].split("_")[2];
  let currentDirection = startDirection;
  let directionChanged = false;
  for (let i = possibleLoops.length - 1; i >= 0; i--) {
    currentDirection = possibleLoops[i].split("_")[2];
    if (currentDirection !== startDirection) {
      directionChanged = true;
    }
    lastRoute.unshift(possibleLoops[i]);
    if (directionChanged && currentDirection === startDirection) {
      const previousRoute = possibleLoops.slice(i - lastRoute.length * 2, i - lastRoute.length);
      const routeString = lastRoute.join("|");
      return routeString === previousRoute.join("|");
    }
  }
  return false;
};
const walk = (puzzle, startPos) => {
  let [x, y] = startPos.slice();
  const visited = [`${x}_${y}`];
  const possibleLoops = [];
  let direction = "north";
  while (true) {
    if (direction === "north") {
      y--;
    } else if (direction === "south") {
      y++;
    } else if (direction === "west") {
      x--;
    } else if (direction === "east") {
      x++;
    }
    if (!puzzle[y] || !puzzle[y][x]) {
      break;
    } else if (puzzle[y][x] === "#") {
      y = direction === "north" ? y + 1 : direction === "south" ? y - 1 : y;
      x = direction === "east" ? x - 1 : direction === "west" ? x + 1 : x;
      direction = direction === "north" ? "east" : direction === "south" ? "west" : direction === "west" ? "north" : "south";
    } else {
      const visitedPos = `${x}_${y}`;
      if (!visited.includes(visitedPos)) {
        visited.push(visitedPos);
      } else {
        possibleLoops.push(`${visitedPos}_${direction}`);
        if (checkIsLoop(possibleLoops)) {
          return { visited, isLoop: true };
        }
      }
    }
  }
  return visited;
};

fileToPuzzle("day6-puzzle.txt", (puzzle) => {
  let startPos = puzzle.reduce((acc, curr, idx) => (curr.indexOf("^") >= 0 ? [curr.indexOf("^"), idx] : acc), []);
  let visited = walk(puzzle, startPos);

  // Part 1
  console.log(visited.length);

  // Part 2
  let loops = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] !== "#") {
        const obstaclePuzzle = puzzle.slice();
        obstaclePuzzle[i] = obstaclePuzzle[i].substring(0, j) + "#" + obstaclePuzzle[i].substring(j + 1);
        const result = walk(obstaclePuzzle, startPos);
        if (result.isLoop) {
          loops++;
        }
      }
    }
  }
  console.log(loops);
});
