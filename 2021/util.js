const fs = require("fs");

const fileToPuzzle = (
  filename,
  callback,
  options = { separator: "\n", isNumber: false }
) => {
  fs.readFile(`${__dirname}/${filename}`, "utf-8", (_, data) => {
    const result = data
      .split(options.separator || "\n")
      .map(d => (options.isNumber ? +d : d));
    callback(result);
  });
};

const leftPad = (num, padding) => {
  while(num.length < padding) {
    num = '0' + num;
  }
  return num;
}

const replaceAtIndex = (string, index, replacement) => {
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

module.exports = { fileToPuzzle, leftPad, replaceAtIndex };
