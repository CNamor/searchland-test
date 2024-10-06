import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
