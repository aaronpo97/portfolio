// EmailController.ts
import { NextApiRequest, NextApiResponse } from 'next';

import SendEmailRequestBodySchema from '@/schema/SendEmailRequestBodySchema';
import validateRequest from '@/middleware/validateRequest';
import validateCaptcha from '@/middleware/validateCaptcha';
import { createRouter } from 'next-connect';

import EmailRepository from '@/server/repository/email.repository';
import EmailService from '@/server/services/email.service';

const emailService = new EmailService(new EmailRepository());

const postEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, message, name, subject } = req.body;

  try {
    const response = await emailService.sendEmails({ email, message, name, subject });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      status: 500,
      success: false,
    });
  }
};

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
  validateRequest({ bodySchema: SendEmailRequestBodySchema }),
  validateCaptcha,
  postEmail,
);

const handler = router.handler({
  onError(err, req, res) {
    res.status(500).json({
      message: 'Internal server error',
      status: 500,
      success: false,
    });
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
