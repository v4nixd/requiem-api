import type { User } from "@prisma/client";
import { prisma } from "../../core/prisma";
import type { SyncUserDto, userDto } from "./users.schema";
import { generateSnowflake } from "../../core/snowflake";

function toUserDto(u: User): userDto {
  return {
    id: u.id,
    discordId: u.discordId,
    username: u.username,
    globalName: u.globalName,
    avatar: u.avatar,
    banner: u.banner,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  };
}

export const UsersService = {
  async sync(data: SyncUserDto) {
    const existing = await prisma.user.findUnique({
      where: { discordId: data.discordId },
    });

    if (!existing) {
      const user = await prisma.user.create({
        data: {
          id: generateSnowflake(),
          discordId: data.discordId,
          username: data.username,
          globalName: data.globalName,
          avatar: data.avatar,
          banner: data.banner,
        },
      });

      return toUserDto(user);
    }

    const updated = await prisma.user.update({
      where: { discordId: data.discordId },
      data: {
        username: data.username,
        globalName: data.globalName,
        avatar: data.avatar,
        banner: data.banner,
      },
    });

    return toUserDto(updated);
  },

  async getOne(id: string) {
    const user = await prisma.user.findUnique({ where: { discordId: id } });

    return user ? toUserDto(user) : null;
  },

  async list(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: users.map(toUserDto),
    };
  },

  async count() {
    const total = await prisma.user.count();
    return { count: total };
  },
};
