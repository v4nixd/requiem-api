import type { FastifyReply, FastifyRequest } from "fastify";
import {
  syncUserSchema,
  usersQuerySchema,
  type SyncUserDto,
} from "./users.schema";
import { UsersService } from "./users.service";

export const UsersController = {
  async sync(req: FastifyRequest, reply: FastifyReply) {
    const body = syncUserSchema.parse(req.body) as SyncUserDto;

    const user = await UsersService.sync(body);
    return reply.send(user);
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    return reply.send(await UsersService.getOne(id));
  },

  async list(req: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = usersQuerySchema.parse(req.query);
    return reply.send(await UsersService.list(page, limit));
  },

  async count(req: FastifyRequest, reply: FastifyReply) {
    return reply.send(await UsersService.count());
  },
};
