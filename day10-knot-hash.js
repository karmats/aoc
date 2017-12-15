const knotHash = require('./knot-hash').knotHash

const puzzle = '157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30';
const listSize = 256;

const list = [];
for (let i = 0; i < listSize; i++) {
    list.push(i);
}

const swap = (pos1, pos2, arr) => {
    const firstVal = arr[pos1];
    arr[pos1] = arr[pos2];
    arr[pos2] = firstVal;
    return arr;
}

const result = puzzle
.split(',')
.map(l => parseInt(l))
.reduce((acc, length) => {
    let arr = acc.res;
    for (let i = 0; i < Math.floor(length/2); i++) {
        const aIdx = (acc.currPos + i) % listSize;
        const bIdx = (acc.currPos + length - i - 1) % listSize;
        arr = swap(aIdx, bIdx, arr);
    }
    const newPos = (acc.currPos + length + acc.skip) % listSize;
    return {
        res: arr,
        currPos: newPos,
        skip: acc.skip + 1
    };
}, { res: list.slice(), skip: 0, currPos: 0 } );

console.log(result.res[0] * result.res[1])

// Part 2
console.log(knotHash(puzzle));
