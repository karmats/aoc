const fs = require('fs');


const find = (program, acc, puzzle) => {
    if (acc.indexOf(program) < 0) {
        acc.push(program);
        const pipes = puzzle[program];
        for (let i = 0; i < pipes.length; i++) {
            const nextProgram = pipes[i];
            find(nextProgram, acc, puzzle);
        }
    }
}

const programHasGroup = (program, groups) => {
    return groups.some(group => group.some(p => p === program));
}

fs.readFile('day12-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').reduce((acc, c) => {
        const key = parseInt(c.substring(0, c.indexOf('<->')).trim());
        acc[key] = c.substring(c.indexOf('>') + 1, c.length).trim().split(',').map(val => parseInt(val.trim()));
        return acc;
    }, {});
    const groups = [];
    for (let i = 0; i < Object.keys(puzzle).length; i++) {
        const group = [];
        if (!programHasGroup(i, groups)) {
            find(i, group, puzzle);
            groups.push(group);
        }
    }
    console.log(groups[0].length, groups.length);
});
