const fs = require('fs');
//const puzzle = ['s1', 'x3/4', 'pe/b'];

let programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
const copy = programs.slice();
const ROUNDS = Math.pow(10, 9);

const swapIdx = (a, b, arr) => {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
    return arr;
}

const swapPrg = (a, b, arr) => {
    return swapIdx(arr.indexOf(a), arr.indexOf(b), arr);
}

const spin = (times, arr) => {
    arr.unshift(...arr.splice(-times, times));
    return arr;
}

fs.readFile('day16-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split(',');
    const puzzleInstr = puzzle.reduce((acc, move) => {
        const m = move.substring(0, 1);
        const who = move.substring(1);
        switch (m) {
            case 's':
                return acc.concat({
                    op: 's',
                    a: parseInt(who)
                })
            case 'x':
                const idxA = parseInt(who.substring(0, who.indexOf('/')));
                const idxB = parseInt(who.substring(who.indexOf('/') + 1));
                return acc.concat({
                    op: 'x',
                    a: idxA,
                    b: idxB
                })
            case 'p':
                const prgA = who.substring(0, who.indexOf('/'));
                const prgB = who.substring(who.indexOf('/') + 1);
                return acc.concat({
                    op: 'p',
                    a: prgA,
                    b: prgB
                });
            default:
                console.log('wtf?', m);
        }
        return acc;
    }, []);

    let i = 0;
    let cycle;
    let rounds = ROUNDS;
    while (i < rounds) {
        puzzleInstr.forEach(instr => {
            switch (instr.op) {
                case 's':
                    spin(instr.a, programs);
                    break;
                case 'x':
                    swapIdx(instr.a, instr.b, programs);
                    break;
                case 'p':
                    swapPrg(instr.a, instr.b, programs);
                    break;
            }
        });
        // Part 1
        if (i === 0) {
            console.log(programs.reduce((acc, c) => acc + c));
        }
        // Part 2
        if (programs.every((p, idx) => copy[idx] === p)) {
            rounds = ROUNDS%(i + 1);
            i = 0;
        } else {
            i++;
        }
    }
    console.log(programs.reduce((acc, c) => acc + c));
})
