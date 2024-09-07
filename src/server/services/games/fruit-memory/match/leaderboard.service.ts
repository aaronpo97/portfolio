import GameLeaderboardValidationSchema from '@/schema/GameLeaderboardValidationSchema';
import DBClient from 'prisma/DBClient';
import { z } from 'zod';

type GetRequestQuery = {
  PAGE_NUM: number;
  PAGE_SIZE: number;
};

type PostRequestBody = z.infer<typeof GameLeaderboardValidationSchema>;

export default class LeaderboardService {
  constructor(public client: typeof DBClient) {
    this.client = client;
  }

  async getLeaderboard({ PAGE_NUM, PAGE_SIZE }: GetRequestQuery) {
    return this.client.instance.gameLeaderboardEntry.findMany({
      orderBy: { turns: 'asc' },
      take: PAGE_SIZE,
      skip: (PAGE_NUM - 1) * PAGE_SIZE,
    });
  }

  async getLeaderboardCount() {
    return this.client.instance.gameLeaderboardEntry.count();
  }

  async postNewScore({ name, turns }: PostRequestBody) {
    return this.client.instance.gameLeaderboardEntry.create({
      data: { name, turns },
    });
  }
}
