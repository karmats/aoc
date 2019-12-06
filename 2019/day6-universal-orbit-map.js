const { fileToPuzzle } = require("./util");

const ROOT = "COM";
fileToPuzzle("day6-puzzle.txt", puzzle => {
  const orbits = puzzle.slice();
  const result = {};
  orbits.forEach(orbit => {
    const os = orbit.split(")");
    result[os[0]] = result[os[0]] ? [...result[os[0]], os[1]] : [os[1]];
  });

  // Part 1
  let totalOrbits = 0;
  const ancestors = childs => {
    if (childs && Array.isArray(childs)) {
      childs.forEach(c => {
        ancestors(result[c]);
        totalOrbits++;
      });
    }
  };
  Object.keys(result).forEach(k => {
    ancestors(result[k]);
  });
  ancestors(result, result[ROOT]);
  console.log(totalOrbits);

});
