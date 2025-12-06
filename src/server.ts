import { app } from "./app";

async function main() {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("API running at http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
