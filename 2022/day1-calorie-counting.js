const { fileToPuzzle } = require("./util");

fileToPuzzle("day1-puzzle.txt", (puzzle) => {
  const elfCalories = [];
  let currentCount = 0;
  for (let i = 0; i < puzzle.length; i++) {
    const currentCalory = puzzle[i];
    if (currentCalory === "") {
      elfCalories.push(currentCount);
      currentCount = 0;
    } else {
      currentCount += +currentCalory;
    }
  }

  // Part 1
  elfCalories.sort((a,b) => b-a);
  console.log(elfCalories[0]);

  // Part 2
  console.log(elfCalories[0] + elfCalories[1] + elfCalories[2])
});
