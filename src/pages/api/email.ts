import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import ServerError from '@/ServerError';

import emailResponseSchema from '@/schema/emailResponseSchema';
import validateRequest from '@/middleware/validateRequest';
import { createRouter } from 'next-connect';
import SendEmailRequestBodySchema from '@/schema/SendEmailRequestBodySchema';
import validateCaptcha from '@/middleware/validateCaptcha';

const token = process.env.SPARKPOST_API_KEY;
const sender = process.env.HOST_EMAIL_ADDRESS;
const recipient = process.env.MY_EMAIL_ADDRESS;

if (!(recipient && token && sender)) {
  throw new Error('recipient and token required');
}

interface IEmailRequest extends NextApiRequest {
  body: z.infer<typeof SendEmailRequestBodySchema>;
}

const router = createRouter<NextApiRequest, NextApiResponse>();

const postEmail = async (req: IEmailRequest, res: NextApiResponse) => {
  const { email, message, name, subject } = req.body;

  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  const html = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`;

  const data = {
    recipients: [{ address: recipient }],
    content: { from: sender, subject, text, html },
  };

  const transmissionsEndpoint = 'https://api.sparkpost.com/api/v1/transmissions';

  const response = await fetch(transmissionsEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new ServerError(
      `Error sending email: ${response.status} ${response.statusText}`,
      500,
    );
  }

  const successResponse: z.infer<typeof emailResponseSchema> = {
    message: 'Email successfully sent',
    status: 200,
    success: true,
  };
  res.json(successResponse);
};

router.post(
  validateRequest({
    bodySchema: SendEmailRequestBodySchema,
  }),
  validateCaptcha,
  postEmail,
);

const handler = router.handler({
  onError(err, req, res) {
    if (err instanceof ServerError) {
      res.status(err.status).json({
        message: err.message,
        status: err.status,
        success: false,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        status: 500,
        success: false,
      });
    }
  },

  onNoMatch(req, res) {
    res.status(405).json({
      message: 'Method not allowed',
      status: 405,
      success: false,
    });
  },
});

export default handler;
