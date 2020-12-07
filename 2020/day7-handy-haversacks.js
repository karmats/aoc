const { fileToPuzzle } = require("./util");

const BAG_NAME = "shiny gold";
const BAG_REGEX = /^(.*)\sbags\scontain\s(.*)/;
const CONTAIN_REGEX = /(\d)\s(.*)bags?\.?/;

const toRules = (puzzle) =>
  puzzle.reduce((bags, p) => {
    const bag = BAG_REGEX.exec(p);
    return {
      ...bags,
      [bag[1]]: bag[2].split(",").map((rest) => {
        const contains = CONTAIN_REGEX.exec(rest);
        return contains ? [+contains[1], contains[2].trim()] : [];
      }),
    };
  }, {});

fileToPuzzle("day7-puzzle.txt", (puzzle) => {
  const rules = toRules(puzzle);
  const bagNames = Object.keys(rules);

  // Part 1
  const totalBagsThatCarries = (name, total) => {
    for (let i = 0; i < bagNames.length; i++) {
      const bagName = bagNames[i];
      const bagRule = rules[bagName];
      if (bagRule.some((b) => name === b[1])) {
        total = totalBagsThatCarries(bagName, [...total, bagName]);
      }
    }
    return total;
  };

  const uniqueTotalBags = new Set(totalBagsThatCarries(BAG_NAME, []));
  console.log(uniqueTotalBags.size);

  // Part 2
  const countBags = (name) => {
    const rule = rules[name];
    return (
      1 +
      (rule.length === 1 && !rule[0].length ? [] : rule)
        .map(([amount, ruleName]) => amount * countBags(ruleName))
        .reduce((total, current) => total + current, 0)
    );
  };
  console.log(countBags(BAG_NAME) - 1);
});
