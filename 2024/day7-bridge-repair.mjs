import { fileToPuzzle } from "./util.mjs";

const possibleResults = (operators, results, operands = ["+", "*"]) => {
  if (operators.length === 0) {
    return results;
  }
  const operator = operators.shift();
  const res = [];
  for (let i = 0; i < results.length; i++) {
    if (operands.includes("+")) {
      res.push(results[i] + operator);
    }
    if (operands.includes("*")) {
      res.push(results[i] * operator);
    }
    if (operands.includes("||")) {
      res.push(+(results[i].toString() + operator.toString()));
    }
  }
  return possibleResults(operators, res, operands);
};
fileToPuzzle("day7-puzzle.txt", (puzzle) => {
  let p1 = 0;
  let p2 = 0;
  puzzle.forEach((calibration) => {
    const [resultString, operatorsString] = calibration.split(":");
    const result = +resultString;
    const operators = operatorsString.trim().split(" ").map(Number);

    const resultsP1 = possibleResults(operators.slice(1), [operators[0]]);
    if (resultsP1.includes(result)) {
      p1 += result;
    }
    const resultsP2 = possibleResults(operators.slice(1), [operators[0]], ["+", "*", "||"]);
    if (resultsP2.includes(result)) {
      p2 += result;
    }
  });
  // Part 1
  console.log(p1);

  // Part 2
  console.log(p2);
});
