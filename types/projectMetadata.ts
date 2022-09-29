import { z } from 'zod';

export const projectMetadataSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  metaDesc: z.string(),
  githubURL: z.string().url(),
  liveURL: z.string().url(),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
