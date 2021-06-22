const { fileToPuzzle } = require("./util");

const EGGNOGG_LITERS = 150;

function getCombinations(total, buckets, n, i) {
  i = i || 0;

  if (n < 0) {
    return 0;
  } else if (total === 0) {
    return 1;
  } else if (i === buckets.length || total < 0) {
    return 0;
  }
  return getCombinations(total, buckets, n, i + 1) + getCombinations(total - buckets[i], buckets, n - 1, i + 1);
}

fileToPuzzle("day17-puzzle.txt", (puzzle) => {
  const buckets = puzzle.map(Number).sort((a, b) => b - a);

  // Part 1
  console.log(getCombinations(EGGNOGG_LITERS, buckets, buckets.length));

  // Part 2
  let result;
  for (let i = 1; !result; i++) {
    result = getCombinations(EGGNOGG_LITERS, buckets, i);
  }
  console.log(result);
});
