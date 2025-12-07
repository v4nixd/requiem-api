import { z } from "zod";

export const createLogSchema = z.object({
  type: z.string(),
  userId: z.string().optional(),
  roleId: z.string().optional(),
  data: z.any().optional(),
});

export const getLogsQuerySchema = z.object({
  type: z.string().optional(),
  userId: z.string().optional(),

  limit: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v) && v > 0 && v <= 500, {
      message: "Limit must be a number between 1 and 500",
    })
    .optional(),
});
