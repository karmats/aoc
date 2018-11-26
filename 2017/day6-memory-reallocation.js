const puzzle = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6];
//const puzzle = [0, 2, 7, 0];

const previous = [];

const arrayEquals = (arra, arrb) => {
    for (let i = 0; i < arra.length; i++) {
        if (arra[i] !== arrb[i]) {
            return false;
        }
    }
    return true;
}
const findHighestWithIndex = (arr) => {
    return arr.reduce((acc, c, idx) => {
        if (c > acc.max) {
            return {
                max: c,
                idx: idx
            }
        }
        return acc;
    }, { max : 0, idx: -1 })
}

const nextIdx = (arr, curr) => {
    if (curr + 1 >= arr.length) {
        return 0;
    }
    return curr + 1;
}

let currentArray = puzzle.slice();
let cycles = 0;
let idxMatch = 0;
while (true) {
    const highestWithIndex = findHighestWithIndex(currentArray);

    let left = highestWithIndex.max;
    currentArray[highestWithIndex.idx] = 0;
    for (let i = nextIdx(currentArray, highestWithIndex.idx); left > 0; i = nextIdx(currentArray, i), left--) {
        currentArray[i] = currentArray[i] + 1;
    }
    const newArray = currentArray.slice();
    const alreadyExists = previous.reduce((acc, c, idx) => {
        if (arrayEquals(c, newArray)) {
            return {bool: true, idx: idx + 1};
        }
        return acc;
    }, { bool: false });
    cycles++;
    if (alreadyExists.bool) {
        idxMatch = alreadyExists.idx;
        break;
    }
    previous.push(newArray);
}

console.log(cycles - idxMatch);
