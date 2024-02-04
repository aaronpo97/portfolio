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

const TRANSMISSIONS_ENDPOINT = 'https://api.sparkpost.com/api/v1/transmissions';

const sendEmailToMe = ({ name, email, message, subject }: IEmailRequest['body']) => {
  return fetch(TRANSMISSIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      recipients: [{ address: recipient }],
      content: {
        from: sender,
        subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>${message}</p>`,
      },
    }),
  });
};

const sendEmailToSender = ({ email }: IEmailRequest['body']) => {
  return fetch(TRANSMISSIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      recipients: [{ address: email }],
      content: {
        from: sender,
        subject: 'Thank you for your message',
        text: 'Thank you for your message. I will get back to you as soon as possible.',
        html: '<p>Thank you for your message. I will get back to you as soon as possible.</p>',
      },
    }),
  });
};

const postEmail = async (req: IEmailRequest, res: NextApiResponse) => {
  const { email, message, name, subject } = req.body;

  const [emailToMeResponse, emailToSenderResponse] = await Promise.all([
    sendEmailToMe({ email, message, name, subject }),
    sendEmailToSender({ email, message, name, subject }),
  ]);

  if (!emailToMeResponse.ok || !emailToSenderResponse.ok) {
    throw new ServerError(
      'Something went wrong and your email was not sent. Sorry for the inconvenience',
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
  validateRequest({ bodySchema: SendEmailRequestBodySchema }),
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
