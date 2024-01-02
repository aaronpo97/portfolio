import { NextApiHandler } from 'next';
import { z } from 'zod';
import ServerError from '@/ServerError';
import emailDataSchema from '@/schema/emailDataSchema';
import emailResponseSchema from '@/schema/emailResponseSchema';

const token = process.env.SPARKPOST_API_KEY;
const sender = process.env.HOST_EMAIL_ADDRESS;
const recipient = process.env.MY_EMAIL_ADDRESS;

if (!(recipient && token && sender)) {
  throw new Error('recipient and token required');
}

type EmailParams = {
  address: string;
  text: string;
  html: string;
  subject: string;
};

const sendEmail = async ({ text, html, subject }: EmailParams) => {
  const from = sender;

  const data = {
    recipients: [{ address: recipient }],
    content: { from, subject, text, html },
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
    throw new Error(`Sparkpost API returned status code ${response.status}`);
  }
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

    await sendEmail({
      address: recipient,
      text: `${message}\n\n${name}\n${email}`,
      html: `<p>${message}</p><p>${name}</p><p>${email}</p>`,
      subject: `Contact form submission: ${subject}`,
    });

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
