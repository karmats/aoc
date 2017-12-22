const fs = require('fs')

const ROUNDS1 = 10000;
const ROUNDS2 = 10000000

const newDirection = (oldDir, turn) => {
    const left = turn === 'left'
    switch (oldDir) {
        case 'right':
            return left ? 'up' : 'down'
        case 'left':
            return left ? 'down' : 'up'
        case 'up':
            return left ? 'left' : 'right'
        case 'down':
            return left ? 'right' : 'left'
        default:
            console.log('wtf?', oldDir)
    }
}

const newDirection2 = (oldDir, val) => {
    switch (oldDir) {
        case 'right':
            if (val === '.') {
                return 'up';
            } else if (val === '#') {
                return 'down';
            } else if (val === 'F') {
                return 'left';
            }
            return 'right';
        case 'left':
            if (val === '.') {
                return 'down';
            } else if (val === '#') {
                return 'up';
            } else if (val === 'F') {
                return 'right';
            }
            return 'left';
        case 'up':
            if (val === '.') {
                return 'left';
            } else if (val === '#') {
                return 'right';
            } else if (val === 'F') {
                return 'down';
            }
            return 'up';
        case 'down':
            if (val === '.') {
                return 'right';
            } else if (val === '#') {
                return 'left';
            } else if (val === 'F') {
                return 'up';
            }
            return 'down';
        default:
            console.log('wtf', val)
    }
}

const move = (acc, part2) => {
    const mtx = acc.matrix;
    const curr = acc.curr;
    let x = curr.x;
    let y = curr.y;
    const val = curr.val
    const currDir = acc.direction;
    let newDir;
    let newVal;
    let burst = false;
    if (!part2) {
        if (val === '#') {
            newDir = newDirection(currDir, 'right');
            newVal = '.'
        } else {
            newDir = newDirection(currDir, 'left');
            newVal = '#'
            burst = true;
        }
    } else {
        if (val === '#') {
            newDir = newDirection2(currDir, val);
            newVal = 'F'
        } else if (val === '.') {
            newDir = newDirection2(currDir, val);
            newVal = 'W'
        } else if (val === 'F') {
            newDir = newDirection2(currDir, val);
            newVal = '.'
        } else {
            newDir = newDirection2(currDir, val);
            newVal = '#'
            burst = true;
        }
    }
    mtx[y][x] = newVal
    let newPos;
    switch (newDir) {
        case 'down':
            newPos = { x: x, y: y + 1 }
            break;
        case 'up':
            newPos = { x: x, y: y - 1 }
            break;
        case 'left':
            newPos = { x: x - 1, y: y }
            break;
        case 'right':
            newPos = { x: x + 1, y: y }
            break;
        default:
            console.log('wtf?', newDir)
            break;
    }
    if (newPos.y < 0) {
        mtx.splice(0, 0, []);
        newPos.y++;
    } else if (newPos.y >= mtx.length) {
        mtx.push([]);
    }
    if (newPos.x < 0) {
        for (let i = 0; i < mtx.length; i++) {
            mtx[i].splice(0, 0, []);
        }
        newPos.x++;
    }
    newPos.val = mtx[newPos.y][newPos.x] && mtx[newPos.y][newPos.x].length !== 0 ?  mtx[newPos.y][newPos.x] : '.';

    return { matrix: mtx, bursts: burst ? acc.bursts + 1 : acc.bursts, direction: newDir, curr: newPos };
}


fs.readFile('day22-puzzle.txt', 'utf-8', (err, data) => {
    const matrix = data
        .split('\n')
        .map(d => d.split(''))
        .reduce((acc, c, idx, arr) => {
            const mtx = [];
            for (let i = 0; i < c.length; i++) {
                mtx.push(c.splice(''));
            }
            return acc.concat(mtx)
        }, []);
    const matrix2 = matrix.map(m => m.map(m2 => m2));

    const startPos = { y: Math.floor(matrix.length / 2), x: Math.floor(matrix[0].length / 2) }
    startPos.val = matrix[startPos.y][startPos.x]
    let acc = { matrix: matrix, bursts: 0, direction: 'up', curr: startPos };
    // Part 1
    for (let i = 0; i < ROUNDS1; i++) {
        acc = move(acc, false);
    }
    console.log(acc.bursts);
    // Part 2
    let acc2 = { matrix: matrix2, bursts: 0, direction: 'up', curr: startPos }
    for (let i = 0; i < ROUNDS2; i++) {
        acc2 = move(acc2, true);
    }
    console.log(acc2.bursts)
});
