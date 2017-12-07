const puzzle = 347991;
//const puzzle = 70;

const coordinates = [];

const nextDirection = (direction) => {
    switch (direction) {
        case 'right':
            return 'up';
        case 'up':
            return 'left'
        case 'left':
            return 'down'
        case 'down':
        default:
            return 'right'
    }
}

const coordinateValueAndDirection = (x, y, pos, direction) => {
    let sum = 0;
    let nextDir = nextDirection(direction);
    for (let i = pos - 1; i >= 0; i--) {
        const coord = coordinates[i];
        if (pos === 1) {
        }
        if (coord.x === x + 1 && coord.y === y) {
            if (direction === 'down') {
                nextDir = direction;
            }
            sum += coord.value;
        } else if (coord.x === x - 1 && coord.y === y) {
            if (direction === 'up') {
                nextDir = direction;
            }
            sum += coord.value;
        } else if (coord.x === x + 1 && coord.y === y + 1) {
            sum += coord.value;
        } else if (coord.x === x + 1 && coord.y === y - 1) {
            sum += coord.value;
        } else if (coord.x === x - 1 && coord.y === y + 1) {
            sum += coord.value;
        } else if (coord.x === x - 1 && coord.y === y - 1) {
            sum += coord.value;
        } else if (coord.x === x && coord.y === y - 1) {
            if (direction === 'left') {
                nextDir = direction;
            }
            sum += coord.value;
        } else if (coord.x === x && coord.y === y + 1) {
            if (direction === 'right') {
                nextDir = direction;
            }
            sum += coord.value;
        }

    }
    return { sum: sum, direction: nextDir };
}

const next = (currCoord, position) => {
    const result = {
        direction: currCoord.direction,
        x: currCoord.x,
        y: currCoord.y,
        position: position
    }
    const dir = coordinateValueAndDirection(currCoord.x, currCoord.y, position, currCoord.direction);
    switch (dir.direction) {
        case 'right':
            result.x = currCoord.x + 1;
            break;
        case 'up':
            result.y = currCoord.y + 1;
            break;
        case 'left':
            result.x = currCoord.x - 1;
            break;
        case 'down':
            result.y = currCoord.y - 1;
            break;
    }
    const val = coordinateValueAndDirection(result.x, result.y, position, currCoord.direction);
    
    result.value = val.sum;
    result.direction = dir.direction;

    return result;
}

let currentCoordinate = { direction: '', x: 0, y: 0, position: 0, value: 1 }
let result = 0;
for (let i = 1; i <= puzzle; i++) {
    coordinates.push(currentCoordinate);
    currentCoordinate = next(currentCoordinate, i)
    if (currentCoordinate.value > puzzle) {
        result = currentCoordinate.value;
        break;
    }
}
console.log(result);
