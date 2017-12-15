const knotHash = (input) => {
    const listSize = 256;

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

    const list = [];
    for (let i = 0; i < listSize; i++) {
        list.push(i);
    }

    const asAscii = input.split('')
        .map(c => c.charCodeAt(0))
        .concat(17, 31, 73, 47, 23);

    let sparseHash = list.slice();
    let currPos = 0, skip = 0;
    let lengths = asAscii.slice();
    for (let rounds = 0; rounds < 64; rounds++) {
        asAscii.forEach((length) => {
            for (let i = 0; i < Math.floor(length / 2); i++) {
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
    return denseHash.reduce((acc, c) => acc + toHex(c), '');

}

module.exports = { knotHash }
