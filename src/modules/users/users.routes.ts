import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { syncUserSchema, userSchema, usersQuerySchema } from "./users.schema";
import { UsersController } from "./users.controller";
import { apiKeyGuard } from "../../core/auth";

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users/sync",
    {
      preHandler: apiKeyGuard,
      schema: {
        tags: ["Users"],
        summary: "Sync user data from discord",
        body: syncUserSchema,
        response: {
          200: userSchema,
        },
      },
    },
    UsersController.sync
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Get user by ID",
        params: z.object({ id: z.string() }),
        response: {
          200: userSchema,
        },
      },
    },
    UsersController.get
  );
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/count",
    {
      schema: {
        tags: ["Users"],
        summary: "Get total user count",
        response: {
          200: z.object({ count: z.number() }),
        },
      },
    },
    UsersController.count
  );
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Get paginated list of users",
        querystring: usersQuerySchema,
        response: {
          200: z.object({
            page: z.number(),
            limit: z.number(),
            total: z.number(),
            totalPages: z.number(),
            data: z.array(userSchema),
          }),
        },
      },
    },
    UsersController.list
  );
}
