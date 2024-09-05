import useSWRInfinite from 'swr/infinite';
import { z } from 'zod';

const useLeaderboard = () => {
  const pageSize = 10;

  const fetcher = async <Url extends string>(url: Url) => {
    const response = await fetch(url);
    const count = response.headers.get('X-Total-Count') || '0';
    const json = await response.json();

    const parsedPayload = z
      .object({
        message: z.string(),
        payload: z.object({
          leaderboardEntries: z.array(
            z.object({
              id: z.string().cuid(),
              turns: z.number(),
              name: z.string(),
              date: z.coerce.date(),
            }),
          ),
        }),
        success: z.boolean(),
        statusCode: z.number(),
      })
      .safeParse(json);

    if (!parsedPayload.success) {
      throw new Error(parsedPayload.error.message);
    }
    const pageCount = Math.ceil(parseInt(count, 10) / pageSize);

    const { leaderboardEntries } = parsedPayload.data.payload;
    return { leaderboardEntries, pageCount };
  };

  const { data, error, isLoading, mutate, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/games/fruit-memory-match/leaderboard?page_num=${
        index + 1
      }&page_size=${pageSize}`,
    fetcher,
  );

  const isLoadingMore = !!(size > 0 && data && typeof data[size - 1] === 'undefined');
  const isAtEnd = !(size - 1 < data?.[0].pageCount!);

  const pageCount = data?.[0].pageCount!;

  return {
    leaderboard: data?.flatMap((d) => d.leaderboardEntries)!,
    pageCount,
    error,
    isLoading,
    mutate,
    size,
    setSize,
    isLoadingMore,
    isAtEnd,
  };
};

export default useLeaderboard;
