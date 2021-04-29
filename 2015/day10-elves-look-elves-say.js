const PUZZLE = "1321131112";

const playLookAndSay = (input, timesPlayed, timesToPlay) => {
  if (timesPlayed === timesToPlay) {
    return input;
  }
  let newInput = "";
  for (let i = 0; i < input.length; ) {
    let count = 0;
    let currInt = input[i];
    while (input[i] === currInt) {
      count++;
      i++;
    }

    newInput += `${count}${currInt}`;
  }
  return playLookAndSay(newInput, timesPlayed + 1, timesToPlay);
};

// Part 1
console.log(playLookAndSay(PUZZLE, 0, 40).length);

// Part 2
console.log(playLookAndSay(PUZZLE, 0, 50).length);
