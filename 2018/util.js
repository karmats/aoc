const fs = require("fs");

const fileToPuzzle = (
  path,
  callback,
  options = { separator: "\n", isNumber: true }
) => {
  fs.readFile(path, "utf-8", (_, data) => {
    const result = data
      .split(options.separator)
      .map(d => (options.isNumber ? parseInt(d) : d));
    callback(result);
  });
};

module.exports = { fileToPuzzle };
