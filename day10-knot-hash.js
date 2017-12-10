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

const toHex = (num) => {
    const hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
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

// Part 2
const puzzleAsAscii = puzzle.split('')
    .map(c => c.charCodeAt(0))
    .concat(17, 31, 73, 47, 23);

let sparseHash = list.slice();
let currPos = 0, skip = 0;
let lengths = puzzleAsAscii.slice();
for (let rounds = 0; rounds < 64; rounds++) {
    puzzleAsAscii.forEach((length) => {
        for (let i = 0; i < Math.floor(length/2); i++) {
            const aIdx = (currPos + i) % listSize;
            const bIdx = (currPos + length - i - 1) % listSize;
            sparseHash = swap(aIdx, bIdx, sparseHash);
        }
        currPos = (currPos + length + skip) % listSize;
        skip = skip + 1;
    });
}

const denseHash = [];
for (let from = 0, to = 16; from < listSize; from = from + 16, to = to + 16) {
    const subArray = sparseHash.slice(from, to);
    const res = subArray.reduce((acc, c, idx, arr) => idx < arr.length ? c ^ acc : acc, 0);
    denseHash.push(res);
}
const hash = denseHash.reduce((acc, c) => acc + toHex(c), '');

console.log(result.res[0] * result.res[1])
console.log(hash);
