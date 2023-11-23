import fs from "fs";

export const fileToPuzzle = (filename, callback, options = { separator: "\n", isNumber: false }) => {
  fs.readFile(`${__dirname}/${filename}`, "utf-8", (_, data) => {
    const result = data.split(options.separator || "\n").map((d) => (options.isNumber ? +d : d));
    callback(result);
  });
};

export const leftPad = (num, padding) => {
  while (num.length < padding) {
    num = "0" + num;
  }
  return num;
};

export const replaceAtIndex = (string, index, replacement) => {
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
};

export const sum = (arr) => arr.reduce((acc, c) => acc + c, 0);

export const findMax = (arr) => arr.reduce((max, c) => (c > max ? c : max), 0);
export const findMin = (arr) => arr.reduce((min, c) => (c < min ? c : min), Number.MAX_SAFE_INTEGER);

export const printGrid = (grid) => grid.map((g) => g.join("")).join("\n");
