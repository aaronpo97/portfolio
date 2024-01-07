import ServerError from '@/ServerError';
import { NextApiRequest, NextApiResponse } from 'next';

interface ILeaderboardRequest extends NextApiRequest {
  body: { name: string; turns: number };
}

export default async function handler(req: ILeaderboardRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new ServerError('Method not allowed', 405);
  }

  const { name, turns } = req.body;

  if (!name || !turns) {
    throw new ServerError('Name and score are required', 400);
  }

  const data = { name, turns };

  res.status(200).json(data);
}
