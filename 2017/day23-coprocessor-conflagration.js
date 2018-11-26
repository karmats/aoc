const fs = require('fs')

const findRegistry = (reg, registries) => {
    if (!registries[reg]) {
        registries[reg] = { val: 0 };
    }
    return registries[reg];
}
const argumentValue = (arg, registries) => {
    if (arg.length === 0) {
        return undefined;
    }
    const no = parseInt(arg);
    if (isNaN(no)) {
        return registries[arg] ? registries[arg].val : 0;
    }
    return no;
}

fs.readFile('day23-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').map(instr => {
        return {
            op: instr.substring(0, 3),
            reg: instr.substring(4, 5),
            arg: instr.substring(6)
        }
    });

    const registries = {};
    let mulTimes = 0;

    // Part 1
    for (let i = 0; i < puzzle.length;) {
        const instruction = puzzle[i];
        const registry = findRegistry(instruction.reg, registries);
        const argValue = argumentValue(instruction.arg, registries);
        switch (instruction.op) {
            case 'set':
                registry.val = argValue;
                i++;
                break;
            case 'sub':
                registry.val = registry.val - argValue;
                i++;
                break;
            case 'mul':
                registry.val = registry.val * argValue;
                i++;
                mulTimes++;
                break;
            case 'jnz':
                let jump = 1;
                if ((isNaN(instruction.reg) && registry.val !== 0) ||
                    !isNaN(instruction.reg) && parseInt(instruction.reg) !== 0) {
                    jump = argValue;
                }
                i = i + jump;
                break;
            default:
                console.log('wtf?', instruction.op);
                break;
        }
    }
    console.log(mulTimes)

    // Part 2
    const regs = {
        a: 1,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0
    };
    regs.b = 84 * 100 + 100000
    regs.c = regs.b + 17000
    do {
        regs.f = 1
        regs.d = 2
        for (let d = regs.d; d * d < regs.b; d++) {
            if (regs.b % d === 0) {
                regs.f = 0
                break
            }
        }
        if (regs.f === 0) {
            regs.h++
        }
        regs.g = regs.b - regs.c
        regs.b += 17
    } while (regs.g !== 0)
    console.log(regs.h)
})
