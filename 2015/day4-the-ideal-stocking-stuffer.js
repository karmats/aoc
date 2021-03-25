const crypto = require("crypto");

const PUZZLE = "ckczppom";

const mineCoin = (key) => {
  let part1, part2;
  for (let i = 0; ; i++) {
    const hash = crypto.createHash("md5").update(`${key}${i}`).digest("hex");
    if (!part1 && hash.startsWith("00000")) {
      part1 = i;
    }
    if (hash.startsWith("000000")) {
      part2 = i;
      return { part1, part2 };
    }
  }
};

const result = mineCoin(PUZZLE);
console.log(result.part1);
console.log(result.part2);
