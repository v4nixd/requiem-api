import { FastifyInstance } from "fastify";
import { createLogSchema, getLogsQuerySchema } from "./logs.schema";
import { LogsController } from "./logs.controller";
import { apiKeyGuard } from "../../core/auth";

export async function logsRoutes(app: FastifyInstance) {
  app.post(
    "/logs",
    { preHandler: apiKeyGuard, schema: { body: createLogSchema } },
    LogsController.create
  );

  app.get(
    "/logs",
    { schema: { querystring: getLogsQuerySchema } },
    LogsController.get
  );
}
