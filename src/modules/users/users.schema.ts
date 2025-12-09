import { z } from "zod";

export const syncUserSchema = z.object({
  discordId: z.string(),
  username: z.string().nullable(),
  globalName: z.string().nullable(),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),
});

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

export const usersQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => Number(v ?? 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => Number(v ?? 20))
    .pipe(z.number().int().min(1).max(100)),
});

export type SyncUserDto = z.infer<typeof syncUserSchema>;
export type userDto = z.infer<typeof userSchema>;
