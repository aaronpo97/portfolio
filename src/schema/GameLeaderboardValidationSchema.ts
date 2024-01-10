import { z } from 'zod';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const GameLeaderboardValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(20, "Name can't be longer than 20 characters.")
    .refine((value) => !matcher.hasMatch(value), {
      message: 'Name cannot contain inappropriate language.',
    }),
  turns: z.number().min(8, "Turns can't be less than 8"),
});

export default GameLeaderboardValidationSchema;
