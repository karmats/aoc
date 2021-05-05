const PUZZLE = "cqjxjnds";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const INVALID_CHARS = ["i", "o", "l"];

const increment = (str) => {
  let incremented = str;
  for (let i = str.length - 1; i >= 0; i--) {
    const charIdx = ALPHABET.indexOf(incremented[i]);
    const next = ALPHABET[(charIdx + 1) % ALPHABET.length];
    incremented = incremented.substr(0, i) + next + incremented.substr(i + 1);
    if (next !== "a") {
      return incremented;
    }
  }
};

const isValid = (password) => {
  if (INVALID_CHARS.some((c) => password.includes(c))) {
    return false;
  }
  let increasing = false;
  const overlappingChars = [];
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      overlappingChars.push(password[i]);
    }
    if (i < password.length - 3) {
      const [idxA, idxB, idxC] = [ALPHABET.indexOf(password[i]), ALPHABET.indexOf(password[i + 1]), ALPHABET.indexOf(password[i + 2])];
      if (idxC - idxB === 1 && idxB - idxA === 1) {
        increasing = true;
      }
    }
  }
  return overlappingChars.length >= 2 && overlappingChars[0] !== overlappingChars[1] && increasing;
};

// Part 1
let newPassword = PUZZLE;
while (!isValid(newPassword)) {
  newPassword = increment(newPassword);
}
console.log(newPassword);

// Part 2
newPassword = increment(newPassword);
while (!isValid(newPassword)) {
  newPassword = increment(newPassword);
}
console.log(newPassword);
