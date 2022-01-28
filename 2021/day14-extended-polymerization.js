const { fileToPuzzle } = require("./util");

const calculateCharacters = (start, rules, times) => {
  const pairs = doRounds(start, rules, times);
  return pairsToCount([start[0], start[start.length - 1]], pairs);
};

const doRounds = (start, rules, times) => {
  let pairs = {};
  for (let i = 0; i < start.length - 1; i++) {
    const pair = start[i] + start[i + 1];
    pairs[pair] = 1;
  }
  for (let round = 0; round < times; round++) {
    const pairStrings = Object.keys(pairs);
    const newPairs = {};
    pairStrings.forEach((pair) => {
      const newLetter = rules[pair];
      const [a, b] = [pair[0] + newLetter, newLetter + pair[1]];
      const pairsCount = pairs[pair];
      newPairs[a] = newPairs[a] ? newPairs[a] + pairsCount : pairsCount;
      newPairs[b] = newPairs[b] ? newPairs[b] + pairsCount : pairsCount;
    });
    pairs = newPairs;
  }
  return pairs;
};

const pairsToCount = (firstAndLast, pairs) => {
  let counts = { [firstAndLast[0]]: 1, [firstAndLast[1]]: 1 };
  Object.keys(pairs).forEach((pair) => {
    counts[pair[0]] = counts[pair[0]] ? counts[pair[0]] + pairs[pair] : pairs[pair];
    counts[pair[1]] = counts[pair[1]] ? counts[pair[1]] + pairs[pair] : pairs[pair];
  });
  return Object.keys(counts).reduce((acc, c) => ({ ...acc, [c]: counts[c] / 2 }), {});
};

const extractMaxMin = (letterCounts) =>
  Object.keys(letterCounts).reduce(
    (minMax, c) => {
      const counts = letterCounts[c];
      return [counts < minMax[0] ? counts : minMax[0], counts > minMax[1] ? counts : minMax[1]];
    },
    [Number.MAX_SAFE_INTEGER, 0]
  );

fileToPuzzle("day14-puzzle.txt", (puzzle) => {
  let template = puzzle[0];
  const rules = puzzle.slice(2).reduce((acc, c) => {
    const [from, to] = c.split(" -> ");
    return {
      ...acc,
      [from]: to,
    };
  }, {});

  // Part 1
  const countsPart1 = calculateCharacters(template, rules, 10);
  const [min1, max1] = extractMaxMin(countsPart1);
  console.log(max1 - min1);

  // Part 2
  let countsPart2 = calculateCharacters(template, rules, 40);
  const [min2, max2] = extractMaxMin(countsPart2);
  console.log(max2 - min2);
});
