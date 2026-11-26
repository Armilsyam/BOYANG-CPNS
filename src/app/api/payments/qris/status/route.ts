import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import {
  fetchMidtransTransactionStatus,
  generateAccessCode,
  isMidtransConfigured,
  mapMidtransStatus,
} from "@/lib/midtrans";

export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId")?.trim();
  if (!orderId) {
    return NextResponse.json(
      { error: "MISSING_ORDER_ID", message: "Parameter orderId wajib diisi." },
      { status: 400 }
    );
  }

  const db = getDb();
  const [order] = await db
    .select()
    .from(schema.qrisOrders)
    .where(
      and(
        eq(schema.qrisOrders.orderId, orderId),
        eq(schema.qrisOrders.userId, user.id)
      )
    )
    .limit(1);

  if (!order) {
    return NextResponse.json(
      { error: "ORDER_NOT_FOUND", message: "Transaksi QRIS tidak ditemukan." },
      { status: 404 }
    );
  }

  // If already settled or user already unlocked, return immediately
  if (order.status === "settlement" || user.hasPaidAccess) {
    return NextResponse.json({
      orderId: order.orderId,
      status: "settlement",
      hasPaidAccess: true,
      accessCode: user.accessCode,
    });
  }

  // Poll Midtrans status directly if still pending & Midtrans is configured
  if (order.status === "pending" && isMidtransConfigured()) {
    try {
      const mtStatus = await fetchMidtransTransactionStatus(order.orderId);
      const mapped = mapMidtransStatus(
        mtStatus.transaction_status,
        mtStatus.fraud_status
      );

      if (mapped !== order.status) {
        const amountMatches =
          !mtStatus.gross_amount ||
          Math.round(Number(mtStatus.gross_amount)) === order.amount;

        if (mapped === "settlement" && amountMatches) {
          const paidAt = new Date();
          const accessCode = user.accessCode || generateAccessCode();

          await db
            .update(schema.qrisOrders)
            .set({
              status: "settlement",
              midtransTransactionId:
                mtStatus.transaction_id ?? order.midtransTransactionId,
              paidAt,
              updatedAt: paidAt,
            })
            .where(eq(schema.qrisOrders.id, order.id));

          await db
            .update(schema.user)
            .set({
              hasPaidAccess: true,
              accessCode,
              paidAt,
              updatedAt: paidAt,
            })
            .where(eq(schema.user.id, user.id));

          return NextResponse.json({
            orderId: order.orderId,
            status: "settlement",
            hasPaidAccess: true,
            accessCode,
          });
        } else if (mapped !== "settlement") {
          await db
            .update(schema.qrisOrders)
            .set({ status: mapped, updatedAt: new Date() })
            .where(eq(schema.qrisOrders.id, order.id));

          return NextResponse.json({
            orderId: order.orderId,
            status: mapped,
            hasPaidAccess: false,
            accessCode: null,
          });
        }
      }
    } catch {
      // Keep returning pending status if transient network check fails
    }
  }

  return NextResponse.json({
    orderId: order.orderId,
    status: order.status,
    hasPaidAccess: user.hasPaidAccess,
    accessCode: user.accessCode,
  });
}
