import { fileToPuzzle } from "./util.mjs";

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
        if (!!possibleLoops.find((loop, idx, arr) => arr.indexOf(loop) !== idx)) {
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
      if (puzzle[i][j] !== "#" && visited.includes(`${j}_${i}`)) {
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
