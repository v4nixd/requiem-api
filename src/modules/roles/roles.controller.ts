import type { FastifyReply, FastifyRequest } from "fastify";
import { roleSchema, type SyncRoleDto } from "./roles.schema";
import { RolesService } from "./roles.service";

export const RolesController = {
  async sync(req: FastifyRequest, reply: FastifyReply) {
    const roles = roleSchema.parse(req.body) as SyncRoleDto;

    const result = await RolesService.sync(roles);
    return reply.send(result);
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    const role = await RolesService.getOne(id);
    if (!role) {
      return reply.status(404).send({ message: "Role not found" });
    }
    return reply.status(200).send(role);
  },

  async list(req: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send(await RolesService.list());
  },

  async count(req: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send(await RolesService.count());
  },
};
