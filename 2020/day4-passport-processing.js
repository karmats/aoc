const { fileToPuzzle } = require("./util");

const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const toPassports = (puzzle) =>
  puzzle.reduce(
    (acc, p, idx) => {
      if (!p || idx === puzzle.length - 1) {
        return {
          passports: acc.passports.concat(
            idx === puzzle.length - 1 ? p + " " + acc.curr : acc.curr
          ),
          curr: "",
        };
      }
      return {
        passports: acc.passports,
        curr: p + " " + acc.curr,
      };
    },
    {
      curr: "",
      passports: [],
    }
  ).passports;

const missingFields = (passport) =>
  REQUIRED_FIELDS.filter(
    (f) => !passport.split(" ").find((pf) => pf.split(":")[0] === f)
  );

fileToPuzzle(
  "day4-puzzle.txt",
  (puzzle) => {
    const passports = toPassports(puzzle);

    // Part 1
    console.log(
      passports.map((p) => missingFields(p)).filter((fields) => !fields.length)
        .length
    );
  },
  {
    separator: "\r\n",
  }
);
