import { prisma } from "../../core/prisma";
import type { SyncUserDto } from "./users.schema";
import { generateSnowflake } from "../../core/snowflake";

export const UsersService = {
  async sync(data: SyncUserDto) {
    const existing = await prisma.user.findUnique({
      where: { discordId: data.discordId },
    });

    if (!existing) {
      return prisma.user.create({
        data: {
          id: generateSnowflake(),
          discordId: data.discordId,
          username: data.username,
          globalName: data.globalName,
          avatar: data.avatar,
          banner: data.banner,
        },
      });
    }

    return prisma.user.update({
      where: { discordId: data.discordId },
      data: {
        username: data.username,
        globalName: data.globalName,
        avatar: data.avatar,
        banner: data.banner,
      },
    });
  },

  async getOne(id: string) {
    return prisma.user.findUnique({ where: { discordId: id } });
  },

  async getAll() {
    return prisma.user.findMany({ take: 100 });
  },

  async count() {
    return prisma.user.count();
  },
};
