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

fs.readFile('day7-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').reduce((acc, c) => {
        const hasChildren = c.indexOf('->') > 0;
        return acc.concat({
            name: c.substring(0, c.indexOf(' ')).trim(),
            weight: parseInt(c.substring(c.indexOf('(') + 1, c.indexOf(')'))),
            childs: hasChildren ? c.substr(c.indexOf('->') + 2, c.length).split(',').map(c => c.trim()) : []
        })
    }, []);
    console.log(root(puzzle[0], puzzle));
})
