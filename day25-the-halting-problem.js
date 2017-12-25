const ROUNDS = 12261543

let state = 'A';
let result = [];
let currentIdx = 0;
for (let i = 0; i < ROUNDS; i++) {
    if (currentIdx < 0) {
        result.splice(0, 0, 0);
        currentIdx = 0;
    }
    const current = result[currentIdx] || 0;
    if (state === 'A' && current === 0) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'B';
    } else if (state === 'A' && current === 1) {
        result[currentIdx] = 0;
        currentIdx--;
        state = 'C'
    } else if (state === 'B' && current === 0) {
        result[currentIdx] = 1;
        currentIdx--;
        state = 'A';
    } else if (state === 'B' && current === 1) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'C'
    } else if (state === 'C' && current === 0) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'A';
    } else if (state === 'C' && current === 1) {
        result[currentIdx] = 0;
        currentIdx--;
        state = 'D'
    }  else if (state === 'D' && current === 0) {
        result[currentIdx] = 1;
        currentIdx--;
        state = 'E';
    } else if (state === 'D' && current === 1) {
        result[currentIdx] = 1;
        currentIdx--;
        state = 'C'
    } else if (state === 'E' && current === 0) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'F';
    } else if (state === 'E' && current === 1) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'A'
    } else if (state === 'F' && current === 0) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'A';
    } else if (state === 'F' && current === 1) {
        result[currentIdx] = 1;
        currentIdx++;
        state = 'E'
    }
}
console.log(result.reduce((sum, c) => c === 1 ? sum + 1 : sum))
