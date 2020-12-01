const { fileToPuzzle } = require("./util");

const YEAR = 2020;
const find2020Sum = (numbers, amount) =>
  amount === 2
    ? numbers.reduce((acc, a, idx, arr) => {
        const sum = arr
          .slice(idx)
          .reduce((res, b) => (a + b === YEAR ? [a, b] : res), []);
        if (sum.length) {
          return sum[0] * sum[1];
        }
        return acc;
      }, 0)
    : numbers.reduce((acc, a, idx, arr) => {
        const sum = arr.slice(idx).reduce((res, b, i, barr) => {
          const s = barr
            .slice(i)
            .reduce((resb, c) => (a + b + c === YEAR ? [a, b, c] : resb), []);
          if (s.length) {
            return s;
          }
          return res.slice(s);
        }, []);
        if (sum.length) {
          return sum[0] * sum[1] * sum[2];
        }
        return acc;
      }, 0);

fileToPuzzle(
  "day1-puzzle.txt",
  (numbers) => {
    console.log(find2020Sum(numbers, 2));
    console.log(find2020Sum(numbers, 3));
  },
  {
    isNumber: true,
  }
);
