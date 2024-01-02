import { z } from 'zod';

const emailDataSchema = z.object({
  email: z.string().email(),
  subject: z.string(),
  name: z.string(),
  message: z.string(),
});

export default emailDataSchema;
