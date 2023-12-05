import { fileToPuzzle, isNumber, sum } from "./util.mjs";

const checkWin = (winning, mine) => {
  let wins = 0;
  winning.forEach((num) => {
    if (mine.includes(num)) {
      wins++;
    }
  });
  return wins;
};

fileToPuzzle("day4-puzzle.txt", (scoreCard) => {
  const [winningNumbers, myNumbers] = scoreCard.reduce(
    (nums, card) => {
      const [winning, mine] = card.split("|");
      const winningNumbers = winning
        .split(" ")
        .filter((num) => isNumber(num) && num.trim() !== "")
        .map(Number);
      const myNumbers = mine
        .split(" ")
        .filter((num) => num.trim() !== "")
        .map(Number);
      nums[0].push(winningNumbers);
      nums[1].push(myNumbers);
      return nums;
    },
    [[], []]
  );
  let score = 0;
  let copies = Array.from(new Array(winningNumbers.length), () => 1);
  winningNumbers.forEach((winningCard, idx) => {
    const mine = myNumbers[idx];
    const wins = checkWin(winningCard, mine);

    // Part 1
    if (wins > 0) {
      score += Math.pow(2, wins - 1);
    }
    // Part 2
    for (let i = idx + 1, w = 0; i < winningNumbers.length && w < wins; i++, w++) {
      copies[i] += copies[idx];
    }
  });
  // Part 1
  console.log(score);

  // Part 2
  console.log(sum(copies));
});
