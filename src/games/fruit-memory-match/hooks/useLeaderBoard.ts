import useSWR from 'swr';
import { z } from 'zod';

const leaderboardEntry = z.array(
  z.object({
    id: z.string().uuid(),
    turns: z.number(),
    name: z.string(),
    date: z.coerce.date(),
  }),
);

const useLeaderboard = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/games/fruit-memory-match/leaderboard',
    async (url) => {
      const response = await fetch(url);
      const json = await response.json();

      const parsed = leaderboardEntry.safeParse(json);

      if (!parsed.success) {
        throw new Error('Invalid response');
      }

      return parsed.data;
    },
  );

  return { leaderboard: data, error, isLoading, mutate };
};

export default useLeaderboard;
