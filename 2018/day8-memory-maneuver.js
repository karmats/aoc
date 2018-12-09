const { fileToPuzzle } = require("./util");

const countValues = tree => {
  const count = tree.shift();
  const meta = tree.shift();

  let ans = 0;
  for (let i = 0; i < count; i++) {
    ans += countValues(tree);
  }

  for (let i = 0; i < meta; i++) {
    ans += tree.shift();
  }

  return ans;
};

const rootValue = tree => {
  const count = tree.shift();
  const meta = tree.shift();

  if (count) {
    const chtr = [];
    for (let i = 0; i < count; i++) {
      chtr.push(rootValue(tree));
    }
    const metr = [];
    for (let i = 0; i < meta; i++) {
      metr.push(tree.shift());
    }

    let ans = 0;
    metr.forEach(u => {
      const ix = u - 1;
      if (ix >= 0 && ix < chtr.length) {
        ans += chtr[ix];
      }
    });
    return ans;
  } else {
    let ans = 0;
    for (let i = 0; i < meta; i++) {
      ans += tree.shift();
    }
    return ans;
  }
};

fileToPuzzle(
  "./day8-puzzle.txt",
  puzzle => {
    const puzzle2 = puzzle.slice();
    console.log(countValues(puzzle));
    console.log(rootValue(puzzle2));
  },
  { separator: " ", isNumber: true }
);
