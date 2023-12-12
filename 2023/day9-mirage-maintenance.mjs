import { fileToPuzzle, sum } from "./util.mjs";

const getPredictions = (arr, acc, previous = false) => {
  acc.push(previous ? arr[0] : arr[arr.length - 1]);
  const first = arr[0];
  if (arr.every((a) => a === first)) {
    return acc;
  }
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    newArr.push(arr[i + 1] - arr[i]);
  }
  return getPredictions(newArr, acc, previous);
};

fileToPuzzle("day9-puzzle.txt", (input) => {
  const report = input.map((i) => i.split(" ").map(Number));

  // Part 1
  const nextValues = report.map((arr) => sum(getPredictions(arr, [])));
  console.log(sum(nextValues));

  // Part 2
  const previousValues = report.map((arr) => getPredictions(arr, [], true).reverse());
  const pVal = previousValues.map((p) => p.reduce((acc, c) => c - acc, 0));
  console.log(sum(pVal));
});
