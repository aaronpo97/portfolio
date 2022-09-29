import { z } from 'zod';

export const pageMetadataSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  metaDesc: z.string(),
  socialImage: z.string(),
  date: z.string(),
});

export type PageMetadata = z.infer<typeof pageMetadataSchema>;
