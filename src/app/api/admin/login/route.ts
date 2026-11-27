import { NextResponse } from "next/server";
import {
  getAdminCookieOptions,
  signAdminToken,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    identifier?: string;
    password?: string;
  };

  const identifier = body.identifier || "";
  const password = body.password || "";

  if (!identifier.trim() || !password) {
    return NextResponse.json(
      {
        error: "INVALID_INPUT",
        message: "Username / Email Admin dan kata sandi wajib diisi.",
      },
      { status: 400 }
    );
  }

  const check = verifyAdminCredentials(identifier, password);
  if (!check.ok) {
    if (check.reason === "NOT_CONFIGURED") {
      return NextResponse.json(
        {
          error: "ADMIN_NOT_CONFIGURED",
          message:
            "Akun admin belum dikonfigurasi pada environment server (ADMIN_PASSWORD / BETTER_AUTH_SECRET).",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "INVALID_ADMIN_CREDENTIALS",
        message: "Username / Email Admin atau kata sandi salah.",
      },
      { status: 401 }
    );
  }

  const token = signAdminToken(check.identifier);
  const response = NextResponse.json({
    ok: true,
    identifier: check.identifier,
  });
  response.cookies.set({
    ...getAdminCookieOptions(),
    value: token,
  });
  return response;
}
