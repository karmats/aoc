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

fs.readFile('day18-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').map(instr => {
        return {
            op: instr.substring(0, 3),
            reg: instr.substring(4, 5),
            arg: instr.substring(6)
        }
    });

    const registries = {};
    let hasRecovered = false;
    for (let i = 0; i < puzzle.length;) {
        const instruction = puzzle[i];
        const registry = findRegistry(instruction.reg, registries);
        const argValue = argumentValue(instruction.arg, registries);;
        switch (instruction.op) {
            case 'set':
                registry.val = argValue;
                i++;
                break;
            case 'add':
                registry.val = registry.val + argValue;
                i++;
                break;
            case 'mul':
                registry.val = registry.val * argValue;
                i++;
                break;
            case 'mod':
                registry.val = registry.val % argValue;
                i++;
                break;
            case 'jgz':
                if (registry.val > 0) {
                    i = i + argValue;
                } else {
                    i++;
                }
                break;
            case 'snd':
                registry.lastPlayed = registry.val;
                i++;
                break;
            case 'rcv':
                if (registry.val !== 0 && registry.lastPlayed) {
                    console.log(registry.lastPlayed);
                    hasRecovered = true;
                }
                i++;
                break;
            default:
                console.log('wtf?', instruction.op);
                break;
        }
        if (hasRecovered) {
            break;
        }
    }

    // Part 2
    const doAction = (program, otherProgram) => {
        const instruction = puzzle[program.pos];
        if (instruction.op === 'snd' || instruction.op === 'rcv' || instruction.op === 'jgz') {
            let argValue = argumentValue(instruction.reg, program.registries);
            if (instruction.op === 'snd') {
                program.queue.push(argValue)
                program.sent++;
                program.pos++;
            } else if (instruction.op === 'rcv') {
                if (otherProgram.queue.length) {
                    program.wait = false;
                    const registry = findRegistry(instruction.reg, program.registries);
                    const val = otherProgram.queue.shift();
                    registry.val = val;
                    program.pos++;
                } else {
                    program.wait = true;
                }
            } else if (instruction.op === 'jgz') {
                const val = argumentValue(instruction.reg, program.registries);
                const jump = argumentValue(instruction.arg, program.registries);
                if (val > 0) {
                    program.pos = program.pos + jump;
                } else {
                    program.pos++;
                }
            }
        } else {
            const registry = findRegistry(instruction.reg, program.registries);
            const argValue = argumentValue(instruction.arg, program.registries);
            switch (instruction.op) {
                case 'set':
                    registry.val = argValue;
                    program.pos++;
                    break;
                case 'add':
                    registry.val = registry.val + argValue;
                    program.pos++;
                    break;
                case 'mul':
                    registry.val = registry.val * argValue;
                    program.pos++;
                    break;
                case 'mod':
                    registry.val = registry.val % argValue;
                    program.pos++;
                    break;
                default:
                    console.log('wtf?', instruction.op);
                    break;
            }
        }
    }

    const programs = [
        { queue: [], pos: 0, registries: { 'p': { val: 0 } }, sent: 0, wait: false },
        { queue: [], pos: 0, registries: { 'p': { val: 1 } }, sent: 0, wait: false }
    ]
    while (programs[0].pos < puzzle.length && programs[1].pos < puzzle.length &&
        !(programs[0].wait && programs[1].wait)) {
        doAction(programs[0], programs[1])
        doAction(programs[1], programs[0])
    }
    console.log(programs[1].sent);
})
