const { fileToPuzzle } = require("./util");

const TILE_ID_REGEX = /^Tile\s(\d*)/;

const toEdges = (map) => {
  const max = map.length - 1;
  return [map[0], map.reduce((edges, m) => edges + m[max], ""), map[max], map.reduce((edges, m) => edges + m[0], "")];
};

const toModel = (tile) => {
  const [tileId, ...img] = tile.split("\n");
  const id = TILE_ID_REGEX.exec(tileId);
  return {
    id: id[1],
    img,
    edges: toEdges(img),
  };
};

const reverse = (s) => s.split("").reverse().join("");

const flip = (edges) => [reverse(edges[0]), edges[3], reverse(edges[2]), edges[1]];

const rotate = (edges) => [reverse(edges[3]), edges[0], reverse(edges[1]), edges[2]];

const rotateDegrees = (edges, degrees) => {
  const times = degrees / 90;
  let rotatedEdges = edges;
  for (let i = 0; i < times; i++) {
    rotatedEdges = rotate(rotatedEdges);
  }
  return rotatedEdges;
};

const edgeIdxToDirection = (idx) => {
  switch (idx) {
    case 0:
      return "N";
    case 1:
      return "E";
    case 2:
      return "S";
    case 3:
      return "W";
    default:
      throw new Error("Unknown index " + idx);
  }
};

const findMatching = (edges, tiles) => {
  return edges.map((edge) => {
    const matching = [];
    tiles.forEach((t) => {
      for (let i = 0; i < t.edges.length; i++) {
        const compareEdge = t.edges[i];
        if (
          edge === compareEdge ||
          reverse(edge) === compareEdge ||
          edge === reverse(compareEdge) ||
          reverse(edge) === reverse(compareEdge)
        ) {
          matching.push(t.id);
        }
      }
    });
    return matching.length > 0 ? matching : null;
  });
};

const findCorners = (matches) => {
  const ids = [];
  for (let id in matches) {
    const match = matches[id];
    if (match.length === 2) {
      ids.push(id);
    }
  }
  return ids;
};

const multiply = (nums) => nums.reduce((prod, num) => prod * Number(num), 1);

fileToPuzzle(
  "day20-puzzle.txt",
  (puzzle) => {
    const tiles = puzzle.map(toModel);
    const matches = {};
    tiles.forEach((tile) => {
      const matching = findMatching(
        tile.edges,
        tiles.filter((t) => t.id !== tile.id)
      )
        .filter((f) => !!f)
        .reduce((acc, c) => acc.concat(c), []);
      if (matching.length > 1) {
        matches[tile.id] = matching;
      }
    });
    console.log(multiply(findCorners(matches)));
  },
  {
    separator: "\n\n",
  }
);
