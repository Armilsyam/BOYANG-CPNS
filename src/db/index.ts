import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export class DatabaseConfigError extends Error {
  constructor(
    message = "DATABASE_URL belum dikonfigurasi. Jalankan `vercel integration add neon` lalu `vercel env pull .env.local --yes`."
  ) {
    super(message);
    this.name = "DatabaseConfigError";
  }
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return false;
  if (url.includes("ep-example") || url.includes("user:password@")) return false;
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

function createDb() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new DatabaseConfigError();
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

/**
 * Lazy Neon Postgres Drizzle client — build-time safe when DATABASE_URL is absent.
 */
export function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

export { schema };
