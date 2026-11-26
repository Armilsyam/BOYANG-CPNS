import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  // BOYANG-CPNS custom fields
  whatsapp: text("whatsapp"),
  hasPaidAccess: boolean("has_paid_access").notNull().default(false),
  accessCode: text("access_code").unique(),
  paidAt: timestamp("paid_at"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const qrisOrders = pgTable("qris_orders", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull().default(10000),
  status: text("status").notNull().default("pending"), // pending | settlement | expire | cancel | deny
  midtransTransactionId: text("midtrans_transaction_id"),
  qrString: text("qr_string"),
  qrImageUrl: text("qr_image_url"),
  expiresAt: timestamp("expires_at"),
  paidAt: timestamp("paid_at"),
  rawNotification: text("raw_notification"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userBookmarks = pgTable(
  "user_bookmarks",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    instansiNo: integer("instansi_no").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("user_bookmarks_user_instansi_idx").on(
      table.userId,
      table.instansiNo
    ),
  ]
);

export const userChecklist = pgTable(
  "user_checklist",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    stepId: text("step_id").notNull(),
    completed: boolean("completed").notNull().default(true),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("user_checklist_user_step_idx").on(table.userId, table.stepId),
  ]
);

export const tryoutAttempts = pgTable("tryout_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  mode: text("mode").notNull(), // all | TWK | TIU | TKP
  twkScore: integer("twk_score").notNull().default(0),
  tiuScore: integer("tiu_score").notNull().default(0),
  tkpScore: integer("tkp_score").notNull().default(0),
  totalScore: integer("total_score").notNull().default(0),
  passedPassingGrade: boolean("passed_passing_grade").notNull().default(false),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  answersJson: text("answers_json").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
