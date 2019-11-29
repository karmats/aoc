const fs = require("fs");

const fileToPuzzle = (
  filename,
  callback,
  options = { separator: "\n", isNumber: false }
) => {
  fs.readFile(`${__dirname}/${filename}`, "utf-8", (_, data) => {
    const result = data
      .split(options.separator || "\n")
      .map(d => (options.isNumber ? parseInt(d) : d));
    callback(result);
  });
};

module.exports = { fileToPuzzle };
