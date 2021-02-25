const { fileToPuzzle } = require("./util");

const MARKER_REGEX = /\((\d+)x(\d+)\)/;

const decompress = (chars, pos) => {
  const currChars = chars.slice(pos);
  const marker = MARKER_REGEX.exec(currChars);
  if (marker) {
    const [markerString, length, times] = marker;
    const start = marker.index + markerString.length;
    const end = start + Number(length);
    const charsToDecompress = currChars.slice(start, end);
    let decompressed = "";
    for (let i = 0; i < Number(times); i++) {
      decompressed += charsToDecompress;
    }
    const result = decompressed + currChars.slice(end);
    return decompress(chars.slice(0, pos + marker.index) + result, pos + decompressed.length + marker.index);
  }
  return chars;
};
const countDecompressed = (chars) => {
  const weights = chars.split("").map(() => 1);
  let count = 0;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === "(") {
      const end = chars.indexOf(")", i);
      const expression = chars.substring(i, end + 1);
      const [, length, times] = MARKER_REGEX.exec(expression);
      for (let j = end; j <= end + Number(length); j++) {
        weights[j] *= Number(times);
      }
      i = end;
    } else {
      count += weights[i];
    }
  }
  return count;
};

fileToPuzzle("day9-puzzle.txt", (puzzle) => {
  // Part 1
  console.log(decompress(puzzle[0], 0).length);
  // Part 2
  console.log(countDecompressed(puzzle[0]));
});
