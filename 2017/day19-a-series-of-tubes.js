const fs = require('fs');


const hasValue = (val) => {
    return val && val.length > 0 && val !== ' '
}

const nextDirection = (x, y, currDirection, puzzle) => {
    if (hasValue(puzzle[y + 1][x]) && currDirection !== 'up') {
        return {
            x: x,
            y: y + 1,
            direction: 'down'
        }
    } else if (hasValue(puzzle[y - 1][x]) && currDirection !== 'down') {
        return {
            x: x,
            y: y - 1,
            direction: 'up'
        }
    } else if (hasValue(puzzle[y][x + 1]) && currDirection !== 'left') {
        return {
            x: x + 1,
            y: y,
            direction: 'right'
        }
    } else if (hasValue(puzzle[y][x - 1]) && currDirection !== 'right') {
        return {
            x: x - 1,
            y: y,
            direction: 'left'
        }
    } else {
        console.log('wtf?', puzzle[y][x]);
    }
}

const next = (x, y, direction, puzzle) => {
    switch (direction) {
        case 'down':
            const nextDown = puzzle[y + 1][x];
            if (nextDown === '+') {
                return nextDirection(x, y + 1, direction, puzzle)
            } else {
                return {
                    x: x,
                    y: y + 1,
                    direction: 'down'
                }
            }
            break;
        case 'right':
            const nextRight = puzzle[y][x + 1];
            if (nextRight === '+') {
                return nextDirection(x + 1, y, direction, puzzle);
            } else {
                return {
                    x: x + 1,
                    y: y,
                    direction: 'right'
                }
            }
            break;
        case 'up':
            const nextUp = puzzle[y - 1][x];
            if (nextUp === '+') {
                return nextDirection(x, y - 1, direction, puzzle)
            } else {
                return {
                    x: x,
                    y: y - 1,
                    direction: 'up'
                }
            }
            break;
        case 'left':
            const nextLeft = puzzle[y][x - 1];
            if (nextLeft === '+') {
                return nextDirection(x - 1, y, direction, puzzle)
            } else {
                return {
                    x: x - 1,
                    y: y,
                    direction: 'left'
                }
            }
            break;
        default:
            console.log('wtf?', direction)
            break;
    }
}

fs.readFile('day19-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').reduce((acc, c) => {
        return acc.concat([c.split('')]);
    }, []);

    const letters = [];
    let x = 1;
    let y = 0;
    let direction = 'down';
    let steps = 0;
    while (true) {
        const nextCoord = next(x, y, direction, puzzle);
        x = nextCoord.x;
        y = nextCoord.y;
        if (direction !== nextCoord.direction) {
            steps = steps + 2
        } else {
            steps = steps  + 1;
        }
        direction = nextCoord.direction;
        const val = puzzle[y][x];
        if (hasValue(val) && val !== '+' && val !== '|' && val !== '-') {
            letters.push(val);
        }
        if (!hasValue(val)) {
            break;
        }
    }
    console.log(letters.reduce((acc, c) => acc + c, ''));
    console.log(steps);
})
