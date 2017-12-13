const fs = require('fs');

fs.readFile('day13-puzzle.txt', 'utf-8', (err, data) => {
    const puzzle = data.split('\n').map(d => {
        return {
            depth: parseInt(d.substring(0, d.indexOf(':')).trim()),
            range: parseInt(d.substring(d.indexOf(':') +  1, d.length).trim())
        }
    });

    for (let wait = 0;; wait++) {
        const caughts = puzzle.reduce((acc, layer) => {
            if ((wait + layer.depth) % ((layer.range - 1) * 2)  === 0) {
                return {
                    hits: acc.hits.concat(layer.depth),
                    severity: acc.severity + (layer.range * layer.depth)
                }
            }
            return acc;
        }, { hits: [], severity: 0 });
        if (wait === 0) {
            console.log(caughts.severity);
        }
        if (!caughts.hits.length) {
            console.log(wait);
            break;
        }
    }
})
