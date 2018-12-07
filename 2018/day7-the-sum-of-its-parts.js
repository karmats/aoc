const { fileToPuzzle } = require("./util");

const regex = /.+\s([A-Z]).+\s([A-Z])\s/;
fileToPuzzle("./day7-puzzle.txt", puzzle => {
  const instructions = puzzle
    .map(p => regex.exec(p))
    .map(r => [r[1], r[2]])
    .reduce((acc, c) => {
      if (!acc[c[1]]) {
        acc[c[1]] = [];
      }
      if (!acc[c[0]]) {
        acc[c[0]] = [];
      }
      acc[c[1]].push(c[0]);
      return acc;
    }, {});
  const next = instr => {
    const empty = [];
    for (let key in instr) {
      if (!instr[key].length) {
        empty.push(key);
      }
    }
    return empty.sort();
  };
  const instructions2 = Object.keys(instructions).reduce((acc, c) => {
    acc[c] = instructions[c].slice();
    return acc;
  }, {});
  const result = [];
  while (Object.keys(instructions).length) {
    const n = next(instructions).shift();
    result.push(n);
    delete instructions[n];
    for (let key in instructions) {
      const instr = instructions[key];
      const idx = instr.indexOf(n);
      if (idx >= 0) {
        instr.splice(idx, 1);
      }
    }
  }

  // Part 1
  console.log(result.join(""));

  // Part 2
  let workers = [
    { curr: "", timeLeft: 0, idx: 0 },
    { curr: "", timeLeft: 0, idx: 1 },
    { curr: "", timeLeft: 0, idx: 2 },
    { curr: "", timeLeft: 0, idx: 3 },
    { curr: "", timeLeft: 0, idx: 4 }
  ];
  let time = 0;
  while (Object.keys(instructions2).length) {
    const idleWorkers = workers
      .map((w, i) => (w.timeLeft === 0 ? i : -1))
      .filter(w => w >= 0);
    if (idleWorkers.length) {
      const done = workers.filter(w => w.timeLeft === 0 && w.curr !== "");
      done.forEach(d => {
        delete instructions2[d.curr];
        for (let key in instructions2) {
          const instr = instructions2[key];
          const idx = instr.indexOf(d.curr);
          if (idx >= 0) {
            instr.splice(idx, 1);
          }
        }
        workers[d.idx].curr = "";
      });
      const inProgress = workers.map(w => w.curr).filter(p => p !== "");
      const n = next(instructions2).filter(i => inProgress.indexOf(i) < 0);
      n.forEach(curr => {
        const w = idleWorkers.shift();
        if (w >= 0) {
          workers[w] = {
            curr: curr,
            timeLeft: curr.charCodeAt(0) - 4,
            idx: w
          };
        }
      });
    }
    workers = workers.map(w => ({
      timeLeft: w.timeLeft > 0 ? w.timeLeft - 1 : w.timeLeft,
      curr: w.curr,
      idx: w.idx
    }));
    time = Object.keys(instructions2).length > 0 ? time + 1 : time;
  }

  console.log(time);
});
