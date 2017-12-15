const knotHash = require('./knot-hash')

const puzzle = 'nbysizxe';

const toBinary = (input) => {
    let binary = parseInt(input, 16).toString(2);
    while(binary.length !== 4) {
        binary = '0' + binary;
    }
    return binary;
}

const replaceAtIndex = (string, index, replacement) => {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}
const rows = [];
for (let i = 0; i < 128; i++) {
    rows.push(knotHash.knotHash(puzzle + '-' + i));
}
const usedSquares = rows.reduce((acc, c) => {
    const bytes = c.split('');
    const bits = bytes.map(b => toBinary(b));
    return acc + bits.reduce((count, b) => count + (b.match(/1/g) || []).length, 0)
}, 0);


// Part 2
const pointToString = (x, y) => {
    return x + '_' + y;
}

let matrix = rows.reduce((res, row, rowIdx) => {
    const bytes = row.split('');
    const bits = bytes.map(b => toBinary(b)).reduce((a, b) => a + b, '').split('');
    return res.concat([bits.map(b => parseInt(b))]);
}, [])
.reduce((acc, c, idx, arr) => {
    for (let i = 0; i < c.length; i++) {
        if (c[i]) {
            const key = pointToString(i, idx);
            acc[key] = [];
            if (c[ i + 1]) {
                acc[key].push(pointToString(i + 1, idx));
            }
            if (c[i - 1]) {
                acc[key].push(pointToString(i - 1, idx));
            }
            if (idx < 127 && arr[idx + 1][i]) {
                acc[key].push(pointToString(i, idx + 1));
            }
            if (idx > 0 && arr[idx - 1][i]) {
                acc[key].push(pointToString(i, idx - 1));
            }
        }
    }
    return acc;
}, {});

const find = (square, acc, mtx) => {
    if (acc.indexOf(square) < 0) {
        acc.push(square);
        const points = mtx[square];
        for (let i = 0; i < points.length; i++) {
            const nextSquare = points[i];
            find(nextSquare, acc, mtx);
        }
    }
}
const squareHasRegion = (square, regions) => {
    return regions.some(region => region.some(p => p === square));
}
const regions = [];
for (key in matrix) {
    const region = [];
    if (!squareHasRegion(key, regions)) {
        find(key, region, matrix);
        regions.push(region);
    }
}

console.log(usedSquares)
console.log(regions.length)
