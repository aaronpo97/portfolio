import ServerError from '@/ServerError';
import LeaderboardController from '@/controllers/games/fruit-memory-match/leaderboard.controller';
import validateCaptcha from '@/middleware/validateCaptcha';
import validateRequest from '@/middleware/validateRequest';
import GameLeaderboardValidationSchema from '@/schema/GameLeaderboardValidationSchema';
import LeaderboardService from '@/services/games/fruit-memory/match/leaderboard.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import DBClient from 'prisma/DBClient';
import { z } from 'zod';

const router = createRouter<NextApiRequest, NextApiResponse>();

const service = new LeaderboardService(DBClient);
const controller = new LeaderboardController(service);

router.get(
  validateRequest({
    querySchema: z.object({ page_num: z.coerce.number(), page_size: z.coerce.number() }),
  }),
  // @ts-ignore
  (req, res) => controller.getLeaderboard(req, res),
);

router.post(
  validateRequest({ bodySchema: GameLeaderboardValidationSchema }),
  validateCaptcha,
  (req, res) => controller.postNewScore(req, res),
);

const handler = router.handler({
  onNoMatch(req, res) {
    res.status(405).json({ message: 'Method not allowed' });
  },
  onError(err, req, res) {
    if (err instanceof ServerError) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
});

export default handler;
