const { fileToPuzzle } = require("./util");

fileToPuzzle("day1-puzzle.txt", (puzzle) => {
  const moves = puzzle[0].split("");

  // Part 1
  const santaFloor = moves.reduce((floor, move) => (move === "(" ? floor + 1 : floor - 1), 0);
  console.log(santaFloor);

  // Part 2
  let floor = 0;
  for (let i = 0; i < moves.length; i++) {
    floor = moves[i] === "(" ? floor + 1 : floor - 1;
    if (floor < 0) {
      console.log(i + 1);
      break;
    }
  }
});
