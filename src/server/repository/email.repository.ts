/* eslint-disable class-methods-use-this */
// EmailRepository.ts
import { render } from '@react-email/render';
import FormSubmissionEmail from '@/emails/FormSubmissionEmail';
import FormSubmissionReceipt from '@/emails/FormSubmissionReceipt';
import { ReactElement } from 'react';
import SendEmailRequestBodySchema from '@/schema/SendEmailRequestBodySchema';
import { NextApiRequest } from 'next';
import { z } from 'zod';

const token = process.env.SPARKPOST_API_KEY;
const sender = process.env.HOST_EMAIL_ADDRESS;
const recipient = process.env.MY_EMAIL_ADDRESS;

if (!(recipient && token && sender)) {
  throw new Error('recipient and token required');
}

interface IEmailRequest extends NextApiRequest {
  body: z.infer<typeof SendEmailRequestBodySchema>;
}

export default class EmailRepository {
  endpoint: string;

  token: string;

  headers: Headers;

  constructor(endpoint = 'https://api.sparkpost.com/api/v1/transmissions') {
    if (!process.env.SPARKPOST_API_KEY) {
      throw new Error('Token required for email transmission');
    }

    this.endpoint = endpoint;
    this.token = process.env.SPARKPOST_API_KEY;

    this.headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.token,
    });
  }

  async sendEmailToMe({ name, email, message, subject }: IEmailRequest['body']) {
    const component = FormSubmissionEmail({
      name,
      message,
      subject,
      email,
    }) as ReactElement<unknown, string>;

    const html = render(component);
    const text = render(component, { plainText: true });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        recipients: [{ address: recipient }],
        content: {
          html,
          text,
          from: sender,
          subject: `New Form Submission from ${name}`,
        },
      }),
    });

    return response;
  }

  async sendEmailToSender({ email, name }: IEmailRequest['body']) {
    const component = FormSubmissionReceipt({
      email,
      name,
    }) as ReactElement<unknown, string>;

    const html = render(component);
    const text = render(component, { plainText: true });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        recipients: [{ address: email }],
        content: {
          html,
          text,
          from: sender,
          subject: 'Thank you for your message!',
        },
      }),
    });

    return response;
  }
}
