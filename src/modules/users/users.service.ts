import type { User } from "@prisma/client";
import { prisma } from "../../core/prisma";
import type { SyncUserDto, UserDto, UserHistoryInputDto } from "./users.schema";
import { generateSnowflake } from "../../core/snowflake";

function toUserDto(u: User): UserDto {
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

    const trackedFields = {
      USERNAME: "username",
      GLOBAL_NAME: "globalName",
      AVATAR: "avatar",
      BANNER: "banner",
    } satisfies Record<string, keyof SyncUserDto>;

    type HistoryType = keyof typeof trackedFields;
    type TrackedField = (typeof trackedFields)[HistoryType];

    for (const type of Object.keys(trackedFields) as HistoryType[]) {
      const field = trackedFields[type];

      const oldValue = existing[field];
      const newValue = data[field];

      if (oldValue !== newValue) {
        await this.addHistoryEntry({
          userId: existing.id,
          type,
          oldValue,
          newValue,
        });
      }
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

  async addHistoryEntry(data: UserHistoryInputDto) {
    try {
      const entry = await prisma.userHistory.create({
        data: {
          id: generateSnowflake(),
          userId: data.userId,
          type: data.type,
          oldValue: data.oldValue,
          newValue: data.newValue,
        },
      });

      return {
        id: entry.id,
        userId: entry.userId,
        type: entry.type,
        oldValue: entry.oldValue,
        newValue: entry.newValue,
        createdAt: entry.createdAt.toISOString(),
      };
    } catch (e) {
      console.error("Failed to add history entry:", e);
      return null;
    }
  },

  async removeUserHistory(userId: string) {
    const deleted = await prisma.userHistory.deleteMany({
      where: { userId },
    });

    if (deleted.count === 0) {
      return null;
    }

    return { deletedCount: deleted.count };
  },

  async getUserHistoryById(id: string) {
    const history = await prisma.userHistory.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });

    return history.map((entry) => ({
      id: entry.id,
      userId: entry.userId,
      type: entry.type,
      oldValue: entry.oldValue,
      newValue: entry.newValue,
      createdAt: entry.createdAt.toISOString(),
    }));
  },

  async getUsersHistory() {
    const history = await prisma.userHistory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return history.map((entry) => ({
      userId: entry.userId,
      type: entry.type,
      oldValue: entry.oldValue,
      newValue: entry.newValue,
      createdAt: entry.createdAt.toISOString(),
    }));
  },
};
