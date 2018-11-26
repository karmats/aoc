const puzzle = {
    a: {
        start: 618,
        factor: 16807
    },
    b: {
        start: 814,
        factor: 48271
    }
}

const DIVIDER = 2147483647;
const ROUNDS = 4*Math.pow(10, 7);
const ROUNDS_P2 = 5*Math.pow(10, 6);

const toBinary = (input) => {
    return parseInt(input, 10).toString(2);
}

let a = puzzle.a.start;
let b = puzzle.b.start;
let count = 0;
const as = [];
const bs = [];
for (let i = 0; i < ROUNDS_P2;) {
    a = (a*puzzle.a.factor) % DIVIDER;
    b = (b*puzzle.b.factor) % DIVIDER;
    if (a%4 === 0) {
        as.push(a);
        if (bs.length >= as.length) {
            i++;
        }
    }
    if (b%8 === 0) {
        bs.push(b);
        if (as.length >= bs.length) {
            i++;
        }
    }
}
for (let i = 0; i < as.length; i++) {
    const aBinary = toBinary(as[i]);
    const bBinary = toBinary(bs[i]);
    if (aBinary.substring(aBinary.length-16) === bBinary.substring(bBinary.length-16)) {
        count++
    }
}
console.log(count);
