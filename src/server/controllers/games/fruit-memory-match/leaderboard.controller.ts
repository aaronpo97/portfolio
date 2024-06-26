import LeaderboardService from '@/server/services/games/fruit-memory/match/leaderboard.service';
import SuccessResponseBuilder from '@/util/api/response-handling/builders/SuccessResponseBuilder';
import { NextApiRequest, NextApiResponse } from 'next';

interface LeaderboardPostRequest extends NextApiRequest {
  body: { name: string; turns: number };
}

export default class LeaderboardController {
  constructor(public service: LeaderboardService) {
    this.service = service;
  }

  async getLeaderboard(req: NextApiRequest, res: NextApiResponse) {
    const PAGE_NUM = parseInt(req.query.page_num as string, 10);
    const PAGE_SIZE = parseInt(req.query.page_size as string, 10);

    const leaderboardEntry = await this.service.getLeaderboard({ PAGE_NUM, PAGE_SIZE });

    const responseBody = new SuccessResponseBuilder()
      .setMessage('Leaderboard fetched successfully')
      .setPayload({ leaderboardEntry })
      .setStatusCode(200)
      .create();

    return res.status(200).json(responseBody);
  }

  async postNewScore(req: LeaderboardPostRequest, res: NextApiResponse) {
    const { body } = req;
    const newEntry = this.service.postNewScore(body);

    const responseBody = new SuccessResponseBuilder()
      .setMessage('New score added successfully')
      .setPayload({ newEntry })
      .setStatusCode(201)
      .create();

    return res.status(201).json(responseBody);
  }
}
