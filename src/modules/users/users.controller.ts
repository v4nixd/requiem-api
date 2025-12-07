import type { FastifyReply, FastifyRequest } from "fastify";
import { syncUserSchema, type SyncUserDto } from "./users.schema";
import { UsersService } from "./users.service";

export const UsersController = {
  async sync(req: FastifyRequest, reply: FastifyReply) {
    const body = syncUserSchema.parse(req.body) as SyncUserDto;

    const user = await UsersService.sync(body);
    return reply.send(user);
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const user = await UsersService.getOne(id);
    return reply.send(user);
  },

  async list(req: FastifyRequest, reply: FastifyReply) {
    return reply.send(await UsersService.getAll());
  },

  async count(req: FastifyRequest, reply: FastifyReply) {
    return reply.send(await UsersService.count());
  },
};
