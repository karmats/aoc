import { fileToPuzzle } from "./util.mjs";

fileToPuzzle("day4-puzzle.txt", (puzzle) => {
  // Part 1
  const getSurroundingWords = (x, y) => {
    const xWords = puzzle[y].substring(x, x + 4);
    const yWords = [
      puzzle[y][x],
      puzzle[y + 1] ? puzzle[y + 1][x] : null,
      puzzle[y + 2] ? puzzle[y + 2][x] : null,
      puzzle[y + 3] ? puzzle[y + 3][x] : null,
    ]
      .filter((chr) => !!chr)
      .join("");
    const diagonalWords = [
      [
        puzzle[y][x],
        puzzle[y + 1] ? puzzle[y + 1][x + 1] : null,
        puzzle[y + 2] ? puzzle[y + 2][x + 2] : null,
        puzzle[y + 3] ? puzzle[y + 3][x + 3] : null,
      ]
        .filter((chr) => !!chr)
        .join(""),
      [
        puzzle[y][x],
        puzzle[y + 1] ? puzzle[y + 1][x - 1] : null,
        puzzle[y + 2] ? puzzle[y + 2][x - 2] : null,
        puzzle[y + 3] ? puzzle[y + 3][x - 3] : null,
      ]
        .filter((chr) => !!chr)
        .join(""),
    ];
    return [xWords, yWords, diagonalWords[0], diagonalWords[1]];
  };
  let xmasCounts = 0;
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      const surroundingWords = getSurroundingWords(x, y);
      xmasCounts += surroundingWords.filter((word) => word === "XMAS" || word === "SAMX").length;
    }
  }
  console.log(xmasCounts);

  // Part 2
  const isXmas = (x, y) => {
    if (puzzle[y][x] === "A") {
      const upperLeftChar = puzzle[y - 1] ? puzzle[y - 1][x - 1] : null;
      const lowerLeftChar = puzzle[y + 1] ? puzzle[y + 1][x - 1] : null;
      const upperRightChar = puzzle[y - 1] ? puzzle[y - 1][x + 1] : null;
      const lowerRightChar = puzzle[y + 1] ? puzzle[y + 1][x + 1] : null;
      const firstWord = [upperLeftChar, "A", lowerRightChar].join("");
      const secondWord = [upperRightChar, "A", lowerLeftChar].join("");
      return (firstWord === "MAS" || firstWord === "SAM") && (secondWord === "MAS" || secondWord === "SAM");
    }
    return false;
  };
  let xmasCounts2 = 0;
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (isXmas(x, y)) {
        xmasCounts2++;
      }
    }
  }

  console.log(xmasCounts2);
});
