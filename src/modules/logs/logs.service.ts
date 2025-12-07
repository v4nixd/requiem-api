import { prisma } from "../../core/prisma";

export const LogsService = {
  async create(data: {
    type: string;
    userId?: string;
    roleId?: string;
    data?: unknown;
  }) {
    return prisma.log.create({
      data: {
        id: crypto.randomUUID(),
        type: data.type,
        userId: data.userId,
        roleId: data.roleId,
        data: data.data as any,
      },
    });
  },

  async find(params: { type?: string; userId?: string; limit?: number }) {
    const limit = params.limit ?? 50;

    return prisma.log.findMany({
      where: {
        type: params.type,
        userId: params.userId,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },
};
