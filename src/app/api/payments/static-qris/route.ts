import { NextResponse } from "next/server";
import { and, desc, eq, inArray } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { generateOrderId } from "@/lib/midtrans";
import { ACCESS_PRICE_IDR } from "@/data/resources";
import { STATIC_QRIS_MERCHANT } from "@/lib/admin";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (user.hasPaidAccess) {
    return NextResponse.json({
      hasPaidAccess: true,
      accessCode: user.accessCode,
      order: null,
    });
  }

  const db = getDb();
  const [latestOrder] = await db
    .select({
      orderId: schema.qrisOrders.orderId,
      amount: schema.qrisOrders.amount,
      status: schema.qrisOrders.status,
      proofNote: schema.qrisOrders.proofNote,
      createdAt: schema.qrisOrders.createdAt,
    })
    .from(schema.qrisOrders)
    .where(
      and(
        eq(schema.qrisOrders.userId, user.id),
        eq(schema.qrisOrders.paymentMethod, "static_qris"),
        inArray(schema.qrisOrders.status, ["pending", "waiting_verification"])
      )
    )
    .orderBy(desc(schema.qrisOrders.createdAt))
    .limit(1);

  return NextResponse.json({
    hasPaidAccess: false,
    accessCode: null,
    merchant: STATIC_QRIS_MERCHANT,
    order: latestOrder ?? null,
  });
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message: "Database Neon Postgres belum terhubung.",
      },
      { status: 503 }
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Silakan masuk atau daftar dahulu." },
      { status: 401 }
    );
  }

  if (user.hasPaidAccess) {
    return NextResponse.json({
      hasPaidAccess: true,
      accessCode: user.accessCode,
    });
  }

  let proofNote: string | null = null;
  let markWaiting = false;
  try {
    const body = (await request.json()) as {
      proofNote?: string;
      confirmTransfer?: boolean;
    };
    proofNote = body.proofNote?.trim().slice(0, 200) || null;
    markWaiting = Boolean(body.confirmTransfer);
  } catch {
    // Allow empty POST body to initialize an order
  }

  const db = getDb();
  const [existing] = await db
    .select()
    .from(schema.qrisOrders)
    .where(
      and(
        eq(schema.qrisOrders.userId, user.id),
        eq(schema.qrisOrders.paymentMethod, "static_qris"),
        inArray(schema.qrisOrders.status, ["pending", "waiting_verification"])
      )
    )
    .orderBy(desc(schema.qrisOrders.createdAt))
    .limit(1);

  const nextStatus = markWaiting ? "waiting_verification" : "pending";
  const now = new Date();

  if (existing) {
    const [updated] = await db
      .update(schema.qrisOrders)
      .set({
        status:
          existing.status === "waiting_verification" && !markWaiting
            ? "waiting_verification"
            : nextStatus,
        proofNote: proofNote ?? existing.proofNote,
        updatedAt: now,
      })
      .where(eq(schema.qrisOrders.id, existing.id))
      .returning({
        orderId: schema.qrisOrders.orderId,
        amount: schema.qrisOrders.amount,
        status: schema.qrisOrders.status,
        proofNote: schema.qrisOrders.proofNote,
      });

    return NextResponse.json({
      hasPaidAccess: false,
      merchant: STATIC_QRIS_MERCHANT,
      order: updated,
    });
  }

  const orderId = generateOrderId();
  await db.insert(schema.qrisOrders).values({
    id: crypto.randomUUID(),
    orderId,
    userId: user.id,
    amount: ACCESS_PRICE_IDR,
    paymentMethod: "static_qris",
    status: nextStatus,
    proofNote,
    qrImageUrl: STATIC_QRIS_MERCHANT.imagePath,
  });

  return NextResponse.json({
    hasPaidAccess: false,
    merchant: STATIC_QRIS_MERCHANT,
    order: {
      orderId,
      amount: ACCESS_PRICE_IDR,
      status: nextStatus,
      proofNote,
    },
  });
}
