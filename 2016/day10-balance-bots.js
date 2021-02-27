const { fileToPuzzle } = require("./util");

const COMPARE_LOW = "17";
const COMPARE_HIGH = "61";

const VALUE_TO_BOT_REGEX = /^value\s(\d*)\sgoes\sto\sbot\s(\d*)$/;
const BOT_GIVES_REGEX = /^bot\s(\d*)\sgives\slow\sto\s(bot|output)\s(\d*)\sand\shigh\sto\s(bot|output)\s(\d*)$/;

const exchangeMicroChips = (bot, microChips, botGives) => {
  if (microChips.bots[bot].length === 2) {
    if (!botGives[bot].length) {
      throw new Error(`Expected bot ${bot} to have some instructions.`);
    }
    const [lowest, highest] = microChips.bots[bot].splice(0, 2).sort((a, b) => +a - +b);
    const { lowRecieve, lowRecieveNo, highRecieve, highRecieveNo } = botGives[bot].shift();
    if (highest === COMPARE_HIGH && lowest === COMPARE_LOW) {
      // Part 1
      console.log(bot);
    }
    if (lowRecieve === "bot") {
      microChips.bots[lowRecieveNo] = microChips.bots[lowRecieveNo] ? microChips.bots[lowRecieveNo].concat(lowest) : [lowest];
    } else {
      microChips.outputs[lowRecieveNo] = microChips.outputs[lowRecieveNo] ? microChips.outputs[lowRecieveNo].concat(lowest) : [lowest];
    }
    if (highRecieve === "bot") {
      microChips.bots[highRecieveNo] = microChips.bots[highRecieveNo] ? microChips.bots[highRecieveNo].concat(highest) : [highest];
    } else {
      microChips.outputs[highRecieveNo] = microChips.outputs[highRecieveNo] ? microChips.outputs[highRecieveNo].concat(highest) : [highest];
    }
    const botsWithTwo = Object.keys(microChips.bots).filter((bot) => microChips.bots[bot].length === 2);
    if (botsWithTwo.length) {
      exchangeMicroChips(botsWithTwo.pop(), microChips, botGives);
    }
  }
};

const doBotInstructions = (valueToBots, botGives) => {
  let microChips = { bots: {}, outputs: {} };
  valueToBots.forEach((valueToBot) => {
    const { value, bot } = valueToBot;
    microChips.bots[bot] = microChips.bots[bot] ? microChips.bots[bot].concat(value) : [value];
  });
  exchangeMicroChips(
    Object.keys(microChips.bots)
      .filter((bot) => microChips.bots[bot].length === 2)
      .pop(),
    microChips,
    botGives
  );
  // Part 2
  console.log(
    Object.keys(microChips.outputs)
      .filter((o) => +o < 3)
      .reduce((prod, o) => +microChips.outputs[o].pop() * prod, 1)
  );

  return { microChips, botGives };
};

fileToPuzzle("day10-puzzle.txt", (puzzle) => {
  const valueToBots = puzzle
    .filter((p) => VALUE_TO_BOT_REGEX.test(p))
    .map((instruction) => {
      const valueToBot = VALUE_TO_BOT_REGEX.exec(instruction);
      const [, value, bot] = valueToBot;
      return { value, bot };
    });
  const botGives = puzzle
    .filter((p) => BOT_GIVES_REGEX.test(p))
    .reduce((bots, instruction, index) => {
      const [, bot, lowRecieve, lowRecieveNo, highRecieve, highRecieveNo] = BOT_GIVES_REGEX.exec(instruction);
      const instr = {
        lowRecieve,
        lowRecieveNo,
        highRecieve,
        highRecieveNo,
        order: index,
      };
      bots[bot] = bots[bot] ? bots[bot].concat(instr) : [instr];
      return bots;
    }, {});
  doBotInstructions(valueToBots, botGives);
});
