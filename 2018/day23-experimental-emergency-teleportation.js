const { fileToPuzzle } = require("./util");

const distance = (bot, otherBot) => {
    const botPos = bot.position;
    const otherBotPos = otherBot.position;
  return (
    Math.abs(botPos[0] - otherBotPos[0]) +
    Math.abs(botPos[1] - otherBotPos[1]) +
    Math.abs(botPos[2] - otherBotPos[2])
  );
};
const regex = /pos=<(.+)>,\sr=(\d*)/;
fileToPuzzle("./day23-puzzle.txt", puzzle => {
  const bots = puzzle.map(p => {
    const regexed = regex.exec(p);
    return {
      position: regexed[1].split(",").map(n => +n),
      radius: +regexed[2]
    };
  });
  const strongestBot = bots.reduce(
    (acc, c) => (c.radius > acc.radius ? c : acc),
    bots[0]
  );
  let inRange = 0;
  bots.forEach(bot => {
    if (distance(strongestBot, bot) <= strongestBot.radius) {
      inRange++;
    }
  });
  console.log(inRange);
});
