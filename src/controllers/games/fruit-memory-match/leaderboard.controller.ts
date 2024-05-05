import LeaderboardService from '@/services/games/fruit-memory/match/leaderboard.service';
import { NextApiRequest, NextApiResponse } from 'next';

interface LeaderboardGetRequest extends NextApiRequest {
  query: { page_num: string; page_size: string };
}

interface LeaderboardPostRequest extends NextApiRequest {
  body: { name: string; turns: number };
}

export default class LeaderboardController {
  constructor(public service: LeaderboardService) {
    this.service = service;
  }

  async getLeaderboard(req: LeaderboardGetRequest, res: NextApiResponse) {
    const PAGE_NUM = parseInt(req.query.page_num as string, 10);
    const PAGE_SIZE = parseInt(req.query.page_size as string, 10);

    const leaderboardEntry = await this.service.getLeaderboard({ PAGE_NUM, PAGE_SIZE });

    return res.status(200).json(leaderboardEntry);
  }

  async postNewScore(req: LeaderboardPostRequest, res: NextApiResponse) {
    const { body } = req;
    const newEntry = this.service.postNewScore(body);

    return res.status(200).json(newEntry);
  }
}
