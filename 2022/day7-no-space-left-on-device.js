const { fileToPuzzle, sum } = require("./util");

const COMMAND_REGEX = /^\$\s([a-z]*)\s?(.*)$/;
const FILE_REGEX = /^(\d*)\s(.*)$/;
const DIR_REGEX = /^dir\s(.*)$/;

const FOLDER_SEPARATOR = "/";

const calcTotals = (folder) => {
  const keys = Object.keys(folder);
  for (let i = 0; i < keys.length; i++) {
    const item = folder[keys[i]];
    if (typeof item === "number") {
      folder.total = (folder.total ?? 0) + item;
    } else {
      folder.total = (folder.total ?? 0) + calcTotals(item);
    }
  }
  return folder.total;
};

const getFolderSizes = (folder, sizes) => {
  const keys = Object.keys(folder);
  for (let i = 0; i < keys.length; i++) {
    const item = folder[keys[i]];
    if (typeof item === "object") {
      sizes.push(item.total);
      getFolderSizes(item, sizes);
    }
  }
  return sizes;
};

const createFileTree = (output) => {
  const tree = {};
  let currFolder = tree;
  let currFolderPath = "";
  output.forEach((o) => {
    const command = COMMAND_REGEX.exec(o);
    if (command) {
      const [, action, dirName] = command;
      if (action === "cd") {
        if (dirName === "/") {
          currFolder = tree;
          currFolderPath = "";
        } else if (dirName === "..") {
          let dirs = currFolderPath.split(FOLDER_SEPARATOR);
          dirs = dirs.slice(0, dirs.length - 1);
          currFolder = tree;
          for (let i = 1; i < dirs.length; i++) {
            currFolder = currFolder[dirs[i]];
          }
          currFolderPath = dirs.join(FOLDER_SEPARATOR);
        } else {
          currFolderPath += FOLDER_SEPARATOR + dirName;
          currFolder = currFolder[dirName];
          if (!currFolder) {
            currFolder = {};
          }
        }
      }
    }
    const file = FILE_REGEX.exec(o);
    if (file) {
      const [, size, name] = file;
      currFolder[name] = +size;
    }
    const dir = DIR_REGEX.exec(o);
    if (dir) {
      const [, name] = dir;
      if (!currFolder[name]) {
        currFolder[name] = {};
      }
    }
  });
  return tree;
};

fileToPuzzle("day7-puzzle.txt", (puzzle) => {
  const tree = createFileTree(puzzle);
  // Part 1
  calcTotals(tree);
  const folderSizes = getFolderSizes(tree, []);
  console.log(sum(folderSizes.filter((f) => f <= 100000)));

  // Part 2
  const requiredSpace = tree.total - 40000000;
  console.log(folderSizes.reduce((p, c) => (c > requiredSpace && c < p ? c : p), Number.MAX_SAFE_INTEGER));
});
