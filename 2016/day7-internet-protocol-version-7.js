const { fileToPuzzle } = require("./util");

const splitBrackets = (ip) => {
  const splittedLeft = ip.split("[");
  const outsideBrackets = [];
  const withinBrackets = [];
  splittedLeft.forEach((splitted, idx) => {
    const splittedRight = splitted.split("]");
    if (splittedRight.length > 1) {
      withinBrackets.push(splittedRight[0]);
      outsideBrackets.push(splittedRight[1]);
    } else if (idx % 2 === 0) {
      outsideBrackets.push(splitted);
    } else {
      withinBrackets.push(splitted);
    }
  });
  return [withinBrackets, outsideBrackets];
};

const isAbba = (str) => {
  if (str.split("").every((s) => s === str[0])) {
    return false;
  }
  for (let i = 0; i < 2; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
};
const hasAbba = (str) => {
  for (let start = 0, end = 3; end < str.length; start++, end++) {
    if (isAbba(str.substring(start, end + 1))) {
      return true;
    }
  }
  return false;
};

const getAbas = (str) => {
  const abas = [];
  for (let i = 0; i < str.length - 2; i++) {
    if (str[i] === str[i + 2]) {
      abas.push(str[i] + str[i + 1] + str[i + 2]);
    }
  }
  return abas;
};

const isSupportTls = (ip) => {
  const [withinBrackets, outsideBrackets] = splitBrackets(ip);
  for (let i = 0; i < withinBrackets.length; i++) {
    if (hasAbba(withinBrackets[i])) {
      return false;
    }
  }
  for (let i = 0; i < outsideBrackets.length; i++) {
    if (hasAbba(outsideBrackets[i])) {
      return true;
    }
  }
  return false;
};

const isSupportSsl = (ip) => {
  const [withinBrackets, outsideBrackets] = splitBrackets(ip);
  const abas = outsideBrackets.reduce((acc, c) => acc.concat(getAbas(c)), []);
  const babs = withinBrackets.reduce((acc, c) => acc.concat(getAbas(c)), []);
  return abas.some((aba) => babs.includes(aba[1] + aba[0] + aba[1]));
};

fileToPuzzle("day7-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(puzzle.filter(isSupportTls).length);
  // Part 2
  console.log(puzzle.filter(isSupportSsl).length);
});
