import { fileToPuzzle, swapItems } from "./util.mjs";

fileToPuzzle(
  "day5-puzzle.txt",
  (puzzle) => {
    const [rulesString, sequencesString] = puzzle;
    const rules = rulesString.split("\n").map((r) => r.split("|").map(Number));
    const sequences = sequencesString.split("\n").map((s) => s.split(",").map(Number));
    const isValidSequence = (sequence) => {
      for (let i = 0; i < sequence.length; i++) {
        const current = sequence[i];
        const rest = sequence.slice(i + 1);
        for (let j = 0; j < rest.length; j++) {
          const next = rest[j];
          if (rules.some((rule) => rule[1] === current && rule[0] === next)) {
            return false;
          }
        }
      }
      return true;
    };

    const fixSequence = (sequence) => {
      for (let i = 0; i < sequence.length; i++) {
        const current = sequence[i];
        const rest = sequence.slice(i + 1);
        for (let j = 0; j < rest.length; j++) {
          const next = rest[j];
          if (rules.some((rule) => rule[1] === current && rule[0] === next)) {
            return fixSequence(swapItems(sequence, i, i + j + 1));
          }
        }
      }
      return sequence;
    };

    // Part 1
    const validSequences = sequences.filter(isValidSequence);
    const middleNumberSum = validSequences.reduce((sum, seq) => sum + seq[Math.floor(seq.length / 2)], 0);
    console.log(middleNumberSum);

    // Part 2
    const notValidSequences = sequences.filter((s) => !isValidSequence(s));
    const fixedSequencesScore = notValidSequences.map(fixSequence).reduce((sum, seq) => sum + seq[Math.floor(seq.length / 2)], 0);
    console.log(fixedSequencesScore);
  },
  { separator: "\n\n" }
);
