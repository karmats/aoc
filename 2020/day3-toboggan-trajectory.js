const { fileToPuzzle } = require("./util");

const treeHits = (map, slopePattern) => {
  const [right, down] = slopePattern;
  let hits = 0;
  let x, y;
  for (x = 0, y = 0; y < map.length; x = (x + right) % (map[y].length - 1), y = y + down) {
    if (map[y][x] === "#") {
      hits++;
    }
  }
  return hits;
};

fileToPuzzle("day3-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(treeHits(puzzle, [3, 1]));
  // Part 2
  console.log(
    treeHits(puzzle, [1, 1]) * treeHits(puzzle, [3, 1]) * treeHits(puzzle, [5, 1]) * treeHits(puzzle, [7, 1]) * treeHits(puzzle, [1, 2])
  );
});
