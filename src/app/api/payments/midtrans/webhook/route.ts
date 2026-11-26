import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import {
  generateAccessCode,
  isMidtransConfigured,
  mapMidtransStatus,
  verifyMidtransSignature,
} from "@/lib/midtrans";

interface MidtransNotificationBody {
  order_id?: string;
  status_code?: string;
  gross_amount?: string;
  signature_key?: string;
  transaction_status?: string;
  fraud_status?: string;
  transaction_id?: string;
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured() || !isMidtransConfigured()) {
    return NextResponse.json(
      { error: "SERVICE_UNCONFIGURED" },
      { status: 503 }
    );
  }

  let body: MidtransNotificationBody;
  try {
    body = (await request.json()) as MidtransNotificationBody;
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY!.trim();
  const orderId = body.order_id ?? "";
  const statusCode = body.status_code ?? "";
  const grossAmount = body.gross_amount ?? "";
  const signatureKey = body.signature_key ?? "";

  const isValidSignature = verifyMidtransSignature({
    orderId,
    statusCode,
    grossAmount,
    signatureKey,
    serverKey,
  });

  if (!isValidSignature) {
    return NextResponse.json(
      { error: "INVALID_SIGNATURE" },
      { status: 403 }
    );
  }

  const db = getDb();
  const [order] = await db
    .select()
    .from(schema.qrisOrders)
    .where(eq(schema.qrisOrders.orderId, orderId))
    .limit(1);

  if (!order) {
    return NextResponse.json(
      { error: "ORDER_NOT_FOUND" },
      { status: 404 }
    );
  }

  if (Math.round(Number(grossAmount)) !== order.amount) {
    return NextResponse.json(
      { error: "AMOUNT_MISMATCH" },
      { status: 400 }
    );
  }

  const nextStatus = mapMidtransStatus(
    body.transaction_status,
    body.fraud_status
  );
  const now = new Date();

  await db
    .update(schema.qrisOrders)
    .set({
      status: nextStatus,
      midtransTransactionId:
        body.transaction_id ?? order.midtransTransactionId,
      paidAt: nextStatus === "settlement" ? now : order.paidAt,
      rawNotification: JSON.stringify(body),
      updatedAt: now,
    })
    .where(eq(schema.qrisOrders.id, order.id));

  if (nextStatus === "settlement") {
    const [existingUser] = await db
      .select({
        id: schema.user.id,
        accessCode: schema.user.accessCode,
      })
      .from(schema.user)
      .where(eq(schema.user.id, order.userId))
      .limit(1);

    if (existingUser) {
      await db
        .update(schema.user)
        .set({
          hasPaidAccess: true,
          accessCode: existingUser.accessCode || generateAccessCode(),
          paidAt: now,
          updatedAt: now,
        })
        .where(eq(schema.user.id, existingUser.id));
    }
  }

  return NextResponse.json({ received: true, orderId, status: nextStatus });
}
