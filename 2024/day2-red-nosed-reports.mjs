import { fileToPuzzle } from "./util.mjs";

const isSafe = (report) => {
  let decreasing = false;
  for (let i = 0; i < report.length - 1; i++) {
    const level = report[i];
    const nextLevel = report[i + 1];
    if (i === 0) {
      decreasing = level > nextLevel;
    } else {
      const isDecreasing = level > nextLevel;
      if (isDecreasing !== decreasing) {
        return false;
      }
    }
    const diff = Math.abs(level - nextLevel);
    if (diff > 3 || diff === 0) {
      return false;
    }
  }
  return true;
};

fileToPuzzle("day2-puzzle.txt", (puzzle) => {
  const reports = puzzle.map((r) => r.split(" ").map(Number));

  // Part 1
  const unsafeReports = reports.filter((r) => !isSafe(r));
  const safeReportsAmount = reports.length - unsafeReports.length;
  console.log(safeReportsAmount);

  // Part 2
  let safeWithMissingAmount = 0;
  for (let i = 0; i < unsafeReports.length; i++) {
    const unsafeReport = unsafeReports[i];
    for (let j = 0; j < unsafeReport.length; j++) {
      if (isSafe(unsafeReport.filter((_, idx) => idx !== j))) {
        safeWithMissingAmount++;
        break;
      }
    }
  }
  console.log(safeReportsAmount + safeWithMissingAmount);
});
