import { z } from 'zod';

const SendEmailRequestBodySchema = z.object({
  email: z.string().email('Please use a valid email address.'),
  name: z.string().min(1, 'Please provide your name.'),
  subject: z.string().min(1, 'An email subject is required.'),
  message: z.string().min(1, 'Please provide a message.'),
});

export default SendEmailRequestBodySchema;
