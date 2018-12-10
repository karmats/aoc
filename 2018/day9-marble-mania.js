const PLAYERS = 416;
const LAST_MARBLE_POINT = 71617*100;

class MarbleGame {
  constructor() {
    this.board = [0];
    this.currIdx = 0;
  }
  play(marble) {
    if (marble % 23 === 0) {
      let nextIdx = this.currIdx - 7;
      if (nextIdx < 0) {
        nextIdx = this.board.length + nextIdx;
      }
      const score = marble + this.board.splice(nextIdx + 1, 1).pop();
      this.currIdx = nextIdx % this.board.length;
      return score;
    }
    const nextIdx = (this.currIdx + 2) % this.board.length;
    this.board.splice(nextIdx + 1, 0, marble);
    this.currIdx = nextIdx;
    return 0;
  }
}

let currentPlayer = 0;
const game = new MarbleGame();
const scoreCard = new Array(PLAYERS).fill(0);
for (let marble = 1; marble <= LAST_MARBLE_POINT; marble++) {
  const score = game.play(marble);
  scoreCard[currentPlayer] = scoreCard[currentPlayer] + score;
  currentPlayer = (currentPlayer + 1) % PLAYERS;
}
console.log(scoreCard.reduce((acc, c) => (c > acc ? c : acc), 0));
