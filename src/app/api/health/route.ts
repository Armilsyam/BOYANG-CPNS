import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db";
import { getMidtransBaseUrl, isMidtransConfigured } from "@/lib/midtrans";
import { ACCESS_PRICE_IDR } from "@/data/resources";

export async function GET() {
  return NextResponse.json({
    ok: true,
    brand: "BOYANG-CPNS",
    priceIdr: ACCESS_PRICE_IDR,
    databaseConfigured: isDatabaseConfigured(),
    midtransConfigured: isMidtransConfigured(),
    midtransEnvironment:
      process.env.MIDTRANS_IS_PRODUCTION === "true" ? "production" : "sandbox",
    midtransBaseUrl: getMidtransBaseUrl(),
  });
}
