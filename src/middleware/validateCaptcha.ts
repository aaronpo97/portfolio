import ServerError from '@/ServerError';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { z } from 'zod';

const GoogleCaptchaResponseSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.coerce.date(),
  hostname: z.string(),
  'error-codes': z.array(z.string()).optional(),
});

const validateCaptcha = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const captchaToken = req.headers['x-captcha-token'];

  if (!captchaToken) {
    throw new ServerError('Captcha token missing', 400);
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  );

  const json = await response.json();

  const parsed = GoogleCaptchaResponseSchema.safeParse(json);

  if (!parsed.success || parsed.data.success !== true) {
    throw new ServerError('Captcha verification failed', 400);
  }

  await next();
};

export default validateCaptcha;
