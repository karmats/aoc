const puzzle = [2, 15, 0, 9, 1, 20];

const play = (times) => {
  const turns = puzzle.slice();
  const memory = new Map();
  turns.forEach((n, i) => {
    memory.set(n, i + 1);
  });
  let current = 0;
  for (let turn = turns.length + 1; turn < times; turn++) {
    if (memory.has(current)) {
      const lt = memory.get(current);
      memory.set(current, turn);
      current = turn - lt;
    } else {
      memory.set(current, turn);
      current = 0;
    }
  }
  return current;
};

console.log(play(2020));
console.log(play(30000000));
