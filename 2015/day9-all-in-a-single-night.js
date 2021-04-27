const { fileToPuzzle } = require("./util");

const ROUTE_REGEX = /([a-zA-Z]*)\sto\s([a-zA-Z]*)\s=\s(\d*)/;

function combinations(array, acc, used) {
  for (let i = 0; i < array.length; i++) {
    const ch = array.splice(i, 1)[0];
    used.push(ch);
    if (array.length == 0) {
      acc.push(used.slice());
    }
    combinations(array, acc, used);
    array.splice(i, 0, ch);
    used.pop();
  }
  return acc;
}

const findRouteDistance = (desA, desB, routes) => {
  const route = routes.find((r) => (r[0] === desA || r[1] === desA) && (r[0] === desB || r[1] === desB));
  if (!route) {
    throw new Error(`Failed to find route for '${desA}' - '${desB}'`);
  }
  return route[2];
};

const calculateRouteDistance = (route, routes) => {
  let result = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const [desA, desB] = [route[i], route[i + 1]];
    result += findRouteDistance(desA, desB, routes);
  }
  return result;
};

const calculateShortestAndLongestRoute = (routes) => {
  const uniqueDestinations = routes.reduce((dests, route) => {
    const [desA, desB] = route;
    return dests.concat(dests.includes(desA) ? [] : desA).concat(dests.includes(desB) ? [] : desB);
  }, []);
  const possibleRoutes = combinations(uniqueDestinations, [], []);
  const minDistance = possibleRoutes.reduce((min, route) => {
    const distance = calculateRouteDistance(route, routes);
    return distance < min ? distance : min;
  }, Number.MAX_SAFE_INTEGER);
  const maxDistance = possibleRoutes.reduce((max, route) => {
    const distance = calculateRouteDistance(route, routes);
    return distance > max ? distance : max;
  }, 0);
  return [minDistance, maxDistance];
};

fileToPuzzle("day9-puzzle.txt", (puzzle) => {
  const routes = puzzle.map((p) => {
    const [, desA, desB, dist] = ROUTE_REGEX.exec(p);
    return [desA, desB, +dist];
  });

  const [min, max] = calculateShortestAndLongestRoute(routes);
  // Part 1
  console.log(min);
  // Part 2
  console.log(max);
});
