const { fileToPuzzle } = require("./util");

const findBus = (time, busIds) =>
  busIds.reduce(
    (closest, busId) => {
      const latest = Math.ceil(time / busId) * busId;
      const waitTime = latest - time;
      if (waitTime < closest[1]) {
        return [busId, waitTime];
      }
      return closest;
    },
    [0, Number.MAX_SAFE_INTEGER]
  );

const toBusIds = (busString) =>
  busString
    .split(",")
    .filter((f) => f !== "x")
    .map(Number);

const toBusDepartures = (busString) =>
  busString
    .split(",")
    .map((id, idx) => [+id, idx])
    .filter((d) => !isNaN(d[0]));

const findEarliest = (departures) => {
  let time, step, i;
  for (i = 1, time = departures[0][0], step = departures[0][0]; i < departures.length; i++) {
    const [busId, offset] = departures[i];
    while ((time + offset) % busId !== 0) {
      time += step;
    }
    step = step * busId;
  }
  return time;
};

fileToPuzzle("day13-puzzle.txt", (puzzle) => {
  // Part 1
  const time = puzzle[0];
  const busIds = toBusIds(puzzle[1]);
  const [busId, waitTime] = findBus(time, busIds);
  console.log(busId * waitTime);

  // Part 2
  const busDepartures = toBusDepartures(puzzle[1]);
  console.log(findEarliest(busDepartures));
});
