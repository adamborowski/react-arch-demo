import z from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  owner: z.string(),
  numStars: z.number(),
  numForks: z.number(),
  linkUrl: z.string(),
  description: z.string().nullable(),
});

export type Repository = z.infer<typeof repositorySchema>;
