import { defineConfig } from "drizzle-kit";

// if (!import.meta.env.VITE_DATABASE_URL) {
//   throw new Error("DATABASE_URL, ensure the database is provisioned");
// }

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_bNDtJhi56sFp@ep-sweet-wildflower-a6evg8oe.us-west-2.aws.neon.tech/neondb?sslmode=require",
  },
});
