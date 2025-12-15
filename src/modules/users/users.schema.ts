import {z} from "zod";

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

export const userHistorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["USERNAME", "GLOBAL_NAME", "AVATAR", "BANNER"]),
  oldValue: z.string().nullable(),
  newValue: z.string().nullable(),
  createdAt: z.iso.datetime(),
});

export const addUserHistorySchema = userHistorySchema.omit({
  id: true,
  createdAt: true,
});

export const getUserHistorySchema = z.object({
  type: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type SyncUserDto = z.infer<typeof syncUserSchema>;
export type UserDto = z.infer<typeof userSchema>;
export type AddUserHistoryDto = z.infer<typeof addUserHistorySchema>;
export type GetUserHistoryDto = z.infer<typeof getUserHistorySchema>;
