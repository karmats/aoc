import { fileToPuzzle, findMin, isNumber } from "./util.mjs";

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
    let currMin = Number.MAX_SAFE_INTEGER;
    seeds.forEach((seed) => {
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
      if (path[path.length - 1] < currMin) {
        currMin = path[path.length - 1];
      }
    });
    console.log(currMin);
  },
  {
    separator: "\n\n",
  }
);
