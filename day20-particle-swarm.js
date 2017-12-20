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

    // Part 2
    const posEquals = (p1, p2) => {
        return p1[0] === p2[0] && p1[1] === p2[1] && p1[2] === p2[2]
    }
    const hasPassed = (p1, p1Next, p2, p2Next) => {
        const [x1, y1, z1] = p1;
        const [x1Next, y1Next, z1Next] = p1Next;
        const [x2, y2, z2] = p2;
        const [x2Next, y2Next, z2Next] = p2Next;
        return ((x1 > x2 && x1Next < x2Next) || (x1 < x2 && x1Next > x2Next)) ||
               ((y1 > y2 && y1Next < y2Next) || (y1 < y2 && y1Next > y2Next)) ||
               ((z1 > z2 && z1Next < z2Next) || (z1 < z2 && z1Next > z2Next))
    }
    const willCollide = (p1, p2, rounds) => {
        if (posEquals(p1.p, p2.p)) {
            return true;
        }
        const newVelocity = p1.v.map((v, idx) => v + p1.a[idx]);
        const newPos = p1.p.map((p, idx) => p + newVelocity[idx]);
        const nextp1 = {
            p: newPos,
            v: newVelocity,
            a: p1.a
        };
        const newVelocity2 = p2.v.map((v, idx) => v + p2.a[idx]);
        const newPos2 = p2.p.map((p, idx) => p + newVelocity2[idx]);
        const nextp2 = {
            p: newPos2,
            v: newVelocity2,
            a: p2.a
        }
        if (hasPassed(p1.p, nextp1.p, p2.p, nextp2.p) || rounds > 100) {
            return false;
        }
        return willCollide(nextp1, nextp2, rounds + 1);
    }
    let collidingParticles = [];
    for (let i = 0; i < particles.length - 1; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (willCollide(p1, p2, 0)) {
                collidingParticles = collidingParticles.concat(p1.pos, p2.pos);
            }
        }
    }
    const unique = collidingParticles.filter((p, idx, arr) => arr.indexOf(p) === idx);
    console.log(particles.length - unique.length);
})
