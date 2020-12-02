const { fileToPuzzle } = require("./util");

const REGEX = /^(\d*)-(\d*)\s([a-z]):\s([a-z]*)/;

const isValidPart1 = (policy) => {
  const noOfChars = policy.password
    .split("")
    .reduce((count, c) => (c === policy.char ? count + 1 : count), 0);
  return noOfChars >= policy.min && noOfChars <= policy.max;
};

const isValidPart2 = (policy) => {
  const isInPos1 = policy.password[policy.min - 1] === policy.char;
  const isInPos2 = policy.password[policy.max - 1] === policy.char;
  return isInPos1 ? !isInPos2 : isInPos2;
};

fileToPuzzle("day2-puzzle.txt", (puzzle) => {
  const policies = puzzle.map((p) => {
    const regexArr = REGEX.exec(p);
    return {
      min: +regexArr[1],
      max: +regexArr[2],
      char: regexArr[3],
      password: regexArr[4],
    };
  });
  const totalValidPart1 = policies.reduce(
    (sum, p) => (isValidPart1(p) ? sum + 1 : sum),
    0
  );
  console.log(totalValidPart1);

  const totalValidPart2 = policies.reduce(
    (sum, p) => (isValidPart2(p) ? sum + 1 : sum),
    0
  );
  console.log(totalValidPart2);
});
