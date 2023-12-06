import { fileToPuzzle, isNumber } from "./util.mjs";

const getPath = (seed, maps) => {
  const path = [seed];
  let currentOutput = seed;
  maps.forEach((map) => {
    let found = false;
    for (let i = 0; i < map.length; i++) {
      const [destination, source, length] = map[i];
      if (currentOutput >= source && currentOutput < source + length) {
        const destIdx = currentOutput - source;
        const newOutput = destination + destIdx;
        path.push(newOutput);
        currentOutput = newOutput;
        found = true;
        break;
      }
    }
    if (!found) {
      path.push(currentOutput);
    }
  });
  return path;
};
const getLocation = (seed, maps) => {
  let currentOutput = seed;
  maps.forEach((map) => {
    for (let i = 0; i < map.length; i++) {
      const [destination, source, length] = map[i];
      if (currentOutput >= source && currentOutput < source + length) {
        const destIdx = currentOutput - source;
        const newOutput = destination + destIdx;
        currentOutput = newOutput;
        break;
      }
    }
  });
  return currentOutput;
};

fileToPuzzle(
  "day5-puzzle.txt",
  (puzzle) => {
    const [seedString, ...mapStrings] = puzzle;
    const seeds = seedString
      .split(" ")
      .filter((s) => !!s && isNumber(s))
      .map(Number);
    const maps = mapStrings.map((mapString) =>
      mapString
        .split("\n")
        .filter((v) => v.indexOf(":") < 0)
        .map((m) =>
          m
            .split(" ")
            .filter((m) => !!m && isNumber(m))
            .map(Number)
        )
    );
    // Part 1
    let currMinPart1 = Number.MAX_SAFE_INTEGER;
    seeds.forEach((seed) => {
      const path = getPath(seed, maps);
      if (path[path.length - 1] < currMinPart1) {
        currMinPart1 = path[path.length - 1];
      }
    });
    console.log(currMinPart1);

    // Part 2
    let currMinPart2 = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < seeds.length; i += 2) {
      const [start, range] = [seeds[i], seeds[i + 1]];
      for (let j = start; j < start + range; j++) {
        const location = getLocation(j, maps);
        if (location < currMinPart2) {
          currMinPart2 = location;
        }
      }
    }

    console.log(currMinPart2);
  },
  {
    separator: "\n\n",
  }
);
