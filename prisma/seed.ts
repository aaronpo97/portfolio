import DBClient from './DBClient';
import leaderboard from './leaderboard.json';

const promises: Promise<unknown>[] = [];
leaderboard.forEach((entry) => {
  promises.push(
    DBClient.instance.gameLeaderboardEntry.create({
      data: {
        date: new Date(entry.date),
        name: entry.name,
        turns: entry.turns,
      },
    }),
  );
});

Promise.all(promises)
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
