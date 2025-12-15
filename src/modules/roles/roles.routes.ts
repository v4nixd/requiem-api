import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { roleSchema } from "./roles.schema";
import { RolesController } from "./roles.controller";
import { apiKeyGuard } from "../../core/auth";
import { UsersController } from "../users/users.controller";

export async function rolesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/roles/sync",
    {
      preHandler: apiKeyGuard,
      schema: {
        tags: ["Roles"],
        summary: "Sync server roles from discord",
        body: roleSchema,
        response: {
          200: roleSchema,
        },
      },
    },
    RolesController.sync
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/roles/:id",
    {
      schema: {
        tags: ["Roles"],
        summary: "Get role by ID",
        params: z.object({ id: z.string() }),
        response: {
          200: roleSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
    RolesController.get
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/roles",
    {
      schema: {
        tags: ["Roles"],
        summary: "Get all roles",
        response: {
          200: roleSchema,
        },
      },
    },
    RolesController.list
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/roles/count",
    {
      schema: {
        tags: ["Roles"],
        summary: "Get roles count",
        response: {
          200: z.object({ count: z.number() }),
        },
      },
    },
    UsersController.count
  );
}
