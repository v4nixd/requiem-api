import type { FastifyReply, FastifyRequest } from "fastify";
import {
  syncUserSchema,
  usersQuerySchema,
  userHistoryInputSchema,
  type SyncUserDto,
  type UserHistoryInputDto,
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

    const user = await UsersService.getOne(id);
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }
    return reply.status(200).send(user);
  },

  async list(req: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = usersQuerySchema.parse(req.query);
    return reply.send(await UsersService.list(page, limit));
  },

  async count(req: FastifyRequest, reply: FastifyReply) {
    return reply.send(await UsersService.count());
  },

  async addHistory(req: FastifyRequest, reply: FastifyReply) {
    const body = userHistoryInputSchema.parse(req.body) as UserHistoryInputDto;

    const entry = await UsersService.addHistoryEntry(body);

    if (!entry) {
      return reply.status(400).send({ message: "Failed to add history entry" });
    }

    return reply.status(200).send(entry);
  },

  async removeUserHistory(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as { userId: string };

    const deleted = await UsersService.removeUserHistory(userId);

    if (!deleted) {
      return reply
        .status(404)
        .send({ message: "User not found or has no history" });
    }

    return reply.status(204).send(deleted);
  },

  async getUserHistory(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as { userId: string };

    const history = await UsersService.getUserHistoryById(userId);

    if (!history) {
      return reply.status(404).send({ message: "User history is empty" });
    }

    return reply.status(200).send(history);
  },

  async getHistory(req: FastifyRequest, reply: FastifyReply) {
    const history = await UsersService.getUsersHistory();

    if (!history) {
      return reply.status(404).send("No history");
    }

    return reply.status(200).send(history);
  },
};
