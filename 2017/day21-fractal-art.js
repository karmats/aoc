const fs = require('fs')

const rules = {};

fs.readFile('day21-puzzle.txt', 'utf-8', (err, data) => {

    data.split('\n').forEach(d => {
        const tokens = d.split(' => ');
        rules[tokens[0]] = tokens[1];
    });

    const fractalArt = (totalReps) => {
        let grid = ['.#.', '..#', '###'];
        for (let loop = 0; loop < totalReps; loop++) {
            const sub = subgrids(grid);
            for (var l = 0; l < sub.length; l++) {
                sub[l] = rule(sub[l]);
            }
            grid = reform(sub);
        }
        return grid;
    }

    const rule = (str) => {
        for (let i = 0; i < 2; i++)
            for (let j = 0; j < 4; j++) {
                const s = morph(str, j, i)
                if (rules[s]) {
                    return rules[s];
                }
            }
    }

    const morph = (str, rotate, flip) => {
        let s = str.split('/');
        if (flip) {
            s.reverse();
        }
        for (let r = 0; r < rotate; r++) {
            const n = [];
            for (let i = 0; i < s.length; i++) {
                let news = "";
                for (let j = s.length - 1; j >= 0; j--)
                    news += s[j][i];
                n.push(news)
            }
            s = n;
        }
        return s.join('/')
    }

    const subgrids = (grid) => {
        const num = grid.length % 2 == 0 ? 2 : 3;
        const strs = [];
        for (let i = 0; i < grid.length; i += num)
            for (let j = 0; j < grid.length; j += num) {
                let str = "";
                for (let k = 0; k < num; k++) {
                    str += grid[i + k].substring(j, j + num) + "/"
                }
                strs.push(str.substr(0, str.length - 1));
            }
        return strs;
    }

    const reform = (arr) => {
        const g = [];
        const num = Math.sqrt(arr.length);
        const strlen = arr[0].match(/\//g).length + 1;
        for (let i = 0; i < arr.length; i += num)
            for (let j = 0; j < strlen; j++) {
                let str = "";
                for (let k = 0; k < num; k++) {
                    str += arr[i + k].split('/')[j];
                }
                g.push(str);
            }
        return g;
    }

    const grid1 = fractalArt(5);
    const count1 = grid1.reduce((acc, c) => acc + c.match(/#/g).length, 0)
    console.log(count1);

    const grid2 = fractalArt(18);
    const count2 = grid2.reduce((acc, c) => acc + c.match(/#/g).length, 0)
    console.log(count2);

});
