const { fileToPuzzle } = require("./util");

const MARKER_REGEX = /\((\d*)x(\d*)\)/;

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

fileToPuzzle("day9-puzzle.txt", (puzzle) => {
  let decompressed = decompress(puzzle[0], 0);
  // Part 1
  console.log(decompressed.length);
});
