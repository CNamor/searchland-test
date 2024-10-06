import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const migrationClient = postgres(connectionString, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });

const queryClient = postgres(connectionString);
export const db = drizzle(queryClient);
