const fs = require("fs");

const fileToPuzzle = (
  path,
  callback,
  options = { separator: "\n", isNumber: false }
) => {
  fs.readFile(path, "utf-8", (_, data) => {
    const result = data
      .split(options.separator || "\n")
      .map(d => (options.isNumber ? parseInt(d) : d));
    callback(result);
  });
};

module.exports = { fileToPuzzle };
