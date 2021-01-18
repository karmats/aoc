const { fileToPuzzle } = require("./util");

const SYSTEM_ID_CHECKSUM_REGEX = /(\d*)\[(.*)\]/;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const toModel = (room) => {
  const splitted = room.split("-");
  const [, id, checksum] = SYSTEM_ID_CHECKSUM_REGEX.exec(splitted.pop());
  return {
    name: splitted,
    id: id,
    checksum: checksum,
  };
};

const toCharCount = (encryptedRoom) =>
  encryptedRoom.split("").reduce((chars, char) => {
    return {
      ...chars,
      [char]: !chars[char] ? 1 : chars[char] + 1,
    };
  }, {});

const toChecksum = (room) => {
  const charCount = toCharCount(room);
  return Object.keys(charCount)
    .sort((a, b) => {
      if (charCount[a] - charCount[b] === 0) {
        return a.localeCompare(b);
      }
      return charCount[b] - charCount[a];
    })
    .join("");
};

const isValid = (room) => {
  const roomChecksum = toChecksum(room.name.join(""));
  if (roomChecksum.indexOf(room.checksum) >= 0) {
    return true;
  }
  return false;
};

const toRoomName = (room) => {
  const decryptedRoom = room.name
    .map((part) => {
      const newChars = part.split("").map((p) => {
        const newCharIdx = ALPHABET.indexOf(p);
        return ALPHABET[Math.floor(+room.id + newCharIdx) % ALPHABET.length];
      });
      return newChars.join("");
    })
    .join(" ");
  return {
    name: decryptedRoom,
    id: room.id,
  };
};

fileToPuzzle("day4-puzzle.txt", (puzzle) => {
  const validRooms = puzzle.map(toModel).filter(isValid);

  // Part 1
  console.log(validRooms.reduce((sum, room) => sum + Number(room.id), 0));

  // Part 2
  console.log(
    validRooms
      .map(toRoomName)
      .filter((decrypted) => decrypted.name.indexOf("northpole") >= 0)
      .pop().id
  );
});
