import { fileToPuzzle } from "./util.mjs";

const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const compareHands = (hand1, hand2) => {
  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] !== hand2[i]) {
      return CARDS.indexOf(hand1[i]) - CARDS.indexOf(hand2[i]);
    }
  }
  return 0;
};

fileToPuzzle("day7-puzzle.txt", (sets) => {
  const part1 = [];
  sets.forEach((set) => {
    const [hand, bid] = set.split(" ");
    let result = [0, 0, 0, 0, 0, 0];
    for (let h = hand; h.length > 0; ) {
      const [curr, rest] = [h[0], h.substring(1)];
      const split = rest.split(curr);
      const count = split.length;
      result[count]++;
      h = split.join("");
    }
    part1.push({
      hand,
      bid,
      weight: result.reduce((acc, c, idx) => {
        return acc + c * Math.pow(idx, 2);
      }, 0),
    });
  });
  const sorted = part1.sort((a, b) => (a.weight - b.weight === 0 ? compareHands(a.hand, b.hand) : a.weight - b.weight));
  console.log(sorted.reduce((acc, c, idx) => acc + +c.bid * (idx + 1), 0));
});
