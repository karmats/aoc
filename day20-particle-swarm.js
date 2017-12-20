const fs = require('fs');

const regex = /^[a-z]=<(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)>?$/;

fs.readFile('day20-puzzle.txt', 'utf-8', (err, data) => {
    const particles = data.split('\n').map((str, idx) => {
        const arr = str.split('>,');
        const pos = regex.exec(arr[0].trim())
        const vel = regex.exec(arr[1].trim())
        const acc = regex.exec(arr[2].trim())
        return {
            p: [parseInt(pos[1]), parseInt(pos[2]), parseInt(pos[3])],
            v: [parseInt(vel[1]), parseInt(vel[2]), parseInt(vel[3])],
            a: [parseInt(acc[1]), parseInt(acc[2]), parseInt(acc[3])],
            pos: idx
        }
    });
    const result = particles
        .reduce((acc, particle, idx) => {
            const sumAcc = particle.a.reduce((sum, a) => Math.abs(a) + sum, 0);
            if (!acc.length || acc.some(p => p.sumAcc > sumAcc)) {
                return [{
                    sumAcc: sumAcc,
                    particle: particle,
                    pos: idx
                }]
            } else if (acc.some(p => p.sumAcc === sumAcc)) {
                return acc.concat({
                    sumAcc: sumAcc,
                    particle: particle,
                    pos: idx
                })
            }
            return acc;
        }, [])
        .reduce((acc, c) => {
            const [ax, ay, az] = c.particle.a;
            const [vx, vy, vz] = c.particle.v;
            const xMove = Math.abs(vx + ax);
            const yMove = Math.abs(vy + ay);
            const zMove = Math.abs(vz + az);
            if (xMove < Math.abs(vx) && Math.abs(vx) > acc.vel) {
                return {
                    pos: c.pos,
                    vel: Math.abs(vx)
                }
            } else if (yMove < Math.abs(vy) && Math.abs(vy) > acc.vel) {
                return {
                    pos: c.pos,
                    vel: Math.abs(vy)
                }
            } else if (zMove < Math.abs(vz) && Math.abs(vz) > acc.vel) {
                return {
                    pos: c.pos,
                    vel: Math.abs(vz)
                }
            }
            return acc;
        }, { pos: 0, vel: 0 })
    console.log(result.pos)

    const posAtTime = (pos, v, a, time) => {
        return a*time*(time+1)/2 + v*time + pos;
    }
    // Part 2
    const posEquals = (p1, p2) => {
        return p1[0] === p2[0] && p1[1] === p2[1] && p1[2] === p2[2]
    }
    let dead = [];
    let parts = []
    for (let time = 0; time < 50; time++) {
        parts = particles.filter((p) => dead.indexOf(p.pos) < 0)
        for (let i = 0; i < parts.length - 1; i++) {
            const p1 = parts[i];
            const pos1 = p1.p.map((p, idx) => posAtTime(p, p1.v[idx], p1.a[idx], time));
            for (let j = i + 1; j < parts.length; j++) {
                const p2 = parts[j];
                const pos2 = p2.p.map((p, idx) => posAtTime(p, p2.v[idx], p2.a[idx], time));
                if (posEquals(pos1, pos2)) {
                    dead.push(p1.pos, p2.pos)
                }
            }
        }
        dead = dead.filter((d, idx, arr) => arr.indexOf(d) === idx);
    }
    console.log(parts.length);
})
