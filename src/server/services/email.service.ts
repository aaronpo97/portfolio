// EmailService.ts
import SendEmailRequestBodySchema from '@/schema/SendEmailRequestBodySchema';
import EmailRepository from '@/server/respository/email.repository';
import { NextApiRequest } from 'next';
import { z } from 'zod';

interface IEmailRequest extends NextApiRequest {
  body: z.infer<typeof SendEmailRequestBodySchema>;
}

export default class EmailService {
  constructor(private emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  async sendEmails(args: IEmailRequest['body']) {
    const [emailToMeResponse, emailToSenderResponse] = await Promise.all([
      this.emailRepository.sendEmailToMe(args),
      this.emailRepository.sendEmailToSender(args),
    ]);

    if (!emailToMeResponse.ok || !emailToSenderResponse.ok) {
      throw new Error(
        'Something went wrong and your email was not sent. Sorry for the inconvenience',
      );
    }

    return {
      message: 'Email successfully sent',
      status: 200,
      success: true,
    };
  }
}
