import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { isAdminEmail } from "@/lib/admin";
import { generateAccessCode } from "@/lib/midtrans";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }

  const admin = await getCurrentUser();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!isAdminEmail(admin.email)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const db = getDb();
  const [orders, vouchers, users] = await Promise.all([
    db
      .select({
        id: schema.qrisOrders.id,
        orderId: schema.qrisOrders.orderId,
        amount: schema.qrisOrders.amount,
        paymentMethod: schema.qrisOrders.paymentMethod,
        status: schema.qrisOrders.status,
        proofNote: schema.qrisOrders.proofNote,
        createdAt: schema.qrisOrders.createdAt,
        paidAt: schema.qrisOrders.paidAt,
        userId: schema.user.id,
        userName: schema.user.name,
        userEmail: schema.user.email,
        userWhatsapp: schema.user.whatsapp,
        hasPaidAccess: schema.user.hasPaidAccess,
        accessCode: schema.user.accessCode,
      })
      .from(schema.qrisOrders)
      .innerJoin(schema.user, eq(schema.qrisOrders.userId, schema.user.id))
      .orderBy(desc(schema.qrisOrders.createdAt))
      .limit(50),
    db
      .select()
      .from(schema.accessVouchers)
      .orderBy(desc(schema.accessVouchers.createdAt))
      .limit(30),
    db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        whatsapp: schema.user.whatsapp,
        hasPaidAccess: schema.user.hasPaidAccess,
        accessCode: schema.user.accessCode,
        createdAt: schema.user.createdAt,
      })
      .from(schema.user)
      .orderBy(desc(schema.user.createdAt))
      .limit(50),
  ]);

  return NextResponse.json({ orders, vouchers, users });
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }

  const admin = await getCurrentUser();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!isAdminEmail(admin.email)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    action?: "approve_order" | "approve_user_email" | "create_voucher";
    orderId?: string;
    email?: string;
    note?: string;
  };

  const db = getDb();
  const now = new Date();

  if (body.action === "approve_order" && body.orderId) {
    const [order] = await db
      .select()
      .from(schema.qrisOrders)
      .where(eq(schema.qrisOrders.orderId, body.orderId))
      .limit(1);

    if (!order) {
      return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });
    }

    const [targetUser] = await db
      .select({
        id: schema.user.id,
        accessCode: schema.user.accessCode,
      })
      .from(schema.user)
      .where(eq(schema.user.id, order.userId))
      .limit(1);

    const accessCode = targetUser?.accessCode || generateAccessCode();

    await db
      .update(schema.qrisOrders)
      .set({ status: "settlement", paidAt: now, updatedAt: now })
      .where(eq(schema.qrisOrders.id, order.id));

    await db
      .update(schema.user)
      .set({
        hasPaidAccess: true,
        accessCode,
        paidAt: now,
        updatedAt: now,
      })
      .where(eq(schema.user.id, order.userId));

    return NextResponse.json({ ok: true, accessCode, orderId: order.orderId });
  }

  if (body.action === "approve_user_email" && body.email) {
    const email = body.email.trim().toLowerCase();
    const [targetUser] = await db
      .select({
        id: schema.user.id,
        accessCode: schema.user.accessCode,
      })
      .from(schema.user)
      .where(eq(schema.user.email, email))
      .limit(1);

    if (!targetUser) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND", message: "Email pengguna belum terdaftar." },
        { status: 404 }
      );
    }

    const accessCode = targetUser.accessCode || generateAccessCode();
    await db
      .update(schema.user)
      .set({
        hasPaidAccess: true,
        accessCode,
        paidAt: now,
        updatedAt: now,
      })
      .where(eq(schema.user.id, targetUser.id));

    return NextResponse.json({ ok: true, email, accessCode });
  }

  if (body.action === "create_voucher") {
    const code = generateAccessCode();
    await db.insert(schema.accessVouchers).values({
      id: crypto.randomUUID(),
      code,
      note: body.note?.trim().slice(0, 120) || "Voucher QRIS Rp 10.000",
      createdByEmail: admin.email,
      isActive: true,
    });
    return NextResponse.json({ ok: true, code });
  }

  return NextResponse.json({ error: "INVALID_ACTION" }, { status: 400 });
}
