const SPEED_REGEX = /^([a-zA-Z]*)\scan\sfly\s(\d*)\skm\/s\sfor\s(\d*)\sseconds,\sbut\sthen\smust\srest\sfor\s(\d*)\sseconds\.$/;

const { fileToPuzzle } = require("./util");

const toModel = (reindeer) => {
  const regexResult = SPEED_REGEX.exec(reindeer);
  return {
    name: regexResult[1],
    speed: +regexResult[2],
    time: +regexResult[3],
    rest: +regexResult[4],
  };
};

const doRace = (reindeers, time) => {
  const result = reindeers.reduce((acc, r) => ({ ...acc, [r.name]: { traveled: 0, travelTime: 0, restingTime: 0, points: 0 } }), {});
  for (let ellapsed = 1; ellapsed <= time; ellapsed++) {
    reindeers.forEach((reindeer) => {
      const resultReindeer = result[reindeer.name];
      if (resultReindeer.travelTime === reindeer.time || (resultReindeer.restingTime > 0 && resultReindeer.restingTime < reindeer.rest)) {
        result[reindeer.name] = { ...resultReindeer, restingTime: resultReindeer.restingTime + 1, travelTime: 0 };
      } else {
        result[reindeer.name] = {
          ...resultReindeer,
          restingTime: 0,
          traveled: resultReindeer.traveled + reindeer.speed,
          travelTime: resultReindeer.travelTime + 1,
        };
      }
    });
    const longestTravel = Object.keys(result).reduce((leading, c) => {
      const currReindeer = result[c];
      if (currReindeer.traveled > leading) {
        return currReindeer.traveled;
      }
      return leading;
    }, 0);
    Object.keys(result).forEach((name) => {
      const reindeer = result[name];
      if (reindeer.traveled === longestTravel) {
        result[name] = { ...reindeer, points: reindeer.points + 1 };
      }
    });
  }
  return result;
};

fileToPuzzle("day14-puzzle.txt", (puzzle) => {
  const reindeers = puzzle.map(toModel);
  const raceResult = doRace(reindeers, 2503);

  // Part 1
  const winningReindeer = Object.keys(raceResult).reduce(
    (winner, name) => (raceResult[name].traveled > winner.traveled ? raceResult[name] : winner),
    {
      traveled: 0,
    }
  );
  console.log(winningReindeer.traveled);

  // Part 2
  const winningReindeerByPoints = Object.keys(raceResult).reduce(
    (winner, name) => (raceResult[name].points > winner.points ? raceResult[name] : winner),
    {
      points: 0,
    }
  );
  console.log(winningReindeerByPoints.points);
});
