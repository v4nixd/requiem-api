import Fastify from "fastify";
export const app = Fastify({ logger: false });

app.get("/", async () => {
  return { status: "OK", message: "Requiem API is up and running" };
});
