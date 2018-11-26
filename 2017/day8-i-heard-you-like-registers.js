const fs = require('fs');

const puzzle = [
    'b inc 5 if a > 1',
    'a inc 1 if b < 5',
    'c dec -10 if a >= 1',
    'c inc -20 if c == 10'
]

const result = {};

const checkCondition = (reg, exp, expNo) => {
    const currVal = result[reg] || 0;
    switch (exp) {
        case '<':
            return currVal < expNo;
        case '<=':
            return currVal <= expNo;
        case '>':
            return currVal > expNo;
        case '>=':
            return currVal >= expNo;
        case '==':
            return currVal === expNo;
        case '!=':
            return currVal !== expNo;
        default:
            console.log('WTF?', exp);
            return false;

    }
}

const parseInstruction = (instruction) => {
    const regEx = /^([a-z]+)\s(inc|dec)\s(-?[0-9]+)\sif\s([a-z]+)\s(>|>=|<|<=|==|!=)\s(-?[0-9]+)$/

    if (!regEx.test(instruction)) {
        console.log('failed to compile', instruction);
        return;
    }
    const instructionArray = regEx.exec(instruction);
    const register = instructionArray[1];
    const operation = instructionArray[2];
    const num = parseInt(instructionArray[3]);
    const conditionRegister = instructionArray[4];
    const expression = instructionArray[5];
    const expressionNo = parseInt(instructionArray[6]);

    if (checkCondition(conditionRegister, expression, expressionNo)) {
        const currVal = result[register] || 0;
        if (operation === 'inc') {
            result[register] = currVal + num;
        } else if (operation === 'dec') {
            result[register] = currVal - num;
        } else {
            console.log('WTF?', operation)
        }
    }
    return result[register];
}

fs.readFile('day8-puzzle.txt', 'utf-8', (err, data) => {
    let max = 0;
    data.split('\n').forEach((instruction) => {
        const res = parseInstruction(instruction);
        max = res > max ? res : max;
    });
    // Part 1
    /*for (let key in result) {
        max = result[key] > max ? result[key] : max;
    }*/
    console.log(max);
})
