const { fileToPuzzle } = require("./util");

const shortestDistanceNode = (distances, visited) => {
  let shortest = null;

  for (let node in distances) {
    let currentIsShortest = shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
  let distances = {};
  distances[endNode] = Infinity;
  distances = Object.assign(distances, graph[startNode]);

  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  let visited = [];

  let node = shortestDistanceNode(distances, visited);

  while (node) {
    let distance = distances[node];
    let children = graph[node];
    for (let child in children) {
      if (child !== startNode) {
        let newdistance = distance + children[child];
        if (!distances[child] || distances[child] > newdistance) {
          distances[child] = newdistance;
          parents[child] = node;
        }
      }
    }
    visited.push(node);
    node = shortestDistanceNode(distances, visited);
  }
  return distances[endNode];
};

const puzzleToGraph = (puzzle) => {
  const weightedNodes = puzzle.reduce((acc, row, idx) => {
    const nodes = row.split("").reduce((a, n, i) => ({ ...a, [`${idx}.${i}`]: n }), {});
    return {
      ...acc,
      ...nodes,
    };
  }, {});
  const graph = Object.keys(weightedNodes).reduce((acc, coord) => {
    const [y, x] = coord.split(".");
    const neighborKeys = [`${+y + 1}.${x}`, `${+y - 1}.${x}`, `${y}.${+x - 1}`, `${y}.${+x + 1}`];
    const neighbors = neighborKeys.reduce((a, c) => {
      const nodeValue = weightedNodes[c];
      if (typeof nodeValue !== "undefined") {
        return {
          ...a,
          [c]: +nodeValue,
        };
      }
      return a;
    }, {});
    return {
      ...acc,
      [coord]: neighbors,
    };
  }, {});
  return graph;
};

fileToPuzzle("day15-puzzle.txt", (puzzle) => {
  // Part 1
  const graph = puzzleToGraph(puzzle);
  const endNode = `${puzzle.length - 1}.${puzzle[0].length - 1}`;
  console.log(findShortestPath(graph, "0.0", endNode));
});
