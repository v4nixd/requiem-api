import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  discordId: z.string(),

  username: z.string().nullable(),
  globalName: z.string().nullable(),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const syncUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const usersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type SyncUserDto = z.infer<typeof syncUserSchema>;
export type userDto = z.infer<typeof userSchema>;
