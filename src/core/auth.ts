import { FastifyRequest, FastifyReply } from "fastify";
import { config } from "./config";

export async function apiKeyGuard(req: FastifyRequest, reply: FastifyReply) {
  const key = req.headers["x-api-key"];

  if (!key || key !== config.apiKey) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
}
