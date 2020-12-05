const { fileToPuzzle } = require("./util");

const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const HEIGHT_REGEX = /^(\d*)(in|cm)$/;
const HEX_COLOR_REGEX = /^#[0-9a-zA-Z]{6}$/;
const PID_REGEX = /^\d{9}$/;
const VALID_EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const toPassports = (puzzle) =>
  puzzle
    .reduce(
      (acc, p, idx) => {
        if (!p || idx === puzzle.length - 1) {
          return {
            passports: acc.passports.concat(idx === puzzle.length - 1 ? p + " " + acc.curr : acc.curr),
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
    )
    .passports.map((p) => p.trim());

const validateNoMissingFields = (passport) =>
  REQUIRED_FIELDS.filter((f) => !passport.split(" ").find((pf) => pf.split(":")[0] === f)).length === 0;

const validateFields = (passport) => {
  const fields = passport.split(" ").map((p) => p.split(":"));
  for (let i = 0; i < fields.length; i++) {
    const [key, value] = fields[i].map((f) => f.trim());
    switch (key) {
      case "byr":
        if (+value < 1920 || +value > 2002) {
          return false;
        }
        break;
      case "iyr":
        if (+value < 2010 || +value > 2020) {
          return false;
        }
        break;
      case "eyr":
        if (+value < 2020 || +value > 2030) {
          return false;
        }
        break;
      case "hgt":
        if (!HEIGHT_REGEX.test(value)) {
          return false;
        }
        const height = HEIGHT_REGEX.exec(value);
        const length = +height[1];
        const unit = height[2];
        if (unit === "cm" && (length > 193 || length < 150)) {
          return false;
        } else if (unit === "in" && (length > 76 || length < 59)) {
          return false;
        }
        break;
      case "hcl":
        if (!HEX_COLOR_REGEX.test(value)) {
          return false;
        }
        break;
      case "ecl":
        if (!VALID_EYE_COLORS.includes(value)) {
          return false;
        }
        break;
      case "pid":
        if (!PID_REGEX.test(value)) {
          return false;
        }
        break;
      case "cid":
        break;
      default:
        throw new Error(`WTF is ${key}??`);
    }
  }
  return true;
};

fileToPuzzle(
  "day4-puzzle.txt",
  (puzzle) => {
    const passports = toPassports(puzzle);

    // Part 1
    const noMissingFieldsPassports = passports.filter(validateNoMissingFields);
    console.log(noMissingFieldsPassports.length);

    // Part 2
    console.log(noMissingFieldsPassports.filter(validateFields).length);
  },
  {
    separator: "\n",
  }
);
