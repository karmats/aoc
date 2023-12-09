import { fileToPuzzle } from "./util.mjs";

const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const CARDS2 = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

const compareHands = (hand1, hand2, cards = CARDS) => {
  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] !== hand2[i]) {
      return cards.indexOf(hand1[i]) - cards.indexOf(hand2[i]);
    }
  }
  return 0;
};

fileToPuzzle("day7-puzzle.txt", (sets) => {
  const part1 = [];
  const part2 = [];
  sets.forEach((set) => {
    const [hand, bid] = set.split(" ");
    let result = [0, 0, 0, 0, 0, 0];
    let result2 = [0, 0, 0, 0, 0, 0];
    let jokers = 0;
    for (let h = hand; h.length > 0; ) {
      const [curr, rest] = [h[0], h.substring(1)];
      const split = rest.split(curr);
      const count = split.length;
      if (curr === "J") {
        jokers = count;
      } else {
        result2[count]++;
      }
      result[count]++;
      h = split.join("");
    }
    if (jokers > 0) {
      const lastValuedIdx =
        5 -
        result2
          .slice()
          .reverse()
          .findIndex((v) => v !== 0);
      if (lastValuedIdx > 5) {
        result2[5] = 1;
      } else {
        result2[lastValuedIdx] = result2[lastValuedIdx] - 1;
        result2[lastValuedIdx + jokers] = 1;
      }
    }
    part1.push({
      hand,
      bid,
      weight: result.reduce((acc, c, idx) => acc + c * Math.pow(idx, 2), 0),
    });
    part2.push({
      hand,
      bid,
      weight: result2.reduce((acc, c, idx) => acc + c * Math.pow(idx, 2), 0),
    });
  });
  const sorted = part1.sort((a, b) => (a.weight - b.weight === 0 ? compareHands(a.hand, b.hand) : a.weight - b.weight));
  console.log(sorted.reduce((acc, c, idx) => acc + +c.bid * (idx + 1), 0));

  const sorted2 = part2.sort((a, b) => (a.weight - b.weight === 0 ? compareHands(a.hand, b.hand, CARDS2) : a.weight - b.weight));
  console.log(sorted2.reduce((acc, c, idx) => acc + +c.bid * (idx + 1), 0));
});
