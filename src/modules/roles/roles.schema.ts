import { z } from "zod";

export const roleSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    color: z.number().nullable(),
    position: z.number(),
    permissions: z.string(),
  })
);

export type SyncRoleDto = z.infer<typeof roleSchema>;
