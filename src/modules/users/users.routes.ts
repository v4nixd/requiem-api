import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import {
  syncUserSchema,
  userSchema,
  usersQuerySchema,
  userHistoryOutputSchema,
} from "./users.schema";
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
          404: z.object({ message: z.string() }),
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
          200: z
            .object({
              page: z.number(),
              limit: z.number(),
              total: z.number(),
              totalPages: z.number(),
              data: z.array(userSchema),
            })
            .optional(),
        },
      },
    },
    UsersController.list
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/:id/history",
    {
      schema: {
        tags: ["Users", "History", "Logs"],
        summary: "Get user history by user ID",
        params: z.object({ id: z.string() }),
        response: {
          200: z.array(userHistoryOutputSchema).optional(),
        },
      },
    },
    UsersController.getUserHistory
  );
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/users/:id/history",
    {
      preHandler: apiKeyGuard,
      schema: {
        tags: ["Users", "History", "Logs"],
        summary: "Remove user history by user ID",
        params: z.object({ id: z.string() }).nullable(),
        response: {
          204: z.null(),
        },
      },
    },
    UsersController.removeUserHistory
  );
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/history",
    {
      preHandler: apiKeyGuard,
      schema: {
        tags: ["Users", "History", "Logs"],
        summary: "Get all users history",
        response: {
          200: z.array(userHistoryOutputSchema).optional(),
        },
      },
    },
    UsersController.getHistory
  );
}
