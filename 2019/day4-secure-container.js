const min = 234208;
const max = 765869;

const meetCriteria = password => {
  const pwdString = password + "";
  const doubles = [];
  const groups = [];
  for (let i = 0; i < pwdString.length; i++) {
    if (i !== 0) {
      if (+pwdString[i] < +pwdString[i - 1]) {
        return false;
      }
      if (pwdString[i] === pwdString[i - 1]) {
        doubles.push(pwdString[i]);
      }
      if (
        i > 1 &&
        pwdString[i] === pwdString[i - 1] &&
        pwdString[i - 1] === pwdString[i - 2]
      ) {
        groups.push(pwdString[i]);
      }
    }
  }
  return {
    part1: doubles.length > 0,
    part2: doubles.filter(d => groups.indexOf(d) < 0).length > 0
  };
};
let combinationsPart1 = 0;
let combinationsPart2 = 0;
for (let i = min; i <= max; i++) {
  const match = meetCriteria(i);
  if (match.part1) {
    combinationsPart1++;
  }
  if (match.part2) {
    combinationsPart2++;
  }
}
console.log(combinationsPart1);
console.log(combinationsPart2);
