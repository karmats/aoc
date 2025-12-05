import fs from "fs";
import { fileURLToPath } from "url";

export const fileToPuzzle = (filename, callback, options = { separator: "\n", isNumber: false }) => {
  fs.readFile(fileURLToPath(`${import.meta.url}/../${filename}`), "utf-8", (_, data) => {
    const result = data.split(options.separator || "\n").map((d) => (options.isNumber ? +d : d));
    callback(result);
  });
};

export const replaceAtIndex = (string, index, replacement) => {
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
};

export const sum = (arr) => arr.reduce((acc, c) => acc + c, 0);

export const findMax = (arr) => arr.reduce((max, c) => (c > max ? c : max), 0);
export const findMin = (arr) => arr.reduce((min, c) => (c < min ? c : min), Number.MAX_SAFE_INTEGER);

export const printGrid = (grid) => grid.join("\n");

export const isNumber = (n) => !isNaN(+n);

export const swapItems = (arr, idx1, idx2) => {
  arr[idx1] = arr.splice(idx2, 1, arr[idx1])[0];
  return arr;
}

