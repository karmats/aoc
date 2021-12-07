const { fileToPuzzle } = require("./util");

const toBoardsAndNumbers = (puzzle) => {
  const [numbersString, ...boardsArray] = puzzle;
  const numbers = numbersString.split(",");
  const boards = [];
  let boardIdx = -1;
  for (let i = 0; i < boardsArray.length; i++) {
    const current = boardsArray[i];
    if (current === "") {
      boardIdx++;
      boards[boardIdx] = [];
    } else {
      boards[boardIdx].push(
        current
          .split(" ")
          .map((c) => c.trim())
          .filter((c) => c !== "")
      );
    }
  }
  return { boards, numbers };
};

const doRound = (boards, number) => {
  boards.forEach((board) => {
    board.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === number) {
          row[i] = "*" + number;
        }
      }
    });
  });
};

const checkWin = (boards) => {
  const winners = [];
  for (let boardIdx = 0; boardIdx < boards.length; boardIdx++) {
    const board = boards[boardIdx];
    // Row
    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      const row = board[rowIdx];
      if (row.every((num) => num.indexOf("*") >= 0)) {
        winners.push(board);
      }
    }
    // Column
    for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
      const col = Array.from(new Array(board[0].length)).map((_, idx) => board[idx][colIdx]);
      if (col.every((num) => num.indexOf("*") >= 0)) {
        winners.push(board);
      }
    }
  }
  return winners;
};

const calculateResult = (board, number) =>
  board.reduce((sum, row) => {
    const unmarkedSum = row
      .filter((num) => num.indexOf("*") < 0)
      .map(Number)
      .reduce((acc, c) => c + acc, 0);
    return sum + unmarkedSum;
  }, 0) * +number;

fileToPuzzle("day4-puzzle.txt", (puzzle) => {
  let { boards, numbers } = toBoardsAndNumbers(puzzle);
  const originalBoardsLength = boards.length;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    doRound(boards, number);
    const winners = checkWin(boards);
    if (winners.length) {
      const board = winners[0];
      // Part 1
      if (boards.length === originalBoardsLength) {
        console.log(calculateResult(board, number));
      }
      boards = boards.filter((b) => winners.indexOf(b) < 0);
      // Part 2
      if (boards.length === 0) {
        console.log(calculateResult(board, number));
      }
    }
  }
});
