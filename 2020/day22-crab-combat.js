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

const combat = (p1Cards, p2Cards) => {
  const seen = new Set();
  while (p1Cards.length && p2Cards.length) {
    const key = p1Cards.join(",") + "|" + p2Cards.join(",");
    if (seen.has(key)) {
      return [1, p1Cards];
    }
    seen.add(key);

    const c1 = p1Cards.shift();
    const c2 = p2Cards.shift();

    let win;
    if (p1Cards.length >= c1 && p2Cards.length >= c2) {
      [win] = combat(p1Cards.slice(0, c1), p2Cards.slice(0, c2));
    } else {
      win = c1 > c2 ? 1 : 2;
    }

    if (win === 1) {
      p1Cards.push(c1);
      p1Cards.push(c2);
    } else {
      p2Cards.push(c2);
      p2Cards.push(c1);
    }
  }

  return p1Cards.length ? [1, p1Cards] : [2, p2Cards];
};

const calculateWinningScore = (winningCards) => winningCards.reduce((total, card, idx, arr) => total + card * (arr.length - idx), 0);

const toCards = (puzzle) => puzzle.filter((p) => !!p.length).map((p) => p.split("\n").filter(Boolean).map(Number));

fileToPuzzle(
  "day22-puzzle.txt",
  (puzzle) => {
    let [p1Cards, p2Cards] = toCards(puzzle);

    // Part 1
    while (p1Cards.length > 0 && p2Cards.length > 0) {
      [p1Cards, p2Cards] = play(p1Cards, p2Cards);
    }
    const winningCards = p1Cards.length ? p1Cards : p2Cards;
    console.log(calculateWinningScore(winningCards));

    // Part 2
    [p1Cards, p2Cards] = toCards(puzzle);
    const [, winningCardsP2] = combat(p1Cards, p2Cards);
    console.log(calculateWinningScore(winningCardsP2));
  },
  {
    separator: /Player \d:/,
  }
);
