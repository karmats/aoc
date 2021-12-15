const { fileToPuzzle, findMax } = require("./util");

const FOLD_REGEX = /fold\salong\s([y|x])=(\d*)/;

const toPaperWithDots = (puzzle) => {
  const dots = puzzle.filter(Boolean).map((p) => {
    const [x, y] = p.split(",");
    if (y) {
      return [+x, +y];
    }
    return x;
  });
  const maxX = findMax(dots.filter((d) => typeof d !== "string").map((d) => d[0]));
  const maxY = findMax(dots.filter((d) => typeof d !== "string").map((d) => d[1]));
  const paper = [];
  for (let y = 0; y <= maxY; y++) {
    let xStr = "";
    for (let x = 0; x <= maxX; x++) {
      if (dots.find((d) => d[0] === x && d[1] === y)) {
        xStr += "#";
      } else {
        xStr += ".";
      }
    }
    paper.push(xStr);
  }
  return paper;
};

const toFoldInstructions = (puzzle) =>
  puzzle
    .filter((p) => FOLD_REGEX.test(p))
    .map((p) => {
      const [, along, value] = FOLD_REGEX.exec(p);
      return [along, +value];
    });

const merge = (x1, x2) => {
  let newX = x1 && x2 ? "" : x1 ? x1 : x2;
  if (!newX) {
    for (let x = 0; x < x1.length; x++) {
      if (x1[x] === "." && x2[x] === ".") {
        newX += ".";
      } else {
        newX += "#";
      }
    }
  }
  return newX;
};

const foldPaper = (paper, foldInstruction) => {
  const [along, value] = foldInstruction;
  const newPaper = [];
  if (along === "y") {
    let yInc = value + 1;
    let yDec = value - 1;
    for (; yInc < paper.length || yDec >= 0; yInc++, yDec--) {
      const merged = merge(paper[yInc], paper[yDec]);
      newPaper.unshift(merged);
    }
  } else {
    let xInc = value + 1;
    let xDec = value - 1;
    const mergedXs = [];
    for (; xInc < paper[0].length || xDec >= 0; xInc++, xDec--) {
      const [a, b] = [paper.map((p) => p[xInc]).join(""), paper.map((p) => p[xDec]).join("")];
      const merged = merge(a, b);
      mergedXs.push(merged);
    }
    for (let y = 0; y < mergedXs[0].length; y++) {
      newPaper.push(mergedXs.map((x) => x[y]).join(""));
    }
  }
  return newPaper;
};

const printPaper = (paper) => paper.join("\n");

const countDots = (paper) => paper.reduce((count, c) => c.split("").filter((f) => f === "#").length + count, 0);

fileToPuzzle("day13-puzzle.txt", (puzzle) => {
  let paper = toPaperWithDots(puzzle);
  const foldInstructions = toFoldInstructions(puzzle);
  foldInstructions.forEach((instruction, idx) => {
    paper = foldPaper(paper, instruction);
    if (idx === 0) {
      console.log(countDots(paper));
    }
  });
  console.log(printPaper(paper.map(p => p.split('').reverse().join(''))));
});
