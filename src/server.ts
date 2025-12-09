import { buildApp } from "./app";
import { config } from "./core/config";

async function start() {
  const app = await buildApp();

  await app.listen({
    port: config.apiPort,
    host: "0.0.0.0",
  });

  console.log(`Server is running at http://localhost:${config.apiPort}`);
}

start();
