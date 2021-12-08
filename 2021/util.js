const fs = require("fs");

const fileToPuzzle = (filename, callback, options = { separator: "\n", isNumber: false }) => {
  fs.readFile(`${__dirname}/${filename}`, "utf-8", (_, data) => {
    const result = data.split(options.separator || "\n").map((d) => (options.isNumber ? +d : d));
    callback(result);
  });
};

const leftPad = (num, padding) => {
  while (num.length < padding) {
    num = "0" + num;
  }
  return num;
};

const replaceAtIndex = (string, index, replacement) => {
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
};

const sum = (arr) => arr.reduce((acc, c) => acc + c, 0);

const findMax = (arr) => arr.reduce((max, c) => (c > max ? c : max), 0);
const findMin = (arr) => arr.reduce((min, c) => (c < min ? c : min), Number.MAX_SAFE_INTEGER);

const calculatePartialSum = (num) => (num === 0 ? 0 : (num * (num + 1)) / 2);

module.exports = { fileToPuzzle, leftPad, replaceAtIndex, sum, findMax, findMin, calculatePartialSum };
