import { NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_NOT_CONFIGURED", message: "Database belum terhubung." },
      { status: 503 }
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Silakan masuk terlebih dahulu." },
      { status: 401 }
    );
  }

  if (user.hasPaidAccess) {
    return NextResponse.json({
      hasPaidAccess: true,
      accessCode: user.accessCode,
    });
  }

  const body = (await request.json().catch(() => ({}))) as { code?: string };
  const code = (body.code || "").trim().toUpperCase();
  if (!code || code.length < 6) {
    return NextResponse.json(
      { error: "INVALID_CODE", message: "Masukkan kode aktivasi yang valid." },
      { status: 400 }
    );
  }

  const db = getDb();
  const now = new Date();

  // Atomically claim unused active voucher
  const claimed = await db
    .update(schema.accessVouchers)
    .set({
      usedByUserId: user.id,
      usedAt: now,
      isActive: false,
    })
    .where(
      and(
        eq(schema.accessVouchers.code, code),
        eq(schema.accessVouchers.isActive, true),
        isNull(schema.accessVouchers.usedByUserId)
      )
    )
    .returning({ code: schema.accessVouchers.code });

  if (claimed.length === 0) {
    return NextResponse.json(
      {
        error: "VOUCHER_NOT_FOUND",
        message: "Kode aktivasi tidak ditemukan atau sudah pernah dipakai.",
      },
      { status: 404 }
    );
  }

  const accessCode = user.accessCode || claimed[0].code;
  await db
    .update(schema.user)
    .set({
      hasPaidAccess: true,
      accessCode,
      paidAt: now,
      updatedAt: now,
    })
    .where(eq(schema.user.id, user.id));

  await db
    .update(schema.qrisOrders)
    .set({
      status: "settlement",
      paidAt: now,
      updatedAt: now,
    })
    .where(
      and(
        eq(schema.qrisOrders.userId, user.id),
        eq(schema.qrisOrders.paymentMethod, "static_qris")
      )
    );

  return NextResponse.json({
    hasPaidAccess: true,
    accessCode,
    message: "Kode aktivasi valid. Akses dashboard BOYANG-CPNS aktif!",
  });
}
