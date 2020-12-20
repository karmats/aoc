const { fileToPuzzle } = require("./util");

const getRules = (rules) => {
  let ruleRegex = new RegExp(/^(\d+): (.*)$/);
  let ruleHash = {};
  rules = rules.map((rule) => {
    let [string, index, conditions, ...rest] = ruleRegex.exec(rule) || [];
    let ruleObj = {
      index,
      ruleRegexString: null,
      conditionIndexes: [],
      altIndexes: [],
    };
    if (conditions.match(/"[a-z]"/)) {
      ruleObj.ruleRegexString = conditions.replace(/"/g, "");
    } else if (conditions.match(/\|/)) {
      let [left, right] = conditions.split("|").filter(Boolean);
      ruleObj.conditionIndexes = left.split(" ").filter(Boolean);
      ruleObj.altIndexes = right.split(" ").filter(Boolean);
    } else {
      ruleObj.conditionIndexes = conditions.split(" ").filter(Boolean);
    }
    ruleHash[index] = ruleObj;
    return ruleObj;
  });
  let assignedRule = true;
  while (assignedRule) {
    assignedRule = false;
    const getRule = (index, rule) => {
      let conditionRule = ruleHash[index];
      if (conditionRule.ruleRegexString) {
        return conditionRule.ruleRegexString;
      } else {
        return null;
      }
    };
    rules.forEach((rule) => {
      if (rule.ruleRegexString) {
        return;
      }
      let strings = rule.conditionIndexes.map((index) => getRule(index, rule)).filter(Boolean);
      let altStrings = rule.altIndexes.map((index) => getRule(index, rule)).filter(Boolean);
      if (strings.length === rule.conditionIndexes.length && altStrings.length === rule.altIndexes.length) {
        rule.ruleRegexString = "(" + strings.join("");
        if (altStrings.length) {
          rule.ruleRegexString = rule.ruleRegexString + "|" + altStrings.join("");
        }
        rule.ruleRegexString = rule.ruleRegexString + ")";
        assignedRule = true;
      }
    });
  }

  return ruleHash;
};

const countValid = (seq, regex) => {
  let valid = 0;
  seq.forEach((s) => {
    if (regex.test(s)) {
      valid++;
    }
  });
  return valid;
};

const countValidPart2 = (ruleHash, list) => {
  ruleHash[0].ruleRegexString = ruleHash[8].ruleRegexString + ruleHash[11].ruleRegexString;
  return list.reduce((carry, item) => {
    let regex = new RegExp("^" + ruleHash[0].ruleRegexString + "$");

    if (regex.test(item)) {
      return carry + 1;
    } else {
      let rule42 = new RegExp("^" + ruleHash[42].ruleRegexString);
      let rule31 = new RegExp(ruleHash[31].ruleRegexString + "$");
      let rule42Count = 0;
      let rule31Count = 0;

      while (rule42.test(item) || rule31.test(item)) {
        if (rule42.test(item)) {
          item = item.replace(rule42, "");
          rule42Count++;
        }
        if (rule31.test(item)) {
          item = item.replace(rule31, "");
          rule31Count++;
        }
      }
      if (!item && rule42Count && rule31Count && rule42Count >= rule31Count + 1) {
        return carry + 1;
      }
    }
    return carry;
  }, 0);
};

fileToPuzzle(
  "day19-puzzle.txt",
  (puzzle) => {
    const ruleList = puzzle[0].split("\n");
    const seq = puzzle[1].split("\n");

    // Part 1
    const rules = getRules(ruleList);
    const zeroRuleRegex = new RegExp(`^${rules["0"].ruleRegexString}$`);
    console.log(countValid(seq, zeroRuleRegex));

    // Part 2
    console.log(countValidPart2(rules, seq));
  },
  {
    separator: "\n\n",
  }
);
