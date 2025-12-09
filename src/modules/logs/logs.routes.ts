import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { createLogSchema, getLogsQuerySchema } from "./logs.schema";
import { LogsController } from "./logs.controller";
import { apiKeyGuard } from "../../core/auth";

export async function logsRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/logs",
      {
        preHandler: apiKeyGuard,
        schema: {
          tags: ["Logs"],
          summary: "Create log",
          body: createLogSchema,
        },
      },
      LogsController.create
    );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/logs",
    {
      schema: { querystring: getLogsQuerySchema },
    },
    LogsController.get
  );
}
