const fs = require('fs');

const calcSteps = (res) => {
    let x = Math.abs(res.x);
    let y = Math.abs(res.y);
    let steps = 0;
    while (x !== 0 || y !== 0) {
        if (x >= 3 && y > 0) {
            x = x - 3;
            y = y - 1;
        } else if (x === 0) {
            y = y - 2;
        } else if (y === 0) {
            x = x - 6;
        }
        steps++;
    }
    return steps;
}

const calcPath = (arr) => {
    return arr.reduce((acc, c) => {
        switch (c) {
            case 'n':
                acc.y = acc.y + 2;
                break;
            case 'ne':
                acc.x = acc.x + 3;
                acc.y = acc.y + 1;
                break;
            case 'nw':
                acc.x = acc.x - 3;
                acc.y = acc.y + 1;
                break;
            case 's':
                acc.y = acc.y - 2;
                break;
            case 'sw':
                acc.x = acc.x - 3;
                acc.y = acc.y - 1;
                break;
            case 'se':
                acc.x = acc.x + 3;
                acc.y = acc.y - 1;
                break;
            case 'w':
                acc.x = acc.x - 6
                break;
            case 'e':
                acc.x = acc.x + 6
                break;

        }
        const steps = calcSteps(acc);
        acc.currSteps = steps;
        acc.maxSteps = steps > acc.maxSteps ? steps : acc.maxSteps;
        return acc;
    }, { x: 0, y: 0, maxSteps: 0, currSteps: 0 });
}

fs.readFile('day11-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split(',');
    const res = calcPath(puzzle)
    console.log(res.currSteps, res.maxSteps)
});
