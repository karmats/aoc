const { fileToPuzzle } = require("./util");

const INSTRUCTION_REGEX = /^([a-z]*)\s(\d)*$/;

const doCourse = (instructions) =>
  instructions.reduce(
    (acc, c) => {
      const [direction, steps] = c;
      switch (direction) {
        case "forward":
          return [acc[0] + steps, acc[1], acc[2] + acc[1] * steps];
        case "up":
          return [acc[0], acc[1] - steps, acc[2]];
        case "down":
          return [acc[0], acc[1] + steps, acc[2]];
        default:
          throw new Error(`Unknown direction: ${direction}`);
      }
    },
    [0, 0, 0]
  );

fileToPuzzle("day2-puzzle.txt", (puzzle) => {
  const instructions = puzzle.map((p) => {
    const regexResult = INSTRUCTION_REGEX.exec(p);
    return [regexResult[1], +regexResult[2]];
  });

  // Part 1
  const position = doCourse(instructions);
  console.log(position[0] * position[1]);

  // Part 2
  console.log(position[0] * position[2]);
});
