const { fileToPuzzle } = require("./util");

fileToPuzzle("day6-puzzle.txt", puzzle => {
  const orbits = puzzle.slice();
  const result = {};
  orbits.forEach(orbit => {
    const os = orbit.split(")");
    result[os[0]] = result[os[0]] ? [...result[os[0]], os[1]] : [os[1]];
  });

  // Part 1
  let totalOrbits = 0;
  const countOrbits = childs => {
    if (childs && Array.isArray(childs)) {
      childs.forEach(c => {
        countOrbits(result[c]);
        totalOrbits++;
      });
    }
  };
  Object.keys(result).forEach(k => {
    countOrbits(result[k]);
  });
  console.log(totalOrbits);

  // Part 2
  const ancestors = (child, ans) => {
    for (k in result) {
      if (result[k] && result[k].indexOf(child) >= 0) {
        return ancestors(k, [...ans, k]);
      }
    }
    return ans;
  };
  const sanAncestors = ancestors("SAN", []);
  const youAncestors = ancestors("YOU", []);
  const distances = youAncestors.reduce((acc, c, idx) => {
    const sanIdx = sanAncestors.indexOf(c);
    if (!acc && sanIdx >= 0) {
      return {
        distanceYou: idx,
        distanceSan: sanIdx
      };
    }
    return acc;
  }, null);
  console.log(distances.distanceYou + distances.distanceSan);
});
