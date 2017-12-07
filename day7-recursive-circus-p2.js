const fs = require('fs');

const root = (program, tree) => {
    for (let i = 0; i < tree.length; i++) {
        const prog = tree[i];
        if (prog.childs.indexOf(program.name) >= 0) {
            return root(prog, tree);
        }
    }
    return program;
}

const getProgram = (programName, tree) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].name === programName) {
            return tree[i];
        }
    }
}

const getTotalWeight = (program, tree, acc) => {
    for (let i = 0; i < program.childs.length; i++) {
        const fullChild = getProgram(program.childs[i], tree);
        acc = acc + getTotalWeight(fullChild, tree, fullChild.weight);
    }
    return acc;
}

const find = (program, tree, diff) => {
    const programs = program.childs.map(c => {
        const fullProgram = getProgram(c, tree);
        const weight = getTotalWeight(fullProgram, tree, fullProgram.weight);
        return {
            program: fullProgram,
            weight: weight
        }
    });
    const next = programs.reduce((acc, c) => {
        if (!acc[c.weight]) {
            acc[c.weight] = [c];
        } else {
            acc[c.weight].push(c);
        }
        return acc;
    }, {});
    let nextProgram;
    let ideal;
    for (key in next) {
        if (next[key].length === 1) {
            nextProgram = next[key].pop();
        } else {
            ideal = next[key].pop().weight;
        }
    }
    if (nextProgram) {
        find(nextProgram.program, tree, ideal - nextProgram.weight);
    } else {
        console.log(program.weight + diff);
    }
}

const childWeights = (programs, tree, weight) => {
    const fullPrograms = programs.map(p => getProgram(p, tree));
    fullPrograms.forEach((prog) => {
        prog.fullChildren = prog.childs.map(p => getProgram(p, tree));
    })
    fullPrograms.forEach((prog) => {
        const weight = prog.weight + prog.fullChildren.reduce((acc, c) => acc + c.weight, 0)
        console.log(prog.name, weight)
        
    });
}

fs.readFile('day7-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').reduce((acc, c) => {
        const hasChildren = c.indexOf('->') > 0;
        return acc.concat({
            name: c.substring(0, c.indexOf(' ')).trim(),
            weight: parseInt(c.substring(c.indexOf('(') + 1, c.indexOf(')'))),
            childs: hasChildren ? c.substr(c.indexOf('->') + 2, c.length).split(',').map(c => c.trim()) : []
        })
    }, []);
    const rootProgram = root(puzzle[0], puzzle);
    find(rootProgram, puzzle, 0);
})
