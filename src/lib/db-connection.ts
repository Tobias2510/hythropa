import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

function createDb() {
  if (process.env.USE_NEON === "true") {
    return drizzleNeon(process.env.DATABASE_URL!);
  }

  return drizzlePg(
    new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? true : false,
    }),
  );
}

const db = createDb();

export { db };
