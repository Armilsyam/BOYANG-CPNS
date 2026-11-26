import { neon } from "@neondatabase/serverless";

let schemaPromise: Promise<void> | null = null;

async function createMissingTables() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url || url.includes("ep-example") || url.includes("user:password@")) {
    return;
  }

  const sql = neon(url);

  await sql`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" text PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL UNIQUE,
      "email_verified" boolean DEFAULT false NOT NULL,
      "image" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      "whatsapp" text,
      "has_paid_access" boolean DEFAULT false NOT NULL,
      "access_code" text UNIQUE,
      "paid_at" timestamp
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "session" (
      "id" text PRIMARY KEY NOT NULL,
      "expires_at" timestamp NOT NULL,
      "token" text NOT NULL UNIQUE,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      "ip_address" text,
      "user_agent" text,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "account" (
      "id" text PRIMARY KEY NOT NULL,
      "account_id" text NOT NULL,
      "provider_id" text NOT NULL,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "access_token" text,
      "refresh_token" text,
      "id_token" text,
      "access_token_expires_at" timestamp,
      "refresh_token_expires_at" timestamp,
      "scope" text,
      "password" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "verification" (
      "id" text PRIMARY KEY NOT NULL,
      "identifier" text NOT NULL,
      "value" text NOT NULL,
      "expires_at" timestamp NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "qris_orders" (
      "id" text PRIMARY KEY NOT NULL,
      "order_id" text NOT NULL UNIQUE,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "amount" integer DEFAULT 10000 NOT NULL,
      "payment_method" text DEFAULT 'static_qris' NOT NULL,
      "status" text DEFAULT 'pending' NOT NULL,
      "proof_note" text,
      "midtrans_transaction_id" text,
      "qr_string" text,
      "qr_image_url" text,
      "expires_at" timestamp,
      "paid_at" timestamp,
      "raw_notification" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    ALTER TABLE "qris_orders"
    ADD COLUMN IF NOT EXISTS "payment_method" text DEFAULT 'static_qris' NOT NULL;
  `;

  await sql`
    ALTER TABLE "qris_orders"
    ADD COLUMN IF NOT EXISTS "proof_note" text;
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "access_vouchers" (
      "id" text PRIMARY KEY NOT NULL,
      "code" text NOT NULL UNIQUE,
      "note" text,
      "created_by_email" text,
      "used_by_user_id" text REFERENCES "user"("id") ON DELETE SET NULL,
      "used_at" timestamp,
      "is_active" boolean DEFAULT true NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "user_bookmarks" (
      "id" text PRIMARY KEY NOT NULL,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "instansi_no" integer NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "user_bookmarks_user_instansi_idx"
    ON "user_bookmarks" ("user_id", "instansi_no");
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "user_checklist" (
      "id" text PRIMARY KEY NOT NULL,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "step_id" text NOT NULL,
      "completed" boolean DEFAULT true NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "user_checklist_user_step_idx"
    ON "user_checklist" ("user_id", "step_id");
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "tryout_attempts" (
      "id" text PRIMARY KEY NOT NULL,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "mode" text NOT NULL,
      "twk_score" integer DEFAULT 0 NOT NULL,
      "tiu_score" integer DEFAULT 0 NOT NULL,
      "tkp_score" integer DEFAULT 0 NOT NULL,
      "total_score" integer DEFAULT 0 NOT NULL,
      "passed_passing_grade" boolean DEFAULT false NOT NULL,
      "duration_seconds" integer DEFAULT 0 NOT NULL,
      "answers_json" text NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;
}

/**
 * Ensures database schema exists even if Neon was connected via Vercel Dashboard
 * before running `npm run db:push` manually.
 */
export async function ensureDatabaseSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = createMissingTables().catch((err) => {
      schemaPromise = null;
      throw err;
    });
  }
  await schemaPromise;
}
