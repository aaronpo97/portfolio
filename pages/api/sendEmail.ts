import { NextApiHandler } from 'next';

import { z } from 'zod';
import SparkPost from 'sparkpost';
import ServerError from '../../ServerError';
import emailDataSchema from '../../types/emailDataSchema';
import emailResponseSchema from '../../types/emailResponseSchema';

const token = process.env.SPARKPOST_API_KEY;
const sender = process.env.HOST_EMAIL_ADDRESS;
const recipient = process.env.MY_EMAIL_ADDRESS;

if (!(recipient && token && sender)) {
  throw new Error('recipient and token required');
}

const client = new SparkPost(token);

const sendEmail = async (emailParams: z.infer<typeof emailDataSchema>) => {
  await client.transmissions.send({
    content: {
      from: sender,
      subject: emailParams.subject,
      text: emailParams.message,
    },
    recipients: [{ address: recipient }],
  });

  await client.transmissions.send({
    content: {
      from: sender,
      subject: 'Email successfully sent.',
    },
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('ALLOW', 'POST');
      throw new ServerError('Invalid request method.', 405);
    }

    const parsed = emailDataSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ServerError(
        'Your email address, name, an email subject, and message are all required.',
        400,
      );
    }

    const { email, message, name, subject } = parsed.data;

    await sendEmail({ email, message, name, subject });

    const successResponse: z.infer<typeof emailResponseSchema> = {
      message: 'Email successfully sent',
      status: 200,
      success: true,
    };
    res.json(successResponse);
  } catch (error) {
    const errorResponse: z.infer<typeof emailResponseSchema> = {
      message: error instanceof Error ? error.message : 'Something went wrong.',
      status: error instanceof ServerError ? error.status : 500,
      success: false,
    };
    res.json(errorResponse);
  }
};

export default handler;
