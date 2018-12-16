const { fileToPuzzle } = require("./util");
const DIRECTION = {
  N: "N",
  W: "W",
  S: "S",
  E: "E"
};
const TURNS = {
  straight: "straight",
  right: "right",
  left: "left"
};
const turn = last => {
  if (last === TURNS.left) {
    return TURNS.straight;
  } else if (last === TURNS.straight) {
    return TURNS.right;
  }
  return TURNS.left;
};
const replaceElveSymbol = char => {
  if (char === "<" || char === ">") {
    return "-";
  } else if (char === "^" || char === "v") {
    return "|";
  }
  return char;
};
const elf = (char, pos) => {
  if (char === "<") {
    return {
      direction: DIRECTION.W,
      next: TURNS.left,
      position: pos
    };
  } else if (char === ">") {
    return { direction: DIRECTION.E, next: TURNS.left, position: pos };
  } else if (char === "^") {
    return {
      direction: DIRECTION.N,
      next: TURNS.left,
      position: pos
    };
  } else if (char === "v") {
    return {
      direction: DIRECTION.S,
      next: TURNS.left,
      position: pos
    };
  }
};
const nextDirection = (path, elfDirection, elfNext) => {
  switch (path) {
    case "/":
      if (elfDirection === DIRECTION.N) {
        return DIRECTION.E;
      } else if (elfDirection === DIRECTION.S) {
        return DIRECTION.W;
      } else if (elfDirection === DIRECTION.W) {
        return DIRECTION.S;
      } else if (elfDirection === DIRECTION.E) {
        return DIRECTION.N;
      }
      return elfDirection;
    case "\\":
      if (elfDirection === DIRECTION.N) {
        return DIRECTION.W;
      } else if (elfDirection === DIRECTION.S) {
        return DIRECTION.E;
      } else if (elfDirection === DIRECTION.W) {
        return DIRECTION.N;
      } else if (elfDirection === DIRECTION.E) {
        return DIRECTION.S;
      }
      return elfDirection;
    case "+":
      const newTurn = elfNext;
      let nextDir = elfDirection;
      if (newTurn === TURNS.left) {
        if (elfDirection === DIRECTION.N) {
          nextDir = DIRECTION.W;
        } else if (elfDirection === DIRECTION.S) {
          nextDir = DIRECTION.E;
        } else if (elfDirection === DIRECTION.W) {
          nextDir = DIRECTION.S;
        } else if (elfDirection === DIRECTION.E) {
          nextDir = DIRECTION.N;
        }
      } else if (newTurn === TURNS.right) {
        if (elfDirection === DIRECTION.N) {
          nextDir = DIRECTION.E;
        } else if (elfDirection === DIRECTION.S) {
          nextDir = DIRECTION.W;
        } else if (elfDirection === DIRECTION.W) {
          nextDir = DIRECTION.N;
        } else if (elfDirection === DIRECTION.E) {
          nextDir = DIRECTION.S;
        }
      }
      return {
        nextDir,
        newTurn: turn(newTurn)
      };
    default:
      return elfDirection;
  }
};
const collision = elves => {
  for (let e = 0; e < elves.length; e++) {
    const elf = elves[e];
    const collidingElves = elves.filter(
      el => el.position.x === elf.position.x && el.position.y === elf.position.y
    );
    if (collidingElves.length > 1) {
      return collidingElves;
    }
  }
};
const elfCompare = (a, b) =>
  a.position.y - b.position.y || a.position.x - b.position.x;
fileToPuzzle("./day13-puzzle.txt", puzzle => {
  let elves = [];
  let coordinates = {};
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      const char = puzzle[y][x];
      const elfAtPos = elf(char, { x, y });
      if (elfAtPos) {
        elves.push(elfAtPos);
        coordinates[x + "_" + y] = replaceElveSymbol(char);
      } else {
        coordinates[x + "_" + y] = char;
      }
    }
  }
  let collidedElves = [];
  let firstCollision = true;
  while (true) {
    elves = elves.filter(e => collidedElves.indexOf(e) < 0);
    if (elves.length === 1) {
      const pos = elves[0].position;
      console.log(`${pos.x},${pos.y}`);
      break;
    }
    collidedElves = [];
    elves.sort(elfCompare);
    for (let e = 0; e < elves.length; e++) {
      const elf = elves[e];
      const path = coordinates[elf.position.x + "_" + elf.position.y];
      const nextDir = nextDirection(path, elf.direction, elf.next);
      if (nextDir.newTurn) {
        elf.direction = nextDir.nextDir;
        elf.next = nextDir.newTurn;
      } else {
        elf.direction = nextDir;
      }
      if (elf.direction.indexOf("N") >= 0) {
        elf.position.y--;
      }
      if (elf.direction.indexOf("S") >= 0) {
        elf.position.y++;
      }
      if (elf.direction.indexOf("W") >= 0) {
        elf.position.x--;
      }
      if (elf.direction.indexOf("E") >= 0) {
        elf.position.x++;
      }
      const collidingElves = collision(elves);
      if (collidingElves) {
        collidedElves = collidedElves.concat(collidingElves);
        if (firstCollision) {
          const pos = collidingElves[0].position;
          console.log(`${pos.x},${pos.y}`);
          firstCollision = false;
        }
      }
    }
  }
});
