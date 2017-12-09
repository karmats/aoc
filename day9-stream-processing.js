const fs = require('fs');


fs.readFile('day9-puzzle.txt', 'utf-8', (err, data) => {
    const result = data.split('').reduce((acc, char) => {
        if (acc.ignore) {
            acc.ignore = false;
            return acc;
        }
        if (acc.garbage && char !== '!' && char !== '>') {
            acc.garbageCount++;
        }
        switch(char) {
            case '{':
                acc.nest = acc.garbage ? acc.nest : acc.nest + 1;
                break;
            case '}':
                if (!acc.garbage) {
                    acc.score = acc.score + acc.nest;
                    acc.nest = acc.nest - 1;
                }
                break;
            case '!':
                acc.ignore = acc.garbage;
                break;
            case '<':
                acc.garbage = true;
                break;
            case '>':
                acc.garbage = false;
                break;
        }
        return acc;
    }, {nest: 0, score: 0, ignore: false, garbage: false, garbageCount: 0})

    console.log(result.score);
    console.log(result.garbageCount);
});
