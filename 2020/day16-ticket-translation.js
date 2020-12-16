const { fileToPuzzle } = require("./util");

const INST_REGEX = /(.*):\s(\d*)-(\d*)\sor\s(\d*)-(\d*)/;

const toTicketMap = (puzzle) =>
  puzzle.reduce(
    (result, row) => {
      const instruction = INST_REGEX.exec(row);
      if (instruction) {
        return {
          ...result,
          map: {
            ...result.map,
            instructions: {
              ...result.map.instructions,
              [instruction[1].split(" ").join("")]: [
                [+instruction[2], +instruction[3]],
                [+instruction[4], +instruction[5]],
              ],
            },
          },
        };
      } else if (row === "your ticket:") {
        return {
          ...result,
          inMyTicket: true,
        };
      } else if (row === "nearby tickets:") {
        return {
          ...result,
          inMyTicket: false,
          inNearbyTickets: true,
        };
      }
      return {
        ...result,
        map: {
          ...result.map,
          myTicket: result.map.myTicket.concat(result.inMyTicket && row ? row.split(",").map(Number) : []),
          nearByTickets: result.map.nearByTickets.concat([result.inNearbyTickets ? row.split(",").map(Number) : []]),
        },
      };
    },
    {
      map: { myTicket: [], nearByTickets: [], instructions: {} },
      inMyTicket: false,
      inNearbyTickets: false,
    }
  );

const hasNumber = (num, instructions) => {
  for (let key in instructions) {
    const [[minA, maxA], [minB, maxB]] = instructions[key];
    if ((num >= minA && num <= maxA) || (num >= minB && num <= maxB)) {
      return true;
    }
  }
  return false;
};

const testTicket = (ticketNumber, instruction) => {
  const [[minA, maxA], [minB, maxB]] = instruction;
  return (ticketNumber >= minA && ticketNumber <= maxA) || (ticketNumber >= minB && ticketNumber <= maxB);
};

const getTicketIndexes = (instructions, validTickets) => {
  const ticketIndexes = Object.keys(instructions).reduce((idxs, instr) => ({ ...idxs, [instr]: [] }), {});
  for (let i = 0; i < validTickets[0].length; i++) {
    const indexNumbers = validTickets.reduce((numbers, ticket) => numbers.concat(ticket[i]), []);
    for (let key in instructions) {
      if (indexNumbers.every((num) => testTicket(num, instructions[key]))) {
        ticketIndexes[key] = ticketIndexes[key].concat(i);
      }
    }
  }
  return ticketIndexes;
};

const deleteAndRemoveInstruction = (idx, instruction, ticketIndexes) => {
  const result = {};
  for (let key in ticketIndexes) {
    if (key !== instruction) {
      result[key] = ticketIndexes[key].filter((i) => i !== idx);
    }
  }
  return result;
};

const findFinalIndexes = (ticketIndexes, finals) => {
  if (!Object.keys(ticketIndexes).length) {
    return finals;
  }
  for (let key in ticketIndexes) {
    if (ticketIndexes[key].length === 1) {
      const finalIdx = ticketIndexes[key][0];
      finals[key] = finalIdx;
      return findFinalIndexes(deleteAndRemoveInstruction(finalIdx, key, ticketIndexes), finals);
    }
  }
};

fileToPuzzle("day16-puzzle.txt", (puzzle) => {
  const ticketMap = toTicketMap(puzzle).map;

  // Part 1
  const invalidNumbers = ticketMap.nearByTickets
    .reduce((acc, c) => acc.concat(c))
    .filter((ticketNo) => !hasNumber(ticketNo, ticketMap.instructions));
  console.log(invalidNumbers.reduce((sum, n) => sum + n, 0));

  // Part 2
  const validTickets = ticketMap.nearByTickets
    .filter((ticket) => ticket.length && !ticket.some((n) => invalidNumbers.includes(n)))
    .concat([ticketMap.myTicket]);

  const ticketIndexes = getTicketIndexes(ticketMap.instructions, validTickets);
  const finalIndexes = findFinalIndexes(ticketIndexes, {});
  const departureIndexes = Object.keys(finalIndexes).reduce(
    (dep, instr) => (instr.startsWith("departure") ? dep.concat(finalIndexes[instr]) : dep),
    []
  );
  console.log(departureIndexes.reduce((prod, i) => prod * ticketMap.myTicket[i], 1));
});
