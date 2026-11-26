import crypto from "node:crypto";
import { ACCESS_PRICE_IDR } from "@/data/resources";

export interface MidtransChargeResult {
  status_code: string;
  status_message: string;
  transaction_id?: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_status: string;
  qr_string?: string;
  expiry_time?: string;
  actions?: Array<{
    name: string;
    method: string;
    url: string;
  }>;
}

export interface MidtransStatusResult {
  status_code: string;
  status_message: string;
  transaction_id?: string;
  order_id: string;
  gross_amount?: string;
  transaction_status?: string;
  fraud_status?: string;
  settlement_time?: string;
}

export type OrderStatus = "pending" | "settlement" | "expire" | "cancel" | "deny";

export function isMidtransConfigured(): boolean {
  const key = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!key) return false;
  if (key.includes("xxxxxxxx")) return false;
  return key.length >= 12;
}

export function getMidtransBaseUrl(): string {
  return process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? "https://api.midtrans.com"
    : "https://api.sandbox.midtrans.com";
}

function getAuthHeader(serverKey: string): string {
  return `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`;
}

export async function createMidtransQrisCharge(params: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
}): Promise<MidtransChargeResult> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!serverKey || !isMidtransConfigured()) {
    throw new Error("MIDTRANS_SERVER_KEY belum dikonfigurasi.");
  }

  const response = await fetch(`${getMidtransBaseUrl()}/v2/charge`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getAuthHeader(serverKey),
    },
    body: JSON.stringify({
      payment_type: "qris",
      transaction_details: {
        order_id: params.orderId,
        gross_amount: ACCESS_PRICE_IDR,
      },
      item_details: [
        {
          id: "BOYANG-CPNS-ACCESS",
          price: ACCESS_PRICE_IDR,
          quantity: 1,
          name: "Akses Penuh Dashboard BOYANG-CPNS",
        },
      ],
      customer_details: {
        first_name: params.customerName.slice(0, 50) || "Peserta CPNS",
        email: params.customerEmail,
        phone: params.customerPhone || undefined,
      },
      qris: {
        acquirer: "gopay",
      },
      custom_expiry: {
        expiry_duration: 15,
        unit: "minute",
      },
    }),
  });

  const data = (await response.json()) as MidtransChargeResult;
  if (!response.ok || (data.status_code !== "201" && data.status_code !== "200")) {
    throw new Error(data.status_message || `Midtrans charge gagal (${response.status})`);
  }

  return data;
}

export async function fetchMidtransTransactionStatus(
  orderId: string
): Promise<MidtransStatusResult> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!serverKey || !isMidtransConfigured()) {
    throw new Error("MIDTRANS_SERVER_KEY belum dikonfigurasi.");
  }

  const response = await fetch(
    `${getMidtransBaseUrl()}/v2/${encodeURIComponent(orderId)}/status`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: getAuthHeader(serverKey),
      },
      cache: "no-store",
    }
  );

  const data = (await response.json()) as MidtransStatusResult;
  if (!response.ok && data.status_code !== "404") {
    throw new Error(data.status_message || `Midtrans status check gagal (${response.status})`);
  }
  return data;
}

export function computeMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string
): string {
  return crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest("hex");
}

export function verifyMidtransSignature(params: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
  serverKey: string;
}): boolean {
  if (!params.orderId || !params.statusCode || !params.grossAmount || !params.signatureKey) {
    return false;
  }
  const expected = computeMidtransSignature(
    params.orderId,
    params.statusCode,
    params.grossAmount,
    params.serverKey
  );

  const expectedBuf = Buffer.from(expected, "utf8");
  const actualBuf = Buffer.from(params.signatureKey.toLowerCase(), "utf8");
  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

export function mapMidtransStatus(
  transactionStatus?: string,
  fraudStatus?: string
): OrderStatus {
  if (!transactionStatus) return "pending";
  if (transactionStatus === "settlement") return "settlement";
  if (transactionStatus === "capture") {
    return fraudStatus === "deny" ? "deny" : "settlement";
  }
  if (transactionStatus === "expire") return "expire";
  if (transactionStatus === "cancel") return "cancel";
  if (transactionStatus === "deny") return "deny";
  return "pending";
}

export function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (len: number) => {
    const bytes = crypto.randomBytes(len);
    let out = "";
    for (let i = 0; i < len; i++) {
      out += chars[bytes[i] % chars.length];
    }
    return out;
  };
  return `BYG-${pick(4)}-${pick(4)}`;
}

export function generateOrderId(): string {
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `BYG-${Date.now()}-${rand}`;
}
