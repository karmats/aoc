const { fileToPuzzle } = require("./util");

const play = (p1Cards, p2Cards) => {
  const [c1, ...rest1] = p1Cards;
  const [c2, ...rest2] = p2Cards;
  if (c1 > c2) {
    return [[...rest1, c1, c2], rest2];
  } else {
    return [rest1, [...rest2, c2, c1]];
  }
};

const calculateWinningScore = (winningCards) => winningCards.reduce((total, card, idx, arr) => total + card * (arr.length - idx), 0);

fileToPuzzle(
  "day22-puzzle.txt",
  (puzzle) => {
    let [p1Cards, p2Cards] = puzzle.filter((p) => !!p.length).map((p) => p.split("\n").filter(Boolean).map(Number));

    // Part 1
    while (p1Cards.length > 0 && p2Cards.length > 0) {
      [p1Cards, p2Cards] = play(p1Cards, p2Cards);
    }
    const winningCards = p1Cards.length ? p1Cards : p2Cards;
    console.log(calculateWinningScore(winningCards));
  },
  {
    separator: /Player \d:/,
  }
);
