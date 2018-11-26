const puzzle = 359;
const ROUNDS_P1 = 2018;
const ROUNDS_P2 = 5*Math.pow(10, 7) + 1;

const splinlock = [];

let currIdx = 0;
let p1;
let p2;
for (let i = 0; i < ROUNDS_P1; i++) {
    currIdx = (((currIdx + puzzle) % splinlock.length) || 0) + 1;
    splinlock.splice(currIdx, 0, i);
    if (i === 2017) {
        p1 = splinlock[currIdx + 1];
    }
}
currIdx = 0;
for (let i = 0; i < ROUNDS_P2; i++) {
    currIdx = (((currIdx + puzzle) % i) || 0) + 1;
    if (currIdx === 1) {
        p2 = i;
    }
}
console.log(p1);
console.log(p2);
