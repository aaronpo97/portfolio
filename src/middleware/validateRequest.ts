import ServerError from '@/ServerError';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { z } from 'zod';

interface ValidateRequestArgs {
  bodySchema?: z.ZodSchema<any>;
  querySchema?: z.ZodSchema<any>;
}

/**
 * Middleware to validate the request body and/or query against a zod schema.
 *
 * @param args
 * @param args.bodySchema The body schema to validate against.
 * @param args.querySchema The query schema to validate against.
 * @throws ServerError with status code 400 if the request body or query is invalid.
 */
const validateRequest = ({ bodySchema, querySchema }: ValidateRequestArgs) => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (bodySchema) {
      const parsed = bodySchema.safeParse(JSON.parse(JSON.stringify(req.body)));
      if (!parsed.success) {
        throw new ServerError('Invalid request body.', 400);
      }
      req.body = parsed.data;
    }

    if (querySchema) {
      const parsed = querySchema.safeParse(req.query);
      if (!parsed.success) {
        throw new ServerError('Invalid request query.', 400);
      }
      req.query = parsed.data;
    }
    return next();
  };
};

export default validateRequest;
