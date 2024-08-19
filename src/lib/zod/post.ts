import { z } from "zod";

export const postEssentialsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  intro: z.string().min(1).or(z.literal("")),
  thumbnail: z.string().nullable(),
  tags: z.array(z.string()).optional().default([]),
  category: z.object({
    name: z.string().min(1),
    id: z.coerce.number().positive().min(1),
  }),
});

export const postSchema = z
  .object({
    authorId: z.string().min(1),
    date: z.string().min(1),
    published: z.boolean(),
  })
  .merge(postEssentialsSchema);
