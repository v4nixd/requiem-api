import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

export const config = {
  dbUrl: process.env.DATABASE_URL!,
  apiKey: process.env.API_KEY!,
  apiPort: Number(process.env.API_PORT ?? 3000),
};
