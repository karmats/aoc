const { fileToPuzzle } = require("./util");

const WAKE_UP = "wakes up";
const FALL_ASLEEP = "falls asleep";
const objToDate = obj => {
  return new Date(`${obj.date}T${obj.time}`);
};
const toMinutes = date => {
  return date / 1000 / 60;
};
fileToPuzzle("./day4-puzzle.txt", puzzle => {
  const log = puzzle
    .map(p => {
      const parsed = /\[(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2})]\s(...*)/.exec(p);
      return {
        date: parsed[1],
        time: parsed[2],
        event: parsed[3]
      };
    })
    .sort((a, b) => {
      return objToDate(a).getTime() - objToDate(b).getTime();
    });

  const guardLogs = {};
  let currentGuard;
  let currentTimestamp;
  let isSleeping = false;
  for (let i = 0; i < log.length; i++) {
    const logEntry = log[i];
    const timestamp = objToDate(logEntry);
    const guardId = /#(\d*)/.exec(logEntry.event);
    if (guardId) {
      currentGuard = guardId[1];
      if (!guardLogs[currentGuard]) {
        guardLogs[currentGuard] = [];
      }
      currentTimestamp = timestamp;
      isSleeping = false;
    } else if (logEntry.event === FALL_ASLEEP) {
      currentTimestamp = timestamp;
      isSleeping = true;
    } else if (logEntry.event === WAKE_UP) {
      if (isSleeping) {
        guardLogs[currentGuard].push({
          minutes: toMinutes(timestamp.getTime() - currentTimestamp.getTime()),
          from: currentTimestamp.getTime(),
          to: timestamp.getTime()
        });
        currentTimestamp = timestamp;
        isSleeping = false;
      } else {
        console.log("something strange..");
      }
    }
  }

  const mostSleepingGuardId = Object.keys(guardLogs)
    .map(l => ({
      id: l,
      total: guardLogs[l].reduce((acc, c) => acc + c.minutes, 0)
    }))
    .reduce(
      (acc, c) => {
        if (c.total > acc.total) {
          return c;
        }
        return acc;
      },
      { id: "-1", total: 0 }
    ).id;

  const logsToMinute = log => {
    const fromMinute = new Date(log.from).getMinutes();
    const toMinutes = new Date(log.to).getMinutes();
    const mins = [];
    for (let i = fromMinute; i < toMinutes; i++) {
      mins.push(i);
    }
    return mins;
  };
  const sleepCount = (acc, c) => {
    c.forEach(x => {
      acc[x] = acc[x] ? acc[x] + 1 : 1;
    });
    return acc;
  };

  // Part 1
  const mostSleepingGuardLogs = guardLogs[mostSleepingGuardId];
  const mostSleepingGuardMinuteLogs = mostSleepingGuardLogs.map(logsToMinute);
  const mostSleepingGuardMinuteSleepCount = mostSleepingGuardMinuteLogs.reduce(
    sleepCount,
    {}
  );
  const mostSleepingGuardMinuteWithMostSleep = Object.keys(
    mostSleepingGuardMinuteSleepCount
  ).reduce(
    (acc, c) => {
      if (mostSleepingGuardMinuteSleepCount[c] > acc.count) {
        return { minute: c, count: mostSleepingGuardMinuteSleepCount[c] };
      }
      return acc;
    },
    { minute: -1, count: 0 }
  );
  console.log(
    parseInt(mostSleepingGuardMinuteWithMostSleep.minute) *
      parseInt(mostSleepingGuardId)
  );

  // Part 2

  let mostFrequentlySleepGuard = { id: "-1", minute: "-1", count: 0 };
  Object.keys(guardLogs).forEach(guardId => {
    const guardMinuteLogs = guardLogs[guardId].map(logsToMinute);
    const guardMinuteSleepcount = guardMinuteLogs.reduce(sleepCount, {});
    const guardMinuteWithMostSleep = Object.keys(guardMinuteSleepcount).reduce(
      (acc, c) => {
        if (guardMinuteSleepcount[c] > acc.count) {
          return { id: guardId, minute: c, count: guardMinuteSleepcount[c] };
        }
        return acc;
      },
      { minute: -1, count: 0, id: -1 }
    );
    if (guardMinuteWithMostSleep.count > mostFrequentlySleepGuard.count) {
      mostFrequentlySleepGuard = guardMinuteWithMostSleep;
    }
  });
  console.log(
    parseInt(mostFrequentlySleepGuard.minute) *
      parseInt(mostFrequentlySleepGuard.id)
  );
});
