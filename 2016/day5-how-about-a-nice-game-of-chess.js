const crypto = require("crypto");

const PUZZLE = "ugkcyxxp";

const hackPassword = (id) => {
  let password1 = "";
  let password2 = "        ";
  for (let i = 0; password1.length !== 8 || password2.indexOf(" ") >= 0; i++) {
    const hash = crypto
      .createHash("md5")
      .update(id + i)
      .digest("hex");
    if (hash.startsWith("00000")) {
      if (password1.length < 8) {
        password1 = password1 + hash[5];
      }
      const pos = +hash[5];
      if (pos < 8 && password2[pos] === " ") {
        password2 = password2.slice(0, pos) + hash[6] + password2.slice(pos + 1);
      }
    }
  }
  return {
    password1,
    password2,
  };
};

const hacked = hackPassword(PUZZLE);

// Part 1
console.log(hacked.password1);

// Part 2
console.log(hacked.password2);
