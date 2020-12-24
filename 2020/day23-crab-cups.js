const PUZZLE = "739862541";

const cups = PUZZLE.split("").map((c) => +c);

const makeMove = (currentCup, cups) => {
  const cIdx = cups.indexOf(currentCup);
  const cupLength = cups.length;
  const movedCups = [];
  let nextCup;
  let destinationCup = currentCup === 1 ? 9 : currentCup - 1;
  for (let i = 1; i < 5; i++) {
    const cup = cups[(i + cIdx) % cupLength];
    if (i < 4) {
      movedCups.push(cup);
    } else {
      nextCup = cup;
    }
  }
  const newCups = cups.filter((c) => !movedCups.includes(c));
  while (movedCups.indexOf(destinationCup) >= 0) {
    destinationCup = destinationCup === 1 ? 9 : destinationCup - 1;
  }
  const insertIdx = newCups.indexOf(destinationCup) + 1;
  newCups.splice(insertIdx, 0, ...movedCups);
  return {
    nextCup,
    cups: newCups,
  };
};

const doRounds = (currentCup, cups, round) => {
  if (round === 0) {
    return cups;
  }
  const move = makeMove(currentCup, cups);
  return doRounds(move.nextCup, move.cups, round - 1);
};

const cupsToResult = (cups) => {
  let finalResult = "";
  const oneIdx = cups.indexOf(1);
  for (let i = 1; i < cups.length; i++) {
    finalResult += cups[(oneIdx + i) % cups.length];
  }
  return finalResult;
};
console.log(cupsToResult(doRounds(cups[0], cups, 100)));
