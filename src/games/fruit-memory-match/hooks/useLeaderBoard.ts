import useSWRInfinite from 'swr/infinite';
import { z } from 'zod';

const leaderboardEntry = z.array(
  z.object({
    id: z.string().cuid(),
    turns: z.number(),
    name: z.string(),
    date: z.coerce.date(),
  }),
);

const useLeaderboard = () => {
  const pageSize = 10;
  const { data, error, isLoading, mutate, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/games/fruit-memory-match/leaderboard?page_num=${
        index + 1
      }&page_size=${pageSize}`,
    async (url) => {
      const response = await fetch(url);
      const json = await response.json();

      const parsedPayload = z
        .object({
          message: z.string(),
          payload: z.object({
            leaderboardEntry,
          }),
          success: z.boolean(),
          statusCode: z.number(),
        })
        .safeParse(json);

      if (!parsedPayload.success) {
        throw new Error('Invalid response');
      }

      return parsedPayload.data.payload.leaderboardEntry;
    },
  );

  return {
    leaderboard: data?.flatMap((d) => d)!,
    error,
    isLoading,
    mutate,
    size,
    setSize,
  };
};

export default useLeaderboard;
