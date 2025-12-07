import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { LogsService } from "./logs.service";
import { getLogsQuerySchema } from "./logs.schema";

export const LogsController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const created = await LogsService.create(req.body as any);
    return reply.send(created);
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query as z.infer<typeof getLogsQuerySchema>;

    const logs = await LogsService.find(query);
    return reply.send(logs);
  },
};
