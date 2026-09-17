import {
  PgTable,
  serial,
  text,
  timestamp,
  decimal,
  boolean,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["student", "club_organizer", "admin"]);
export const categoryEnum = pgEnum("category", [
  "books",
  "electronics",
  "cycles",
  "notes",
  "lost_found",
]);
export const statusEnum = pgEnum("status", ["active", "sold", "resolved"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").default("student").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

