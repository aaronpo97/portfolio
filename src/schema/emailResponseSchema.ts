import { z } from 'zod';

const emailResponseSchema = z.object({
  message: z.string(),
  status: z.number(),
  success: z.boolean(),
});

export default emailResponseSchema;
