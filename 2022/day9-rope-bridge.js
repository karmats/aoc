const { fileToPuzzle } = require("./util");

const climb = (command, headPosition, tailPosition, visited, commands) => {
  if (!command) {
    return visited;
  }
  let [toX, toY] = headPosition;
  const [direction, steps] = command.split(" ");
  switch (direction) {
    case "R":
      toX += +steps;
      break;
    case "L":
      toX -= +steps;
      break;
    case "D":
      toY -= +steps;
      break;
    case "U":
      toY += +steps;
      break;
    default:
      throw new Error(`Unknown direction '${direction}'`);
  }
  let [tailX, tailY] = tailPosition;
  let [distX, distY] = [Math.abs(tailX - toX), Math.abs(tailY - toY)];
  while (distX > 1 || distY > 1) {
    // if (command === "L 3") {
    //   console.log([tailX, tailY], [toX, toY], [distX, distY]);
    // }
    // if (tailX - 1 > toX) {
    //   tailX--;
    // } else if (tailX + 1 < toX) {
    //   tailX++;
    // }
    // if (tailY - 1 > toY) {
    //   tailY--;
    // } else if (tailY + 1 < toY) {
    //   tailY++;
    // }
    // [distX, distY] = [Math.abs(tailX - toX), Math.abs(tailY - toY)];
    visited.push(`${tailX}_${tailY}`);
  }
  const next = commands.shift();
  return climb(next, [toX, toY], [tailX, tailY], visited, commands);
};

fileToPuzzle("day9-puzzle.txt", (puzzle) => {
  const visited = climb(puzzle.shift(), [0, 0], [0, 0], [`0_0`], puzzle);
  console.log(visited.filter((v, idx) => visited.indexOf(v) === idx));
});
