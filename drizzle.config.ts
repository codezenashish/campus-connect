import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: {
    // Migrations/DDL require a direct connection (port 5432) or session mode
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
});
