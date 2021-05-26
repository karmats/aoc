const HAPPINESS_REGEX = /^(\S*)\swould\s(gain|lose)\s(\d*)\shappiness\sunits\sby\ssitting\snext\sto\s(\S*)\.$/;

const { fileToPuzzle } = require("./util");

const toModel = (puzzle) =>
  puzzle.reduce((acc, c) => {
    const [, name, operation, points, nextTo] = HAPPINESS_REGEX.exec(c);
    if (!acc[name]) {
      acc[name] = {};
    }
    return {
      ...acc,
      [name]: {
        ...acc[name],
        [nextTo]: {
          operation,
          points,
        },
      },
    };
  }, {});

const getSeatingPoints = (model) => {
  const seatingPoints = Object.keys(model).reduce((acc, c) => {
    const seatings = model[c];
    Object.keys(seatings).forEach((name) => {
      if (!acc.some((a) => (a.a === name && a.b === c) || (a.b === name && a.a === c))) {
        const seatingA = seatings[name];
        const seatingB = model[name][c];
        const pointsA = seatingA.operation === "gain" ? +seatingA.points : -seatingA.points;
        const pointsB = seatingB.operation === "gain" ? +seatingB.points : -seatingB.points;
        acc.push({ a: c, b: name, points: pointsA + pointsB });
      }
    });
    return acc;
  }, []);

  return seatingPoints;
};

const calculateBestArrangement = (seatingPoints) => {
  const sorted = seatingPoints.sort((a, b) => b.points - a.points);
  const result = [];
  sorted.forEach((seatingPoint) => {
    if (
      result.filter((r) => r.a === seatingPoint.a || r.b === seatingPoint.a).length < 2 &&
      result.filter((r) => r.a === seatingPoint.b || r.b === seatingPoint.b).length < 2
    ) {
      result.push(seatingPoint);
    }
  });
  const allNames = sorted.reduce((acc, c) => (!acc.includes(c.a) ? acc.concat(c.a) : !acc.includes(c.b) ? acc.concat(c.b) : acc), []);
  const missingNames = allNames.filter((n) => !result.some((r) => r.a === n || r.b === n));

  missingNames.forEach((missing) => {
    const last = result.pop();
    const missingA = sorted.find((s) => (s.a === last.a && s.b === missing) || (s.b === last.a && s.a === missing));
    const missingB = sorted.find((s) => (s.a === last.b && s.b === missing) || (s.b === last.b && s.a === missing));
    result.push(missingA);
    result.push(missingB);
  });

  return result.reduce((sum, c) => sum + c.points, 0);
};

fileToPuzzle("day13-puzzle.txt", (puzzle) => {
  const model = toModel(puzzle);
  const seatingPoints = getSeatingPoints(model);
  // Part 1
  console.log(calculateBestArrangement(seatingPoints));

  // Part 2
  const allNames = Object.keys(model);
  const model2 = {
    ...allNames.reduce((acc, c) => ({ ...acc, [c]: { ...model[c], Me: { operation: "gain", points: "0" } } }), {}),
    Me: allNames.reduce(
      (acc, c) => ({
        ...acc,
        [c]: {
          operation: "gain",
          points: "0",
        },
      }),
      {}
    ),
  };
  const seatingPoints2 = getSeatingPoints(model2);

  console.log(calculateBestArrangement(seatingPoints2));
});
