import ServerError from '@/ServerError';
import validateCaptcha from '@/middleware/validateCaptcha';
import validateRequest from '@/middleware/validateRequest';
import GameLeaderboardValidationSchema from '@/schema/GameLeaderboardValidationSchema';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => {
  throw err;
});
const router = createRouter<NextApiRequest, NextApiResponse>();

interface ILeaderboardRequest extends NextApiRequest {
  body: { name: string; turns: number };
}

const postNewScore = async (req: ILeaderboardRequest, res: NextApiResponse) => {
  const { name, turns } = req.body;
  const id = crypto.randomUUID();
  await client.connect();
  await client.set(id, JSON.stringify({ id, turns, name, date: new Date() }));
  await client.disconnect();
  const data = { name, turns };

  res.status(200).json(data);
};

const getLeaderboard = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();
  const keys = await client.keys('*');
  const data = await Promise.all(
    keys.map(async (key) => {
      const value = await client.get(key);
      return JSON.parse(value!);
    }),
  );
  await client.disconnect();
  const sortedData = data.sort((a, b) => a.turns - b.turns);

  res.status(200).json(sortedData);
};

router.get(getLeaderboard);
router.post(
  validateRequest({ bodySchema: GameLeaderboardValidationSchema }),
  validateCaptcha,
  postNewScore,
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
