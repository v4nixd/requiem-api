import { z } from "zod";

export const syncUserSchema = z.object({
  discordId: z.string(),
  username: z.string().nullable(),
  globalName: z.string().nullable(),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),
});

export const userSchema = z.object({
  id: z.number(),
  discordId: z.string(),

  username: z.string().nullable(),
  globalName: z.string().nullable(),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SyncUserDto = z.infer<typeof syncUserSchema>;
