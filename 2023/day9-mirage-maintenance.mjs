import { fileToPuzzle, sum } from "./util.mjs";

const getPredictions = (arr, acc) => {
  acc.push(arr[arr.length - 1]);
  const first = arr[0];
  if (arr.every((a) => a === first)) {
    return acc;
  }
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    newArr.push(arr[i + 1] - arr[i]);
  }
  return getPredictions(newArr, acc);
};

fileToPuzzle("day9-puzzle.txt", (input) => {
  const report = input.map((i) => i.split(" ").map(Number));

  const nextValues = report.map((arr) => sum(getPredictions(arr, [])));
  console.log(sum(nextValues));
});
