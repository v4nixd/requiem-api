import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { syncUserSchema, userSchema } from "./users.schema";
import { UsersController } from "./users.controller";
import { apiKeyGuard } from "../../core/auth";

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users/sync",
    {
      preHandler: apiKeyGuard,
      schema: {
        body: syncUserSchema,
        response: {
          200: userSchema,
        },
      },
    },
    UsersController.sync
  );

  app.get("/users/:id", UsersController.get);
  app.get("/users/count", UsersController.count);
  app.get("/users", UsersController.list);
}
