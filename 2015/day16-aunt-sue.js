const { fileToPuzzle } = require("./util");

const COMPOUNDS_REGEX = /^Sue\s(\d*):\s([a-z]*):\s(\d*),\s([a-z]*):\s(\d*),\s([a-z]*):\s(\d*)/;

const MFCSAM_SUE = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const isCorrectSuePart1 = (sue) =>
  Object.keys(sue).every((key) => {
    if (key === "sue") {
      return true;
    }
    return MFCSAM_SUE[key] === sue[key];
  });
const isCorrectSuePart2 = (sue) =>
  Object.keys(sue).every((key) => {
    if (key === "sue") {
      return true;
    } else if (key === "cats" || key === "trees") {
      return sue[key] > MFCSAM_SUE[key];
    } else if (key === "pomeranians" || key === "goldfish") {
      return sue[key] < MFCSAM_SUE[key];
    }
    return MFCSAM_SUE[key] === sue[key];
  });

fileToPuzzle("day16-puzzle.txt", (puzzle) => {
  const compounds = puzzle.reduce((acc, c) => {
    const regexRes = COMPOUNDS_REGEX.exec(c);
    if (regexRes.length !== 8) {
      console.error(`Something fishy with '${c}'`);
    }
    return acc.concat({
      sue: +regexRes[1],
      [regexRes[2]]: +regexRes[3],
      [regexRes[4]]: +regexRes[5],
      [regexRes[6]]: +regexRes[7],
    });
  }, []);
  for (let i = 0; i < compounds.length; i++) {
    if (isCorrectSuePart1(compounds[i])) {
      console.log(compounds[i].sue);
    }
    if (isCorrectSuePart2(compounds[i])) {
      console.log(compounds[i].sue);
    }
  }
});
