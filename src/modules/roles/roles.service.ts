import { prisma } from "../../core/prisma";
import type { SyncRoleDto } from "./roles.schema";

export const RolesService = {
  async sync(roles: SyncRoleDto) {
    const incomingIds = roles.map((r) => r.id);

    return prisma.$transaction(async (tx) => {
      await tx.role.deleteMany({
        where: {
          id: { notIn: incomingIds },
        },
      });

      return Promise.all(
        roles.map((role) =>
          tx.role.upsert({
            where: { id: role.id },
            update: {
              name: role.name,
              color: role.color,
              position: role.position,
              permissions: BigInt(role.permissions),
            },
            create: {
              id: role.id,
              name: role.name,
              color: role.color,
              position: role.position,
              permissions: BigInt(role.permissions),
            },
          })
        )
      );
    });
  },

  async getOne(id: string) {
    return await prisma.role.findUnique({ where: { id } });
  },

  async list() {
    return prisma.role.findMany({ orderBy: { position: "desc" } });
  },

  async count() {
    return { count: prisma.role.count() };
  },
};
