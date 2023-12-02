import { fileToPuzzle } from "./util.mjs";

fileToPuzzle("day2-puzzle.txt", (games) => {
  const allGames = games.map((g) => {
    const [gameString, setString] = g.split(":");
    return [gameString, ...setString.split(";")];
  });

  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let part1 = 0;
  let part2 = 0;
  for (let g = 0; g < allGames.length; g++) {
    let possible = true;
    let minCubes = { red: 0, green: 0, blue: 0 };
    const [id, ...sets] = allGames[g];
    for (let i = 0; i < sets.length; i++) {
      const set = sets[i].split(",").map((cubeString) => cubeString.trim());
      const cubes = set.reduce(
        (res, s) => {
          const [amount, color] = s.split(" ");
          res[color] = +amount;
          return res;
        },
        { red: 0, green: 0, blue: 0 }
      );
      // Part 1
      if (possible && (cubes.red > max.red || cubes.green > max.green || cubes.blue > max.blue)) {
        possible = false;
      }
      // Part 2
      minCubes = {
        red: minCubes.red > cubes.red ? minCubes.red : cubes.red,
        green: minCubes.green > cubes.green ? minCubes.green : cubes.green,
        blue: minCubes.blue > cubes.blue ? minCubes.blue : cubes.blue,
      };
    }
    if (possible) {
      part1 += +id.split(" ")[1];
      possible = true;
    }
    part2 += minCubes.red * minCubes.green * minCubes.blue;
  }
  console.log(part1);
  console.log(part2);
});
