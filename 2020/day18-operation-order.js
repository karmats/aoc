const { fileToPuzzle } = require("./util");

const calculateSimpleOperation = (operation) => {
  return operation.split(" ").reduce((result, c, idx, arr) => {
    if (idx > 0) {
      const op = arr[idx - 1];
      if (idx % 2 === 0) {
        if (op === "+") {
          return result + Number(c);
        } else if (op === "*") {
          return result * Number(c);
        } else {
          console.log("errors", op);
        }
      }
    } else {
      return Number(c);
    }
    return result;
  }, 0);
};

const calculateAdvancedOperation = (operation) => {
  const plusIdx = operation.indexOf("+");
  if (plusIdx < 0) {
    return calculateSimpleOperation(operation);
  }
  let l = plusIdx - 2;
  while (l >= 0 && operation[l] !== " ") {
    l--;
  }
  let r = plusIdx + 2;
  while (r < operation.length && operation[r] !== " ") {
    r++;
  }
  const left = operation.substring(l + 1, plusIdx);
  const right = operation.substring(plusIdx + 1, r);
  const plusOp = operation.substring(l + 1, r);
  return calculateAdvancedOperation(operation.replace(plusOp, Number(left) + Number(right)));
};

const calculate = (operation, calcOperation) => {
  const closingPareIdx = operation.indexOf(")");
  if (closingPareIdx < 0) {
    return calcOperation(operation);
  }
  for (let i = closingPareIdx; i >= 0; i--) {
    if (operation[i] === "(") {
      const op = operation.substring(i + 1, closingPareIdx);
      const opWithPare = operation.substring(i, closingPareIdx + 1);
      return calculate(operation.replace(opWithPare, calcOperation(op)), calcOperation);
    }
  }
};

fileToPuzzle("day18-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(puzzle.reduce((sum, operation) => sum + calculate(operation, calculateSimpleOperation), 0));
  // Part 2
  console.log(puzzle.reduce((sum, operation) => sum + calculate(operation, calculateAdvancedOperation), 0));
});
