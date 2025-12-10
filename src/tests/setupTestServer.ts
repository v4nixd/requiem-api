import { buildApp } from "../app";
import { prisma } from "../core/prisma";

export async function setupTestServer() {
  const app = await buildApp();

  await app.ready();

  return {
    app,
    close: async () => {
      await app.close();
      await prisma.$disconnect();
    },
  };
}
