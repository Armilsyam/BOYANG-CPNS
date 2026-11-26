import { NextResponse } from "next/server";
import { and, desc, eq, gt } from "drizzle-orm";
import QRCode from "qrcode";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import {
  createMidtransQrisCharge,
  generateOrderId,
  isMidtransConfigured,
} from "@/lib/midtrans";
import { ACCESS_PRICE_IDR } from "@/data/resources";

export async function POST() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message:
          "Database Neon Postgres belum terhubung. Jalankan `vercel integration add neon` dan tarik env dengan `vercel env pull .env.local --yes`.",
      },
      { status: 503 }
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Silakan masuk atau daftar akun terlebih dahulu." },
      { status: 401 }
    );
  }

  if (user.hasPaidAccess) {
    return NextResponse.json({
      alreadyPaid: true,
      accessCode: user.accessCode,
      message: "Akun Anda sudah memiliki akses penuh BOYANG-CPNS.",
    });
  }

  if (!isMidtransConfigured()) {
    return NextResponse.json(
      {
        error: "MIDTRANS_NOT_CONFIGURED",
        message:
          "MIDTRANS_SERVER_KEY belum dikonfigurasi. Isi MIDTRANS_SERVER_KEY dan MIDTRANS_CLIENT_KEY di environment variables Vercel / .env.local.",
      },
      { status: 503 }
    );
  }

  const db = getDb();
  const now = new Date();

  // Reuse an active unexpired pending order for this user so repeated clicks don't spam Midtrans
  const [existingPending] = await db
    .select()
    .from(schema.qrisOrders)
    .where(
      and(
        eq(schema.qrisOrders.userId, user.id),
        eq(schema.qrisOrders.status, "pending"),
        gt(schema.qrisOrders.expiresAt, now)
      )
    )
    .orderBy(desc(schema.qrisOrders.createdAt))
    .limit(1);

  if (existingPending && existingPending.qrString) {
    const qrDataUrl = await QRCode.toDataURL(existingPending.qrString, {
      width: 320,
      margin: 2,
      color: { dark: "#0B2A52", light: "#FFFFFF" },
    });

    return NextResponse.json({
      alreadyPaid: false,
      orderId: existingPending.orderId,
      amount: existingPending.amount,
      status: existingPending.status,
      qrString: existingPending.qrString,
      qrDataUrl,
      qrImageUrl: existingPending.qrImageUrl,
      expiresAt: existingPending.expiresAt?.toISOString() ?? null,
    });
  }

  try {
    const orderId = generateOrderId();
    const charge = await createMidtransQrisCharge({
      orderId,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.whatsapp,
    });

    const qrImageUrl =
      charge.actions?.find((a) => a.name === "generate-qr-code")?.url ?? null;
    const qrString = charge.qr_string ?? null;
    const expiresAt = charge.expiry_time
      ? new Date(charge.expiry_time.replace(" ", "T") + "+07:00")
      : new Date(Date.now() + 15 * 60 * 1000);

    await db.insert(schema.qrisOrders).values({
      id: crypto.randomUUID(),
      orderId,
      userId: user.id,
      amount: ACCESS_PRICE_IDR,
      paymentMethod: "midtrans_qris",
      status: "pending",
      midtransTransactionId: charge.transaction_id ?? null,
      qrString,
      qrImageUrl,
      expiresAt: Number.isNaN(expiresAt.getTime())
        ? new Date(Date.now() + 15 * 60 * 1000)
        : expiresAt,
    });

    const qrDataUrl = qrString
      ? await QRCode.toDataURL(qrString, {
          width: 320,
          margin: 2,
          color: { dark: "#0B2A52", light: "#FFFFFF" },
        })
      : null;

    return NextResponse.json({
      alreadyPaid: false,
      orderId,
      amount: ACCESS_PRICE_IDR,
      status: "pending",
      qrString,
      qrDataUrl,
      qrImageUrl,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal membuat transaksi QRIS Midtrans.";
    return NextResponse.json(
      { error: "MIDTRANS_CHARGE_FAILED", message },
      { status: 502 }
    );
  }
}
