import { z } from 'zod';

export const projectMetadataSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  metaDesc: z.string(),
  githubURL: z.string().url(),
  liveURL: z.string().url(),
  stack: z.string(),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;

export interface ProjectInfo extends ProjectMetadata {
  slug: string;
}
