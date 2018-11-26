const fs = require('fs')


fs.readFile('day24-puzzle.txt', 'utf-8', (err, data) => {
    const parts = data.split('\n').map(p => {
        const tuple = p.split('/');
        return [parseInt(tuple[0]), parseInt(tuple[1])]
    });

    let maxStrength = 0;
    let maxLength = 0;
    let maxLengthStrength = 0;

    const build = (pin, parts, acc) => {
        const nextParts = parts.filter(p => p[0] === pin || p[1] === pin);
        if (nextParts.length === 0) {
            const strength = acc.reduce((sum, c) => sum + c, 0);
            const length = acc.length/2;
            maxStrength = strength > maxStrength ? strength : maxStrength;
            if (length > maxLength || (length === maxLength && strength > maxLengthStrength)) {
                maxLength = length;
                maxLengthStrength = strength;
            }
        }
        for (let i = 0; i < nextParts.length; i++) {
            const part = nextParts[i];
            const partIdx = part[0] === pin ? 1 : 0
            build(part[partIdx], parts.filter(p => p !== part), acc.concat(part))
        }
    }

    const res = build(0, parts, []);
    console.log(maxStrength)
    console.log(maxLengthStrength)
})
