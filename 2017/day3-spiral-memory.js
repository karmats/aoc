const puzzle = 347991;

const coordinates = [];

const hasCoordinateIn = (x, y, val) => {
    for (let i = val; i > 0; i--) {
        const coord = coordinates[i];
        if (coord.x === x && coord.y === y) {
            return true;
        }
    }
    return false;
}

const step = (currCoord, currNumber) => {
    const result = {
        direction: currCoord.direction,
        x: currCoord.x,
        y: currCoord.y,
        value: currNumber
    }
    switch(currCoord.direction) {
        case 'right':
            if (hasCoordinateIn(currCoord.x, currCoord.y + 1, currNumber)) {
                result.x = currCoord.x + 1;
            } else {
                result.direction = 'up';
                result.y = currCoord.y + 1;
            }
            break;
        case 'up':
            if (hasCoordinateIn(currCoord.x - 1, currCoord.y, currNumber)) {
                result.y = currCoord.y + 1;
            } else {
                result.direction = 'left';
                result.x = currCoord.x - 1;
            }
            break;
        case 'left':
            if (hasCoordinateIn(currCoord.x, currCoord.y - 1, currNumber)) {
                result.x = currCoord.x - 1;
            } else {
                result.direction = 'down';
                result.y = currCoord.y - 1;
            }
            break;
        case 'down':
            if (hasCoordinateIn(currCoord.x + 1, currCoord.y, currNumber)) {
                result.y = currCoord.y - 1;
            } else {
                result.direction = 'right';
                result.x = currCoord.x + 1;
            }
            break;
    }
    return result;
}

let currentCoordinate = { value: 1, x: 0, y: 0, direction: 'right' }
coordinates.push(currentCoordinate);
for (let i = 1; i <= puzzle; i++) {
    coordinates.push(currentCoordinate);
    currentCoordinate = step(currentCoordinate, i)
}
const result = coordinates[puzzle];
console.log(Math.abs(result.x) + Math.abs(result.y));
